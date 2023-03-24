import { BlsWalletWrapper, Aggregator, type Bundle } from 'bls-wallet-clients'
import { ethers } from 'ethers'
import BlsTransaction from './BlsTransaction'
import type Transaction from '../interfaces/Transaction'
import type Account from '../interfaces/Account'
import type SendTransactionParams from '../interfaces/SendTransactionParams'
import { type BlsNetwork } from '../interfaces/Network'
import { getNetwork } from './BlsNetworks'

export default class BlsAccount implements Account {
  static accountType: string = 'bls'

  address: string
  private readonly privateKey: string
  private readonly wallet: BlsWalletWrapper
  private readonly networkConfig: BlsNetwork

  private constructor ({
    privateKey,
    wallet,
    network
  }: {
    privateKey: string
    wallet: BlsWalletWrapper
    network: BlsNetwork
  }) {
    this.privateKey = privateKey
    this.wallet = wallet
    this.address = wallet.address
    this.networkConfig = network
  }

  static async createAccount ({
    privateKey,
    network
  }: {
    privateKey?: string
    network?: string
  }): Promise<BlsAccount> {
    const pk = privateKey ?? await BlsWalletWrapper.getRandomBlsPrivateKey()
    const networkConfig = getNetwork(network)
    const wallet = await BlsWalletWrapper.connect(
      pk,
      networkConfig.verificationGateway,
      new ethers.providers.JsonRpcProvider(networkConfig.rpcUrl)
    )

    return new BlsAccount({ privateKey: pk, wallet, network: networkConfig })
  }

  static async generatePrivateKey (): Promise<string> {
    return await BlsWalletWrapper.getRandomBlsPrivateKey()
  }

  /**
   * Sends a transaction to the aggregator to be bundled and submitted to the L2
   * @param params Array of transactions
   * @returns Transaction hash of the transaction that was sent to the aggregator
   */
  async sendTransaction (params: SendTransactionParams[]): Promise<Transaction> {
    const actions = params.map((tx) => ({
      ethValue: tx.value ?? '0',
      contractAddress: tx.to,
      encodedFunction: tx.data ?? '0x'
    }))

    const nonce = await this.wallet.Nonce()
    const bundle = this.wallet.sign({ nonce, actions })

    return await addBundleToAggregator(this.getAggregator(), bundle, this.networkConfig.name)
  }

  /**
   * Sets the trusted account for this account. The trusted account will be able to reset this accounts private key
   * by calling the recoverWallet function using this accounts address and the recovery phrase.
   * @param recoveryPhrase String that is used as salt to generate the recovery hash
   * @param trustedAccountAddress Address of the account that will be able to reset this accounts private key
   * @returns Transaction hash of the transaction that was sent to the aggregator
   */
  async setTrustedAccount (recoveryPhrase: string, trustedAccountAddress: string): Promise<Transaction> {
    const bundle = await this.wallet.getSetRecoveryHashBundle(
      recoveryPhrase,
      trustedAccountAddress
    )

    return await addBundleToAggregator(this.getAggregator(), bundle, this.networkConfig.name)
  }

  /**
   * Get the balance of this account
   * @returns The balance of this account formated in ether (instead of wei)
   */
  async getBalance (): Promise<string> {
    const provider = await this.getProvider()
    const balance = await provider.getBalance(this.address)

    return ethers.utils.formatEther(balance)
  }

  private async getProvider (): Promise<ethers.providers.JsonRpcProvider> {
    return new ethers.providers.JsonRpcProvider(this.networkConfig.rpcUrl)
  }

  private getAggregator (): Aggregator {
    return new Aggregator(this.networkConfig.aggregatorUrl)
  }
}

async function addBundleToAggregator (agg: Aggregator, bundle: Bundle, network: string): Promise<Transaction> {
  const result = await agg.add(bundle)

  if ('failures' in result) {
    throw new Error(JSON.stringify(result))
  }

  return new BlsTransaction({ network, bundleHash: result.hash })
}

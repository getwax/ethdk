import {
  BlsProvider,
  BlsSigner,
  BlsWalletWrapper,
  Aggregator,
  VerificationGatewayFactory,
  type Bundle,
} from 'bls-wallet-clients'
import { ethers } from 'ethers'
import { type Deferrable } from 'ethers/lib/utils'
import BlsTransaction from './BlsTransaction'
import type Transaction from '../interfaces/Transaction'
import type Account from '../interfaces/Account'
import { type BlsNetwork, type Network } from '../interfaces/Network'
import { getNetwork } from './BlsNetworks'

export default class BlsAccount implements Account {
  accountType: string = 'bls'

  address: string
  private readonly privateKey: string
  private readonly networkConfig: BlsNetwork
  private readonly blsProvider: BlsProvider
  private readonly blsSigner: BlsSigner

  private constructor({
    address,
    privateKey,
    network,
    provider,
    signer,
  }: {
    address: string
    privateKey: string
    network: BlsNetwork
    provider: BlsProvider
    signer: BlsSigner
  }) {
    this.address = address
    this.privateKey = privateKey
    this.networkConfig = network
    this.blsProvider = provider
    this.blsSigner = signer
  }

  static async createAccount({
    privateKey: pk,
    network,
  }: {
    privateKey?: string
    network?: Network
  } = {}): Promise<BlsAccount> {
    const privateKey = pk ?? (await BlsSigner.getRandomBlsPrivateKey())
    const networkConfig = getNetwork(network)

    const provider = new BlsProvider(
      networkConfig.aggregatorUrl,
      networkConfig.verificationGateway,
      networkConfig.aggregatorUtilities,
      networkConfig.rpcUrl,
      {
        name: networkConfig.name,
        chainId: networkConfig.chainId,
      },
    )
    const signer = provider.getSigner(privateKey)

    return new BlsAccount({
      privateKey,
      network: networkConfig,
      address: await signer.getAddress(),
      provider,
      signer,
    })
  }

  static async generatePrivateKey(): Promise<string> {
    return await BlsWalletWrapper.getRandomBlsPrivateKey()
  }

  /**
   * Sends a transaction to the aggregator to be bundled and submitted to the L2
   * @param params Array of transactions
   * @returns Transaction hash of the transaction that was sent to the aggregator
   */
  async sendTransaction(
    transaction: Deferrable<ethers.providers.TransactionRequest>,
  ): Promise<Transaction> {
    const response = await this.blsSigner.sendTransaction(transaction)
    return new BlsTransaction({
      network: this.networkConfig,
      bundleHash: response.hash,
    })
  }

  /**
   * Sets the trusted account for this account. The trusted account will be able to reset this accounts private key
   * by calling the recoverWallet function using this accounts address and the recovery phrase.
   * @param recoveryPhrase String that is used as salt to generate the recovery hash
   * @param trustedAccountAddress Address of the account that will be able to reset this accounts private key
   * @returns Transaction hash of the transaction that was sent to the aggregator
   */
  async setTrustedAccount(
    recoveryPhrase: string,
    trustedAccountAddress: string,
  ): Promise<Transaction> {
    const wallet = await BlsWalletWrapper.connect(
      this.privateKey,
      this.networkConfig.verificationGateway,
      this.blsProvider,
    )
    const bundle = await wallet.getSetRecoveryHashBundle(
      recoveryPhrase,
      trustedAccountAddress,
    )

    return await addBundleToAggregator(
      this.getAggregator(),
      bundle,
      this.networkConfig,
    )
  }

  /**
   * Recovers a compromised BLS wallet by assigning it a new private key. This function
   * must be called from the trusted account that was previously set by the compromised wallet.
   *
   * @param compromisedAccountAddress The address of the compromised BLS wallet.
   * @param recoveryPhrase The recovery phrase associated with the compromised wallet.
   * @param newPrivateKey The new private key to be assigned to the compromised wallet.
   * @returns Transaction hash of the transaction that was sent to the aggregator
   */
  async resetAccountPrivateKey(
    compromisedAccountAddress: string,
    recoveryPhrase: string,
    newPrivateKey: string,
  ): Promise<Transaction> {
    const wallet = await BlsWalletWrapper.connect(
      this.privateKey,
      this.networkConfig.verificationGateway,
      this.blsProvider,
    )
    const verificationGateway = VerificationGatewayFactory.connect(
      this.networkConfig.verificationGateway,
      this.blsProvider,
    )
    const latestBlock = await this.blsProvider.getBlock('latest')
    const signatureExpiryOffsetSeconds = 20 * 60 // 20 minutes
    const safetyDelaySeconds = 7 * 24 * 60 * 60 // one week

    const signatureExpiryTimestamp =
      latestBlock.timestamp + safetyDelaySeconds + signatureExpiryOffsetSeconds

    const bundle = await wallet.getRecoverWalletBundle(
      compromisedAccountAddress,
      newPrivateKey,
      recoveryPhrase,
      verificationGateway,
      signatureExpiryTimestamp,
    )

    return await addBundleToAggregator(
      this.getAggregator(),
      bundle,
      this.networkConfig,
    )
  }

  /**
   * Get the balance of this account
   * @returns The balance of this account formated in ether (instead of wei)
   */
  async getBalance(): Promise<string> {
    const balance = await this.blsProvider.getBalance(this.address)
    return ethers.utils.formatEther(balance)
  }

  private getAggregator(): Aggregator {
    return new Aggregator(this.networkConfig.aggregatorUrl)
  }
}

async function addBundleToAggregator(
  agg: Aggregator,
  bundle: Bundle,
  network: BlsNetwork,
): Promise<Transaction> {
  const result = await agg.add(bundle)

  if ('failures' in result) {
    throw new Error(JSON.stringify(result))
  }

  return new BlsTransaction({ network, bundleHash: result.hash })
}

import { ethers, Wallet } from 'ethers'
import { type Deferrable } from 'ethers/lib/utils'
import type Account from '../interfaces/Account'
import { type EoaNetwork, type Network } from '../interfaces/Network'
import type Transaction from '../interfaces/Transaction'
import { getNetwork } from './EoaNetworks'
import EoaTransaction from './EoaTransaction'

export default class ExternallyOwnedAccount implements Account {
  accountType: string = 'eoa'

  address: string
  private readonly privateKey: string
  private readonly recoveryPhrase: string
  private readonly networkConfig: EoaNetwork
  private readonly provider: ethers.providers.JsonRpcProvider
  private readonly signer: Wallet

  private constructor({
    address,
    privateKey,
    recoveryPhrase,
    network,
    provider,
    signer,
  }: {
    address: string
    privateKey: string
    recoveryPhrase: string
    network: EoaNetwork
    provider: ethers.providers.JsonRpcProvider
    signer: Wallet
  }) {
    this.address = address
    this.privateKey = privateKey
    this.recoveryPhrase = recoveryPhrase
    this.networkConfig = network
    this.provider = provider
    this.signer = signer
  }

  static async createAccount({
    privateKey,
    network,
  }: {
    privateKey?: string
    network?: Network
  } = {}): Promise<ExternallyOwnedAccount> {
    const signer = Wallet.createRandom(privateKey)

    const networkConfig = getNetwork(network)

    const provider = new ethers.providers.JsonRpcProvider(
      networkConfig.rpcUrl,
      {
        name: networkConfig.name,
        chainId: networkConfig.chainId,
      },
    )

    return new ExternallyOwnedAccount({
      address: signer.address,
      privateKey: signer.privateKey,
      recoveryPhrase: signer.mnemonic.phrase,
      network: networkConfig,
      provider,
      signer,
    })
  }

  static generatePrivateKey(): string {
    return Wallet.createRandom().privateKey
  }

  static recoverAccount(recoveryPhrase: string): Wallet {
    return Wallet.fromMnemonic(recoveryPhrase)
  }

  async sendTransaction(
    transaction: Deferrable<ethers.providers.TransactionRequest>,
  ): Promise<Transaction> {
    const response = await this.signer.sendTransaction(transaction)
    return new EoaTransaction({
      network: this.networkConfig,
      hash: response.hash,
    })
  }

  async getBalance(): Promise<string> {
    const balance = await this.provider.getBalance(this.address)
    return ethers.utils.formatEther(balance)
  }
}

import { ethers, Wallet } from 'ethers'
import { type Deferrable } from 'ethers/lib/utils'
import type Account from '../interfaces/Account'
import {
  type ExternallyOwnedAccountNetwork,
  type Network,
} from '../interfaces/Network'
import type Transaction from '../interfaces/Transaction'
import { getNetwork } from './ExternallyOwnedAccountNetworks'
import ExternallyOwnedAccountTransaction from './ExternallyOwnedAccountTransaction'
import isNullOrUndefined from '../utils/isNullOrUndefined'
import { type PrivateKey, type SeedPhrase } from '../types/brands'

export default class ExternallyOwnedAccount implements Account {
  accountType: string = 'eoa'

  address: string
  private readonly privateKey: string
  private readonly seedPhrase: string
  private readonly networkConfig: ExternallyOwnedAccountNetwork
  private readonly provider: ethers.providers.JsonRpcProvider
  private readonly signer: Wallet

  private constructor({
    address,
    privateKey,
    seedPhrase,
    network,
    provider,
    signer,
  }: {
    address: string
    privateKey: string
    seedPhrase: string
    network: ExternallyOwnedAccountNetwork
    provider: ethers.providers.JsonRpcProvider
    signer: Wallet
  }) {
    this.address = address
    this.privateKey = privateKey
    this.seedPhrase = seedPhrase
    this.networkConfig = network
    this.provider = provider
    this.signer = signer
  }

  static async createAccount({
    privateKeyOrSeedPhrase,
    network,
  }: {
    privateKeyOrSeedPhrase?: PrivateKey | SeedPhrase
    network?: Network
  } = {}): Promise<ExternallyOwnedAccount> {
    const networkConfig = getNetwork(network)

    const provider = new ethers.providers.JsonRpcProvider(
      networkConfig.rpcUrl,
      {
        name: networkConfig.name,
        chainId: networkConfig.chainId,
      },
    )

    if (this.isPrivateKey(privateKeyOrSeedPhrase)) {
      return await this.createAccountFromPrivateKey({
        privateKey: privateKeyOrSeedPhrase,
        networkConfig,
        provider,
      })
    }
    if (this.isSeedPhrase(privateKeyOrSeedPhrase)) {
      return await this.createAccountFromSeedPhrase({
        seedPhrase: privateKeyOrSeedPhrase,
        networkConfig,
        provider,
      })
    }

    const signer = Wallet.createRandom()

    return new ExternallyOwnedAccount({
      address: signer.address,
      privateKey: signer.privateKey,
      seedPhrase: signer.mnemonic.phrase,
      network: networkConfig,
      provider,
      signer,
    })
  }

  static async createAccountFromPrivateKey({
    privateKey,
    networkConfig,
    provider,
  }: {
    privateKey: PrivateKey
    networkConfig: ExternallyOwnedAccountNetwork
    provider: ethers.providers.JsonRpcProvider
  }): Promise<ExternallyOwnedAccount> {
    const signer = Wallet.createRandom(privateKey)

    return new ExternallyOwnedAccount({
      address: signer.address,
      privateKey: signer.privateKey,
      seedPhrase: signer.mnemonic.phrase,
      network: networkConfig,
      provider,
      signer,
    })
  }

  static async createAccountFromSeedPhrase({
    seedPhrase,
    networkConfig,
    provider,
  }: {
    seedPhrase: SeedPhrase
    networkConfig: ExternallyOwnedAccountNetwork
    provider: ethers.providers.JsonRpcProvider
  }): Promise<ExternallyOwnedAccount> {
    const signer = Wallet.fromMnemonic(seedPhrase)

    return new ExternallyOwnedAccount({
      address: signer.address,
      privateKey: signer.privateKey,
      seedPhrase: signer.mnemonic.phrase,
      network: networkConfig,
      provider,
      signer,
    })
  }

  static generatePrivateKey(): string {
    return Wallet.createRandom().privateKey
  }

  async sendTransaction(
    transaction: Deferrable<ethers.providers.TransactionRequest>,
  ): Promise<Transaction> {
    const response = await this.signer.sendTransaction(transaction)
    return new ExternallyOwnedAccountTransaction({
      network: this.networkConfig,
      hash: response.hash,
    })
  }

  async getBalance(): Promise<string> {
    const balance = await this.provider.getBalance(this.address)
    return ethers.utils.formatEther(balance)
  }

  static isPrivateKey(
    input: PrivateKey | SeedPhrase | undefined,
  ): input is PrivateKey {
    if (isNullOrUndefined(input)) return false
    const privateKeyPattern = /^0x[a-fA-F0-9]{64}$/
    return privateKeyPattern.test(input as string)
  }

  static isSeedPhrase(
    input: PrivateKey | SeedPhrase | undefined,
  ): input is SeedPhrase {
    if (isNullOrUndefined(input)) return false
    const seedPhrasePattern = /^([a-z]+ ){11}[a-z]+$/
    return seedPhrasePattern.test(input as string)
  }
}

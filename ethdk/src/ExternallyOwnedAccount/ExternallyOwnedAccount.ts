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
import validatePrivateKey from '../utils/validatePrivateKey'
import validateSeedPhrase from '../utils/validateSeedPhrase'

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

  static createAccount({
    privateKey,
    network,
  }: {
    privateKey?: string
    network?: Network
  } = {}): ExternallyOwnedAccount {
    if (isNullOrUndefined(privateKey)) {
      return this.createAccountFromPrivateKey({
        privateKey: Wallet.createRandom().privateKey,
      })
    }

    return this.createAccountFromPrivateKey({
      privateKey,
      network,
    })
  }

  static createAccountFromPrivateKey({
    privateKey,
    network,
  }: {
    privateKey: string
    network?: Network
  }): ExternallyOwnedAccount {
    const validatedPrivateKey = validatePrivateKey(privateKey)
    if (validatedPrivateKey.success === false) {
      throw new Error(`Invalid private key: ${validatedPrivateKey.error}`)
    }

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
      seedPhrase: signer.mnemonic.phrase,
      network: networkConfig,
      provider,
      signer,
    })
  }

  static createAccountFromSeedPhrase({
    seedPhrase,
    network,
  }: {
    seedPhrase: string
    network?: Network
  }): ExternallyOwnedAccount {
    const validatedSeedPhrase = validateSeedPhrase(seedPhrase)
    if (validatedSeedPhrase.success === false) {
      throw new Error(`Invalid seed phrase: ${validatedSeedPhrase.error}`)
    }

    const signer = Wallet.fromMnemonic(seedPhrase)

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
}

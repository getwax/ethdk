import {
  wrapProvider,
  type ERC4337EthersProvider,
  type ERC4337EthersSigner,
} from '@account-abstraction/sdk'
import { ethers, Wallet } from 'ethers'

import type Account from '../interfaces/Account'
import { type Deferrable } from 'ethers/lib/utils'
import type Transaction from '../interfaces/Transaction'
import {
  type Network,
  type AccountAbstractionNetwork,
} from '../interfaces/Network'
import { getNetwork } from './AccountAbstractionNetworks'
import AccountAbstractionTransaction from './AccountAbstractionTransaction'
import isNullOrUndefined from '../utils/isNullOrUndefined'

export default class AccountAbstractionAccount implements Account {
  accountType: string = 'aa'

  address: string
  private readonly privateKey: string
  private readonly networkConfig: AccountAbstractionNetwork
  private readonly aaProvider: ERC4337EthersProvider
  private readonly aaSigner: ERC4337EthersSigner

  private constructor({
    address,
    privateKey,
    network,
    provider,
    signer,
  }: {
    address: string
    privateKey: string
    network: AccountAbstractionNetwork
    provider: ERC4337EthersProvider
    signer: ERC4337EthersSigner
  }) {
    this.address = address
    this.privateKey = privateKey
    this.networkConfig = network
    this.aaProvider = provider
    this.aaSigner = signer
  }

  static async createAccount({
    privateKey,
    network,
  }: {
    privateKey?: string
    network?: Network
  } = {}): Promise<AccountAbstractionAccount> {
    const networkConfig = getNetwork(network)

    const provider = new ethers.providers.JsonRpcProvider(
      networkConfig.rpcUrl,
      {
        name: networkConfig.name,
        chainId: networkConfig.chainId,
      },
    )
    const signer = isNullOrUndefined(privateKey)
      ? Wallet.createRandom()
      : new Wallet(privateKey, provider)

    const aaProvider = await this.getAaProvider(provider, signer, networkConfig)

    return new AccountAbstractionAccount({
      address: await aaProvider.getSigner().getAddress(),
      privateKey: privateKey ?? signer.privateKey,
      network: networkConfig,
      provider: aaProvider,
      signer: aaProvider.getSigner(),
    })
  }

  async sendTransaction(
    transaction: Deferrable<ethers.providers.TransactionRequest>,
  ): Promise<Transaction> {
    const response = await this.aaSigner.sendTransaction(transaction)
    return new AccountAbstractionTransaction({
      hash: response.hash,
      network: this.networkConfig,
    })
  }

  static async generatePrivateKey(): Promise<string> {
    return Wallet.createRandom().privateKey
  }

  /**
   * Get the balance of this account
   * @returns The balance of this account formated in ether (instead of wei)
   */
  async getBalance(): Promise<string> {
    const balance = await this.aaProvider.getBalance(this.address)
    return ethers.utils.formatEther(balance)
  }

  // Creating a helper function to get the provider
  // so we can mock the provider for testing
  static async getAaProvider(
    provider: ethers.providers.JsonRpcProvider,
    signer: ethers.Signer,
    networkConfig: AccountAbstractionNetwork,
  ): Promise<ERC4337EthersProvider> {
    return await wrapProvider(
      provider,
      {
        entryPointAddress: networkConfig.entryPointAddress,
        bundlerUrl: networkConfig.bundlerUrl,
      },
      signer,
    )
  }
}

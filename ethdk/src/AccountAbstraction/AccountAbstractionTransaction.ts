import { ethers } from 'ethers'
import type Transaction from '../interfaces/Transaction'
import {
  type AccountAbstractionNetwork,
  type Network,
} from '../interfaces/Network'
import { getNetwork } from './AccountAbstractionNetworks'

type ReceiptResponse = ethers.providers.TransactionReceipt

export default class AccountAbstractionTransaction implements Transaction {
  hash: string
  network: AccountAbstractionNetwork

  constructor({ hash, network }: { hash: string; network: Network }) {
    this.network = getNetwork(network)
    this.hash = hash
  }

  async getTransactionReceipt(): Promise<ReceiptResponse | undefined> {
    const provider = new ethers.providers.JsonRpcProvider(this.network.rpcUrl)
    return await provider.getTransactionReceipt(this.hash)
  }
}

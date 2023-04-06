import { ethers } from 'ethers'
import {
  type ExternallyOwnedAccountNetwork,
  type Network,
} from '../interfaces/Network'
import type Transaction from '../interfaces/Transaction'
import { getNetwork } from './ExternallyOwnedAccountNetworks'

type ReceiptResponse = ethers.providers.TransactionReceipt

export default class ExternallyOwnedAccountTransaction implements Transaction {
  hash: string
  network: ExternallyOwnedAccountNetwork

  constructor({ hash, network }: { hash: string; network: Network }) {
    this.network = getNetwork(network)
    this.hash = hash
  }

  async getTransactionReceipt(): Promise<ReceiptResponse> {
    const provider = new ethers.providers.JsonRpcProvider(this.network.rpcUrl)
    return await provider.getTransactionReceipt(this.hash)
  }
}

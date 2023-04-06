import { ethers } from 'ethers'
import { type EoaNetwork, type Network } from '../interfaces/Network'
import type Transaction from '../interfaces/Transaction'
import { getNetwork } from './EoaNetworks'

type ReceiptResponse = ethers.providers.TransactionReceipt

export default class EoaTransaction implements Transaction {
  hash: string
  network: EoaNetwork

  constructor({ hash, network }: { hash: string; network: Network }) {
    this.network = getNetwork(network)
    this.hash = hash
  }

  async getTransactionReceipt(): Promise<ReceiptResponse> {
    const provider = new ethers.providers.JsonRpcProvider(this.network.rpcUrl)
    return await provider.getTransactionReceipt(this.hash)
  }
}

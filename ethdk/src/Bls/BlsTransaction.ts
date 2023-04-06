import { Aggregator } from 'bls-wallet-clients'
import {
  type BundleReceipt,
  type BundleReceiptError,
} from 'bls-wallet-clients/dist/src/Aggregator'
import type Transaction from '../interfaces/Transaction'
import { type BlsNetwork, type Network } from '../interfaces/Network'
import { getNetwork } from './BlsNetworks'

type ReceiptResponse = BundleReceipt | BundleReceiptError

export default class BlsTransaction implements Transaction {
  hash: string
  network: BlsNetwork

  constructor({
    bundleHash,
    network,
  }: {
    bundleHash: string
    network: Network
  }) {
    this.network = getNetwork(network)
    this.hash = bundleHash
  }

  async getTransactionReceipt(): Promise<ReceiptResponse | undefined> {
    const aggregator = this.getAggregator()
    return await aggregator.lookupReceipt(this.hash)
  }

  private getAggregator(): Aggregator {
    return new Aggregator(this.network.aggregatorUrl)
  }

  /**
   * TODO (ethdk #11) Add in the BLS provider for better transaction functionality
   * eg: polling for transaction receipt
   */
}

import { Aggregator } from 'bls-wallet-clients'
import { type BundleReceipt, type BundleReceiptError } from 'bls-wallet-clients/dist/src/Aggregator'
import type Transaction from './interfaces/Transaction'
import type { BlsNetwork } from './interfaces/Network'

export default class BlsTransaction implements Transaction {
  hash: string
  network: BlsNetwork

  constructor (network: BlsNetwork, bundleHash: string) {
    this.network = network
    this.hash = bundleHash
  }

  async getTransactionReceipt (): Promise<BundleReceipt | BundleReceiptError | undefined> {
    const aggregator = this.getAggregator()
    return await aggregator.lookupReceipt(this.hash)
  }

  private getAggregator (): Aggregator {
    return new Aggregator(this.network.aggregatorUrl)
  }

  /**
   * TODO (ethdk #11) Add in the BLS provider for better transaction functionality
   * eg: polling for transaction receipt
   */
}

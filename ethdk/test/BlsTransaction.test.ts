import { expect } from 'chai'
import sinon from 'sinon'
import { Aggregator } from 'bls-wallet-clients'
import BlsTransaction from '../src/Bls/BlsTransaction'
import { BLS_NETWORKS } from '../src/Networks'

describe('BlsTransaction', () => {
  afterEach(() => {
    sinon.restore()
  })

  describe('getTransactionReceipt', () => {
    it('should return the transaction receipt', async () => {
      const bundleHash = 'testBundleHash'
      const mockReceipt: any = {
        bundleHash,
      }

      const mockAggregator = sinon.createStubInstance(Aggregator)
      mockAggregator.lookupReceipt.resolves(mockReceipt)

      // Stub the getAggregator function to return the mockAggregator
      sinon
        .stub(BlsTransaction.prototype, 'getAggregator' as any)
        .returns(mockAggregator as any)

      const transaction = new BlsTransaction({
        network: BLS_NETWORKS.localhost,
        bundleHash,
      })

      const receipt = await transaction.getTransactionReceipt()

      expect(receipt).to.deep.equal(mockReceipt)
      expect(mockAggregator.lookupReceipt.calledOnceWith(bundleHash)).to.equal(
        true,
      )
    })
  })
})

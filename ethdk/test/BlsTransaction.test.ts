import { expect } from 'chai'
import sinon from 'sinon'
import { Aggregator } from 'bls-wallet-clients'
import BlsTransaction from '../src/BlsTransaction'
import type { BlsNetwork } from '../src/interfaces/Network'

describe('BlsTransaction', () => {
  const network: BlsNetwork = {
    name: 'localhost',
    chainId: 31337,
    rpcUrl: 'http://localhost:8545',
    aggregatorUrl: 'http://localhost:3000',
    verificationGateway: '0x689A095B4507Bfa302eef8551F90fB322B3451c6'
  }

  afterEach(() => {
    sinon.restore()
  })

  describe('getTransactionReceipt', () => {
    it('should return the transaction receipt', async () => {
      const bundleHash = 'testBundleHash'
      const mockReceipt: any = {
        bundleHash
      }

      const mockAggregator = sinon.createStubInstance(Aggregator)
      mockAggregator.lookupReceipt.resolves(mockReceipt)

      // Stub the getAggregator function to return the mockAggregator
      sinon.stub(BlsTransaction.prototype, 'getAggregator' as any).returns(mockAggregator as any)

      const transaction = new BlsTransaction(network, bundleHash)

      const receipt = await transaction.getTransactionReceipt()

      expect(receipt).to.deep.equal(mockReceipt)
      expect(mockAggregator.lookupReceipt.calledOnceWith(bundleHash)).to.equal(true)
    })
  })
})

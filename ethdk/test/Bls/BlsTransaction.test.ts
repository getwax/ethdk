import { expect } from 'chai'
import sinon from 'sinon'
import { Aggregator } from 'bls-wallet-clients'
import BlsTransaction from '../../src/Bls/BlsTransaction'

const network = {
  type: 'bls',
  name: 'localhost',
  chainId: 1337,
  rpcUrl: 'http://localhost:8545',
  aggregatorUrl: 'http://localhost:3000',
  aggregatorUtilities: '0x76cE3c1F2E6d87c355560fCbd28ccAcAe03f95F6',
  verificationGateway: '0x689A095B4507Bfa302eef8551F90fB322B3451c6',
}

describe('BlsTransaction', () => {
  afterEach(() => {
    sinon.restore()
  })

  describe('getTransactionReceipt', () => {
    it('should return the transaction receipt', async () => {
      // Arrange
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
        network,
        bundleHash,
      })

      // Act
      const receipt = await transaction.getTransactionReceipt()

      // Assert
      expect(receipt).to.deep.equal(mockReceipt)
      expect(mockAggregator.lookupReceipt.calledOnceWith(bundleHash)).to.equal(
        true,
      )
    })
  })
})

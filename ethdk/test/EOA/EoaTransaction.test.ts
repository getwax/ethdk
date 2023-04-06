import { expect } from 'chai'
import { ethers } from 'ethers'
import sinon from 'sinon'
import EoaTransaction from '../../src/EOA/EoaTransaction'
import { EOA_NETWORKS } from '../../src/Networks'

describe('EoaTransaction', () => {
  afterEach(() => {
    sinon.restore()
  })

  describe('getTransactionReceipt', () => {
    it('should return the transaction receipt', async () => {
      // Arrange
      const hash = 'testHash'
      const mockReceipt: any = {
        hash,
      }

      const getTransactionReceiptStub = sinon.stub(
        ethers.providers.JsonRpcProvider.prototype,
        'getTransactionReceipt',
      )

      getTransactionReceiptStub.resolves(mockReceipt)

      const transaction = new EoaTransaction({
        network: EOA_NETWORKS.localhost,
        hash,
      })

      // Act
      const receipt = await transaction.getTransactionReceipt()

      // Assert
      expect(receipt).to.deep.equal(mockReceipt)
      expect(getTransactionReceiptStub.calledOnceWith(hash)).to.equal(true)
    })
  })
})

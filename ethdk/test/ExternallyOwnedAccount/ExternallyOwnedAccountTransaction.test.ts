import { expect } from 'chai'
import { ethers } from 'ethers'
import sinon from 'sinon'
import ExternallyOwnedAccountTransaction from '../../src/ExternallyOwnedAccount/ExternallyOwnedAccountTransaction'
import { EOA_NETWORKS } from '../../src/Networks'

describe('ExternallyOwnedAccountTransaction', () => {
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

      const transaction = new ExternallyOwnedAccountTransaction({
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

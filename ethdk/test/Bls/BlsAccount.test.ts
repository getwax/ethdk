import { expect } from 'chai'
import { describe, it, afterEach } from 'mocha'
import BlsAccount from '../../src/Bls/BlsAccount'
import BlsTransaction from '../../src/Bls/BlsTransaction'
import { BLS_NETWORKS } from '../../src/Networks'
import sinon from 'sinon'

import { ethers } from 'ethers'
import {
  BlsWalletWrapper,
  Aggregator,
  BlsProvider,
  BlsSigner,
} from 'bls-wallet-clients'

describe('BlsAccount', () => {
  afterEach(() => {
    sinon.restore()
  })

  describe('createAccount', () => {
    it('should create an account with a given private key', async () => {
      // Arrange
      const privateKey = '0x123'
      const mockAddress = '0x12345'

      sinon.stub(BlsSigner.prototype, 'getAddress').resolves(mockAddress)

      // Act
      const accountConfig = {
        privateKey,
        network: BLS_NETWORKS.localhost,
      }
      const account = await BlsAccount.createAccount(accountConfig)

      // Assert
      expect(account).to.be.instanceOf(BlsAccount)
      expect(account.address).to.equal(mockAddress)
    })

    it('should create an account with a generated private key', async () => {
      // Arrange
      const privateKey = '0x123'
      const mockAddress = '0x12345'

      sinon.stub(BlsSigner.prototype, 'getAddress').resolves(mockAddress)
      sinon
        .stub(BlsWalletWrapper, 'getRandomBlsPrivateKey')
        .resolves(privateKey)

      // Act
      const account = await BlsAccount.createAccount()

      // Assert
      expect(account).to.be.instanceOf(BlsAccount)
      expect(account.address).to.equal(mockAddress)
    })
  })

  describe('generatePrivateKey', () => {
    it('should return a generated private key', async () => {
      // Arrange
      const privateKey = '0x123'

      sinon
        .stub(BlsWalletWrapper, 'getRandomBlsPrivateKey')
        .resolves(privateKey)

      // Act
      const result = await BlsAccount.generatePrivateKey()

      // Assert
      expect(result).to.equal(privateKey)
    })
  })

  it('should send a transaction successfully', async () => {
    // Arrange
    const mockTransactionResponse = { hash: '0x67890' }
    const mockAddress = '0x12345'
    sinon
      .stub(BlsSigner.prototype, 'sendTransaction')
      .resolves(mockTransactionResponse as any)

    sinon.stub(BlsSigner.prototype, 'getAddress').resolves(mockAddress)

    const accountConfig = {
      privateKey: '0x123',
      network: BLS_NETWORKS.localhost,
    }
    const account = await BlsAccount.createAccount(accountConfig)

    // Act
    const transactionParams = {
      to: '0x12345',
      value: '0',
      data: '0x',
    }
    const transaction = await account.sendTransaction(transactionParams)

    // Assert
    expect(transaction).to.be.instanceOf(BlsTransaction)
    expect(transaction.hash).to.equal(mockTransactionResponse.hash)
  })

  describe('setTrustedAccount', () => {
    it('should set a trusted account successfully', async () => {
      // Arrange
      const mockBundle = { some: 'bundle' }
      const mockGetSetRecoveryHashBundle = sinon.stub().resolves(mockBundle)
      const mockWallet: any = {
        getSetRecoveryHashBundle: mockGetSetRecoveryHashBundle,
      }
      sinon.stub(BlsWalletWrapper, 'connect').resolves(mockWallet)

      const mockResult = { hash: '0x67890' }
      const mockAggregator = sinon.createStubInstance(Aggregator)
      mockAggregator.add.resolves(mockResult)

      sinon
        .stub(BlsAccount.prototype, 'getAggregator' as any)
        .returns(mockAggregator)
      const accountConfig = {
        privateKey: '0x123',
        network: BLS_NETWORKS.localhost,
      }
      const account = await BlsAccount.createAccount(accountConfig)

      // Act
      const recoveryPhrase = 'some phrase'
      const trustedAccountAddress = '0x12345'
      const transaction = await account.setTrustedAccount(
        recoveryPhrase,
        trustedAccountAddress,
      )

      // Assert
      expect(transaction).to.be.instanceOf(BlsTransaction)
      expect(transaction.hash).to.equal(mockResult.hash)
      expect(
        mockGetSetRecoveryHashBundle.calledWith(
          recoveryPhrase,
          trustedAccountAddress,
        ),
      ).to.equal(true)
    })
  })

  describe('resetAccountPrivateKey', () => {
    it('should reset the account private key successfully', async () => {
      // Arrange
      const mockBundle = { some: 'bundle' }
      const mockGetRecoverWalletBundle = sinon.stub().resolves(mockBundle)
      const mockWallet: any = {
        address: '0x12345',
        getRecoverWalletBundle: mockGetRecoverWalletBundle,
      }
      sinon.stub(BlsWalletWrapper, 'connect').resolves(mockWallet)

      const mockResult = { hash: '0x67890' }
      const mockAggregator = sinon.createStubInstance(Aggregator)
      mockAggregator.add.resolves(mockResult)

      sinon
        .stub(BlsAccount.prototype, 'getAggregator' as any)
        .returns(mockAggregator)

      const accountConfig = {
        privateKey: '0x123',
        network: BLS_NETWORKS.localhost,
      }
      const account = await BlsAccount.createAccount(accountConfig)

      // Act
      const compromisedAccountAddress = '0x98765'
      const recoveryPhrase = 'some_recovery_phrase'
      const newPrivateKey = '0x456'
      const transaction = await account.resetAccountPrivateKey(
        compromisedAccountAddress,
        recoveryPhrase,
        newPrivateKey,
      )

      // Assert
      expect(transaction).to.be.instanceOf(BlsTransaction)
      expect(transaction.hash).to.equal(mockResult.hash)
      expect(
        mockGetRecoverWalletBundle.calledWith(
          compromisedAccountAddress,
          newPrivateKey,
          recoveryPhrase,
        ),
      ).to.equal(true)
    })
  })

  describe('getBalance', () => {
    it('should get the balance of an account successfully', async () => {
      // Arrange
      const balance = ethers.utils.parseEther('1.23')
      const mockAddress = '0x12345'

      sinon.stub(BlsProvider.prototype, 'getBalance').resolves(balance)

      sinon.stub(BlsSigner.prototype, 'getAddress').resolves(mockAddress)
      const accountConfig = {
        privateKey: '0x123',
        network: BLS_NETWORKS.localhost,
      }
      const account = await BlsAccount.createAccount(accountConfig)

      // Act
      const result = await account.getBalance()

      // Assert
      expect(result).to.equal('1.23')
    })
  })
})

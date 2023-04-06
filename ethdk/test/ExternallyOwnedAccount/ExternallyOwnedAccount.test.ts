import { expect } from 'chai'
import { ethers, Wallet } from 'ethers'
import { describe, it, afterEach } from 'mocha'
import sinon from 'sinon'
import ExternallyOwnedAccount from '../../src/ExternallyOwnedAccount/ExternallyOwnedAccount'
import ExternallyOwnedAccountTransaction from '../../src/ExternallyOwnedAccount/ExternallyOwnedAccountTransaction'
import { EOA_NETWORKS } from '../../src/Networks'
import * as networkModule from '../../src/ExternallyOwnedAccount/ExternallyOwnedAccountNetworks'

describe('ExternallyOwnedAccount', () => {
  afterEach(() => {
    sinon.restore()
  })

  describe('createAccount', () => {
    it('should create an account with a given private key', async () => {
      // Arrange
      const privateKey = '0x123'
      const expectedWallet = Wallet.createRandom(privateKey)

      const walletStub = sinon
        .stub(Wallet, 'createRandom')
        .returns(expectedWallet)

      const getNetworkSpy = sinon.spy(networkModule, 'getNetwork')

      const accountConfig = {
        privateKey,
        network: EOA_NETWORKS.localhost,
      }

      // Act
      const account = await ExternallyOwnedAccount.createAccount(accountConfig)

      // Assert
      expect(account).to.be.instanceOf(ExternallyOwnedAccount)
      expect(account.address).to.equal(expectedWallet.address)
      expect(walletStub.calledOnceWith(privateKey)).to.equal(true)
      expect(getNetworkSpy.calledOnceWith(EOA_NETWORKS.localhost)).to.equal(
        true,
      )
    })

    it('should create an account with a generated private key', async () => {
      // Arrange
      const expectedWallet = Wallet.createRandom()

      const walletStub = sinon
        .stub(Wallet, 'createRandom')
        .returns(expectedWallet)

      const getNetworkSpy = sinon.spy(networkModule, 'getNetwork')

      // Act
      const account = await ExternallyOwnedAccount.createAccount()

      // Assert
      expect(account).to.be.instanceOf(ExternallyOwnedAccount)
      expect(account.address).to.equal(expectedWallet.address)
      expect(walletStub.calledOnceWith(undefined)).to.equal(true)
      expect(getNetworkSpy.calledOnceWith(undefined)).to.equal(true)
    })
  })

  describe('generatePrivateKey', () => {
    it('should return a generated private key', async () => {
      // Arrange
      const expectedWallet = Wallet.createRandom()
      sinon.stub(Wallet, 'createRandom').returns(expectedWallet)

      // Act
      const result = ExternallyOwnedAccount.generatePrivateKey()

      // Assert
      expect(result).to.equal(expectedWallet.privateKey)
    })
  })

  describe('recoverAccount', () => {
    it('should recover the account given a valid recovery phrase', async () => {
      // Arrange
      const wallet = Wallet.createRandom()

      // Act
      const result = ExternallyOwnedAccount.recoverAccount(
        wallet.mnemonic.phrase,
      )

      // Assert
      expect(result.privateKey).to.equal(wallet.privateKey)
      expect(result.address).to.equal(wallet.address)
    })

    it('should not recover the account given an invalid recovery phrase', async () => {
      // Arrange
      const wallet = Wallet.createRandom()
      const imposterWallet = Wallet.createRandom()

      // Act
      const result = ExternallyOwnedAccount.recoverAccount(
        imposterWallet.mnemonic.phrase,
      )

      // Assert
      expect(result.privateKey).to.not.equal(wallet.privateKey)
      expect(result.address).to.not.equal(wallet.address)
      expect(result.privateKey).to.equal(imposterWallet.privateKey)
      expect(result.address).to.equal(imposterWallet.address)
    })
  })

  describe('sendTransaction', () => {
    it('should send a transaction successfully', async () => {
      // Arrange
      const mockTransactionResponse = { hash: '0x67890' }
      sinon
        .stub(Wallet.prototype, 'sendTransaction')
        .resolves(mockTransactionResponse as any)
      const transactionParams = {
        to: '0x12345',
        value: '1',
        data: '0x',
      }

      const account = await ExternallyOwnedAccount.createAccount()

      // Act
      const transaction = await account.sendTransaction(transactionParams)

      // Assert
      expect(transaction).to.be.instanceOf(ExternallyOwnedAccountTransaction)
      expect(transaction.hash).to.equal(mockTransactionResponse.hash)
    })
  })

  describe('getBalance', () => {
    it('should get the balance of an account successfully', async () => {
      // Arrange
      const balance = ethers.utils.parseEther('1.23')
      const getBalanceStub = sinon.stub(
        ethers.providers.JsonRpcProvider.prototype,
        'getBalance',
      )
      getBalanceStub.resolves(balance)

      const account = await ExternallyOwnedAccount.createAccount()

      // Act
      const result = await account.getBalance()

      // Assert
      expect(result).to.equal('1.23')
    })
  })
})

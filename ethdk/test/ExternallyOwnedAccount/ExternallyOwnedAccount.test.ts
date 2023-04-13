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
    it('should create an account with a given private key', () => {
      // Arrange
      const privateKey =
        '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
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
      const account = ExternallyOwnedAccount.createAccount(accountConfig)

      // Assert
      expect(account).to.be.instanceOf(ExternallyOwnedAccount)
      expect(account.address).to.equal(expectedWallet.address)
      expect(walletStub.calledOnceWith(privateKey)).to.equal(true)
      expect(getNetworkSpy.calledOnceWith(EOA_NETWORKS.localhost)).to.equal(
        true,
      )
    })

    it('should create an account with a generated private key', () => {
      // Arrange
      const expectedWallet = Wallet.createRandom()

      const walletStub = sinon
        .stub(Wallet, 'createRandom')
        .returns(expectedWallet)

      const getNetworkSpy = sinon.spy(networkModule, 'getNetwork')

      // Act
      const account = ExternallyOwnedAccount.createAccount()

      // Assert
      expect(account).to.be.instanceOf(ExternallyOwnedAccount)
      expect(account.address).to.equal(expectedWallet.address)
      expect(walletStub.calledTwice).to.equal(true)
      expect(walletStub.calledWithExactly(/* nothing */)).to.equal(true)
      expect(walletStub.calledWithExactly(expectedWallet.privateKey)).to.equal(
        true,
      )
      expect(getNetworkSpy.calledOnceWith(undefined)).to.equal(true)
    })

    it('should create an account with a seed phrase and no network', () => {
      // Arrange
      const seedPhrase =
        'test test test test test test test test test test test junk'
      const expectedWallet = Wallet.fromMnemonic(seedPhrase)

      const walletStub = sinon
        .stub(Wallet, 'fromMnemonic')
        .returns(expectedWallet)

      const getNetworkSpy = sinon.spy(networkModule, 'getNetwork')

      // Act
      const account = ExternallyOwnedAccount.createAccountFromSeedPhrase({
        seedPhrase,
      })

      // Assert
      expect(account).to.be.instanceOf(ExternallyOwnedAccount)
      expect(account.address).to.equal(expectedWallet.address)
      expect(walletStub.calledOnceWithExactly(seedPhrase)).to.equal(true)
      expect(getNetworkSpy.calledOnceWith(undefined)).to.equal(true)
    })

    it('should create an account with a seed phrase and network', () => {
      // Arrange
      const seedPhrase =
        'test test test test test test test test test test test junk'
      const expectedWallet = Wallet.fromMnemonic(seedPhrase)

      const walletStub = sinon
        .stub(Wallet, 'fromMnemonic')
        .returns(expectedWallet)

      const getNetworkSpy = sinon.spy(networkModule, 'getNetwork')

      // Act
      const account = ExternallyOwnedAccount.createAccountFromSeedPhrase({
        seedPhrase,
        network: EOA_NETWORKS.localhost,
      })

      // Assert
      expect(account).to.be.instanceOf(ExternallyOwnedAccount)
      expect(account.address).to.equal(expectedWallet.address)
      expect(walletStub.calledOnceWithExactly(seedPhrase)).to.equal(true)
      expect(getNetworkSpy.calledOnceWith(EOA_NETWORKS.localhost)).to.equal(
        true,
      )
    })
  })

  describe('generatePrivateKey', () => {
    it('should return a generated private key', () => {
      // Arrange
      const expectedWallet = Wallet.createRandom()
      sinon.stub(Wallet, 'createRandom').returns(expectedWallet)

      // Act
      const result = ExternallyOwnedAccount.generatePrivateKey()

      // Assert
      expect(result).to.equal(expectedWallet.privateKey)
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

      const account = ExternallyOwnedAccount.createAccount()

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

      const account = ExternallyOwnedAccount.createAccount()

      // Act
      const result = await account.getBalance()

      // Assert
      expect(result).to.equal('1.23')
    })
  })
})

import { expect } from 'chai'
import { ethers, Wallet } from 'ethers'
import { describe, it, afterEach } from 'mocha'
import sinon from 'sinon'
import ExternallyOwnedAccount from '../../src/ExternallyOwnedAccount/ExternallyOwnedAccount'
import ExternallyOwnedAccountTransaction from '../../src/ExternallyOwnedAccount/ExternallyOwnedAccountTransaction'
import { EOA_NETWORKS } from '../../src/Networks'
import * as networkModule from '../../src/ExternallyOwnedAccount/ExternallyOwnedAccountNetworks'
import { type SeedPhrase, type PrivateKey } from '../../src/types/brands'

describe('ExternallyOwnedAccount', () => {
  afterEach(() => {
    sinon.restore()
  })

  describe('createAccount', () => {
    it('should create an account with a given private key', async () => {
      // Arrange
      const privateKey =
        '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80' as PrivateKey
      const expectedWallet = Wallet.createRandom(privateKey)

      const walletStub = sinon
        .stub(Wallet, 'createRandom')
        .returns(expectedWallet)

      const getNetworkSpy = sinon.spy(networkModule, 'getNetwork')

      const accountConfig = {
        privateKeyOrSeedPhrase: privateKey,
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
      expect(walletStub.calledOnceWith(/* nothing */)).to.equal(true)
      expect(getNetworkSpy.calledOnceWith(/* nothing */)).to.equal(true)
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

  describe('isPrivateKey', () => {
    it('should return true for a valid private key', async () => {
      // Arrange
      const privateKey =
        '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80' as PrivateKey

      // Act
      const result = ExternallyOwnedAccount.isPrivateKey(privateKey)

      // Assert
      expect(result).to.equal(true)
    })

    const testCases = [
      '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff800',
      '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff8',
      'ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
      '0x',
      '0x00',
      'undefined',
    ]
    testCases.forEach((testCase) => {
      it(`should return false for an invalid private key: ${testCase}`, async () => {
        // Arrange & Act
        const result = ExternallyOwnedAccount.isPrivateKey(
          testCase as PrivateKey,
        )
        // Assert
        expect(result).to.equal(false)
      })
    })
  })

  describe('isSeedPhrase', () => {
    const validTestCases = [
      'sock poet alone around radar forum quiz session observe rebel another choice',
      'test test test test test test test test test test test junk',
    ]
    validTestCases.forEach((testCase) => {
      it(`should return true for a valid seed phrase: ${testCase}`, async () => {
        // Arrange & Act
        const result = ExternallyOwnedAccount.isSeedPhrase(
          testCase as SeedPhrase,
        )

        // Assert
        expect(result).to.equal(true)
      })
    })

    const invalidTestCases = [
      'sock poet alone around radar forum quiz session observe rebel another choice long',
      'sock poet alone around radar forum quiz session observe rebel short',
      'sock poet alone around radar forum quiz session observe rebel another numb3r',
      'sock poet alone around radar forum quiz session observe rebel another whitespa ce',
      'Sock Poet Alone Around Radar Forum Quiz Session Observe Rebel Another Captials',
    ]
    invalidTestCases.forEach((testCase) => {
      it(`should return true for an invalid seed phrase: ${testCase}`, async () => {
        // Arrange & Act
        const result = ExternallyOwnedAccount.isSeedPhrase(
          testCase as SeedPhrase,
        )

        // Assert
        expect(result).to.equal(false)
      })
    })
  })
})

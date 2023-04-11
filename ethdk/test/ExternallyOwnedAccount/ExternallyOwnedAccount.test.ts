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

  describe('isPrivateKey', () => {
    it('should return true for a valid private key', () => {
      // Arrange
      const privateKey =
        '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'

      // Act
      const result = ExternallyOwnedAccount.validatePrivateKey(privateKey)

      // Assert
      expect(result.success).to.equal(true)
      expect(result.error).to.equal('')
    })

    const testCases = [
      {
        privateKey:
          '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff800',
        errorMessage:
          'Private key must be 64 characters long, excluding the "0x" prefix',
      },
      {
        privateKey:
          '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff8',
        errorMessage:
          'Private key must be 64 characters long, excluding the "0x" prefix',
      },
      {
        privateKey:
          'ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
        errorMessage: 'Private key must start with "0x"',
      },
      {
        privateKey: '0x',
        errorMessage:
          'Private key must be 64 characters long, excluding the "0x" prefix',
      },
      {
        privateKey: '0x00',
        errorMessage:
          'Private key must be 64 characters long, excluding the "0x" prefix',
      },
      {
        privateKey: 'not a private key',
        errorMessage: 'Private key must start with "0x"',
      },
      {
        privateKey:
          '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2fxyz',
        errorMessage:
          'Private key must only contain lowercase or uppercase hexadecimal characters (a-f, A-F, 0-9)',
      },
      {
        privateKey:
          '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2f!&#',
        errorMessage:
          'Private key must only contain lowercase or uppercase hexadecimal characters (a-f, A-F, 0-9)',
      },
    ]
    testCases.forEach((testCase) => {
      it(`should return false for an invalid private key: ${testCase.privateKey}`, () => {
        // Arrange & Act
        const result = ExternallyOwnedAccount.validatePrivateKey(
          testCase.privateKey,
        )
        // Assert
        expect(result.success).to.equal(false)
        expect(result.error).to.equal(testCase.errorMessage)
      })
    })
  })

  describe('isSeedPhrase', () => {
    const validTestCases = [
      'sock poet alone around radar forum quiz session observe rebel another choice',
      'test test test test test test test test test test test junk',
    ]
    validTestCases.forEach((testCase) => {
      it(`should return true for a valid seed phrase: ${testCase}`, () => {
        // Arrange & Act
        const result = ExternallyOwnedAccount.validateSeedPhrase(testCase)

        // Assert
        expect(result.success).to.equal(true)
        expect(result.error).to.equal('')
      })
    })

    const invalidTestCases = [
      {
        seedPhrase:
          'sock poet alone around radar forum quiz session observe rebel another choice long',
        error: 'Seed phrase must contain exactly 12 words',
      },
      {
        seedPhrase:
          'sock poet alone around radar forum quiz session observe rebel short',
        error: 'Seed phrase must contain exactly 12 words',
      },
      {
        seedPhrase:
          'sock poet alone around radar forum quiz session observe rebel another numb3r',
        error:
          'Each word in the seed phrase must only contain lowercase letters (a-z)',
      },
      {
        seedPhrase:
          'sock poet alone around radar forum quiz session observe rebel another whitespa ce',
        error: 'Seed phrase must contain exactly 12 words',
      },
      {
        seedPhrase:
          'Sock Poet Alone Around Radar Forum Quiz Session Observe Rebel Another Captials',
        error:
          'Each word in the seed phrase must only contain lowercase letters (a-z)',
      },
      {
        seedPhrase:
          'sock poet alone around radar forum quiz session observe rebel another  extraspace',
        error: 'Seed phrase must contain exactly 12 words',
      },
    ]
    invalidTestCases.forEach((testCase) => {
      it(`should return true for an invalid seed phrase: ${testCase.seedPhrase}`, () => {
        // Arrange & Act
        const result = ExternallyOwnedAccount.validateSeedPhrase(
          testCase.seedPhrase,
        )

        // Assert
        expect(result.success).to.equal(false)
        expect(result.error).to.equal(testCase.error)
      })
    })
  })
})

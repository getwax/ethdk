import { expect } from 'chai'
import { describe, it, afterEach } from 'mocha'
import sinon from 'sinon'

import { ethers, Wallet } from 'ethers'
import AccountAbstractionAccount from '../../src/AccountAbstraction/AccountAbstractionAccount'
import { localhost } from '../../src/AccountAbstraction/AccountAbstractionNetworks'
import AccountAbstractionTransaction from '../../src/AccountAbstraction/AccountAbstractionTransaction'
import * as networkModule from '../../src/AccountAbstraction/AccountAbstractionNetworks'

describe('AccountAbstractionAccount', () => {
  afterEach(() => {
    sinon.restore()
  })

  describe('createAccount', () => {
    it('should create an account with a given private key', async () => {
      // Arrange
      const privateKey =
        '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
      const smartContractAddress = '0xabcd6Ef563a5c06d6755849c3e27116fcCa4B33f'
      sinon.createStubInstance(Wallet)
      const mockAaProvider = {
        getSigner: sinon.stub().returns({
          getAddress: sinon.stub().resolves(smartContractAddress),
        }),
      }
      sinon
        .stub(AccountAbstractionAccount, 'getAaProvider')
        .resolves(mockAaProvider as any)
      const getNetworkSpy = sinon.spy(networkModule, 'getNetwork')

      // Act
      const accountConfig = {
        privateKey,
        network: localhost,
      }
      const account = await AccountAbstractionAccount.createAccount(
        accountConfig,
      )

      // Assert
      expect(account).to.be.instanceOf(AccountAbstractionAccount)
      expect(account.address).to.equal(smartContractAddress)
      expect(getNetworkSpy.calledOnceWith(localhost)).to.equal(true)
    })

    it('should create an account with a generated private key', async () => {
      // Arrange
      const privateKey =
        '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
      const smartContractAddress = '0x12346Ef563a5c06d6755849c3e27116fcCa4B33f'
      sinon.createStubInstance(Wallet)
      const mockAaProvider = {
        getSigner: sinon.stub().returns({
          getAddress: sinon.stub().resolves(smartContractAddress),
        }),
      }
      sinon
        .stub(AccountAbstractionAccount, 'getAaProvider')
        .resolves(mockAaProvider as any)

      const walletStub = sinon
        .stub(Wallet, 'createRandom')
        .returns(new Wallet(privateKey))

      // Act
      const account = await AccountAbstractionAccount.createAccount()

      // Assert
      expect(account).to.be.instanceOf(AccountAbstractionAccount)
      expect(account.address).to.equal(smartContractAddress)
      expect(walletStub.calledOnce).to.equal(true)
    })
  })

  describe('generatePrivateKey', () => {
    it('should return a generated private key', async () => {
      // Arrange
      const privateKey =
        '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'

      sinon.stub(Wallet, 'createRandom').returns(new Wallet(privateKey))

      // Act
      const result = await AccountAbstractionAccount.generatePrivateKey()

      // Assert
      expect(result).to.equal(privateKey)
    })
  })

  it('should send a transaction successfully', async () => {
    // Arrange
    const mockTransactionResponse = { hash: '0x67890' }
    const smartContractAddress = '0x12346Ef563a5c06d6755849c3e27116fcCa4B33f'
    sinon.createStubInstance(Wallet)
    const mockAaProvider = {
      getSigner: sinon.stub().returns({
        getAddress: sinon.stub().resolves(smartContractAddress),
        sendTransaction: sinon.stub().resolves(mockTransactionResponse),
      }),
    }
    sinon
      .stub(AccountAbstractionAccount, 'getAaProvider')
      .resolves(mockAaProvider as any)

    const accountConfig = {
      privateKey:
        '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
      network: localhost,
    }
    const account = await AccountAbstractionAccount.createAccount(accountConfig)

    // Act
    const transactionParams = {
      to: '0x12345',
      value: '0',
      data: '0x',
    }
    const transaction = await account.sendTransaction(transactionParams)

    // Assert
    expect(transaction).to.be.instanceOf(AccountAbstractionTransaction)
    expect(transaction.hash).to.equal(mockTransactionResponse.hash)
  })

  describe('getBalance', () => {
    it('should get the balance of an account successfully', async () => {
      // Arrange
      const balance = ethers.utils.parseEther('1.23')
      const smartContractAddress = '0x12346Ef563a5c06d6755849c3e27116fcCa4B33f'
      sinon.createStubInstance(Wallet)
      const mockAaProvider = {
        getSigner: sinon.stub().returns({
          getAddress: sinon.stub().resolves(smartContractAddress),
        }),
        getBalance: sinon.stub().resolves(balance),
      }
      sinon
        .stub(AccountAbstractionAccount, 'getAaProvider')
        .resolves(mockAaProvider as any)
      const accountConfig = {
        privateKey:
          '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
        network: localhost,
      }
      const account = await AccountAbstractionAccount.createAccount(
        accountConfig,
      )

      // Act
      const result = await account.getBalance()

      // Assert
      expect(result).to.equal('1.23')
    })
  })
})

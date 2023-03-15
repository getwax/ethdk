import { expect } from 'chai'
import { describe, it, afterEach } from 'mocha'
import BlsAccount from '../src/BlsAccount'
import sinon from 'sinon'

import { ethers } from 'ethers'
import { BlsWalletWrapper, Aggregator } from 'bls-wallet-clients'

describe('BlsAccount', () => {
  afterEach(() => {
    sinon.restore()
  })

  describe('createAccount', () => {
    it('should create an account with a given private key', async () => {
      const privateKey = '0x123'
      const mockWallet: any = { address: '0x12345' }

      sinon.stub(BlsWalletWrapper, 'connect').resolves(mockWallet)

      const account = await BlsAccount.createAccount(privateKey)

      expect(account).to.be.instanceOf(BlsAccount)
      expect(account.address).to.equal(mockWallet.address)
    })

    it('should create an account with a generated private key', async () => {
      const privateKey = '0x123'
      const mockWallet: any = { address: '0x12345' }

      sinon.stub(BlsWalletWrapper, 'connect').resolves(mockWallet)
      sinon.stub(BlsWalletWrapper, 'getRandomBlsPrivateKey').resolves(privateKey)

      const account = await BlsAccount.createAccount()

      expect(account).to.be.instanceOf(BlsAccount)
      expect(account.address).to.equal(mockWallet.address)
    })
  })

  describe('generatePrivateKey', () => {
    it('should return a generated private key', async () => {
      const privateKey = '0x123'

      sinon.stub(BlsWalletWrapper, 'getRandomBlsPrivateKey').resolves(privateKey)

      const result = await BlsAccount.generatePrivateKey()

      expect(result).to.equal(privateKey)
    })
  })

  describe('sendTransaction', () => {
    it('should send a transaction successfully', async () => {
      const mockBundle = { some: 'bundle' }
      const mockWallet: any = {
        address: '0x12345',
        sign: () => mockBundle,
        Nonce: () => 0
      }
      sinon.stub(BlsWalletWrapper, 'connect').resolves(mockWallet)
      const account = await BlsAccount.createAccount('0x123')
      const params = [
        {
          to: '0x12345',
          value: '0',
          data: '0x'
        }
      ]

      const mockResult = { hash: '0x67890' }

      const mockAggregator = sinon.createStubInstance(Aggregator)
      mockAggregator.add.resolves(mockResult)
      // Stub the getProvider function to return the mockProvider
      sinon.stub(BlsAccount.prototype, 'getAggregator' as any).returns(mockAggregator as any)

      const transaction = await account.sendTransaction(params)

      expect(transaction.hash).to.equal(mockResult.hash)
    })
  })

  describe('setTrustedAccount', () => {
    it('should set a trusted account successfully', async () => {
      const mockBundle = { some: 'bundle' }
      const mockWallet: any = {
        address: '0x12345',
        getSetRecoveryHashBundle: () => mockBundle
      }

      sinon.stub(BlsWalletWrapper, 'connect').resolves(mockWallet)
      const account = await BlsAccount.createAccount('0x123')
      const recoveryPhrase = 'some_recovery_phrase'
      const trustedAccountAddress = '0x12345'

      const mockResult = { hash: '0x67890' }

      const mockAggregator = sinon.createStubInstance(Aggregator)
      mockAggregator.add.resolves(mockResult)
      // Stub the getProvider function to return the mockProvider
      sinon.stub(BlsAccount.prototype, 'getAggregator' as any).returns(mockAggregator as any)

      const transaction = await account.setTrustedAccount(recoveryPhrase, trustedAccountAddress)

      expect(transaction.hash).to.equal(mockResult.hash)
    })
  })

  describe('getBalance', () => {
    it('should return the account balance formatted in ether', async () => {
      const privateKey = '0x123'
      const mockWallet: any = { address: '0x12345' }

      sinon.stub(BlsWalletWrapper, 'connect').resolves(mockWallet)

      const account = await BlsAccount.createAccount(privateKey)

      const mockBalance = ethers.utils.parseEther('10')
      const mockProvider = sinon.createStubInstance(ethers.providers.JsonRpcProvider)
      mockProvider.getBalance.resolves(mockBalance)

      // Stub the getProvider function to return the mockProvider
      sinon.stub(BlsAccount.prototype, 'getProvider' as any).resolves(mockProvider as any)

      const balance = await account.getBalance()

      expect(balance).to.equal('10.0')
    })
  })
})

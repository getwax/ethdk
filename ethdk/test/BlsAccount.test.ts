import { expect } from 'chai'
import { describe, it, afterEach } from 'mocha'
import BlsAccount from '../src/BlsAccount'
import BlsTransaction from '../src/BlsTransaction'
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
      const mockSignFunction = sinon.stub()
      mockSignFunction.returns(mockBundle)
      const mockWallet: any = {
        address: '0x12345',
        sign: mockSignFunction,
        Nonce: () => 0
      }
      sinon.stub(BlsWalletWrapper, 'connect').resolves(mockWallet)
      const account = await BlsAccount.createAccount('0x123')

      const mockResult = { hash: '0x67890' }
      const mockAggregator = sinon.createStubInstance(Aggregator)
      mockAggregator.add.resolves(mockResult)

      // Stub the getAggregator function to return the mockAggregator
      sinon.stub(BlsAccount.prototype, 'getAggregator' as any).returns(mockAggregator as any)

      const params = [
        {
          to: '0x12345',
          value: '0',
          data: '0x'
        }
      ]
      const transaction = await account.sendTransaction(params)

      expect(transaction).to.be.instanceOf(BlsTransaction)
      expect(transaction.hash).to.equal(mockResult.hash)
      expect(mockSignFunction.calledWith({
        nonce: 0,
        actions: [{
          ethValue: params[0].value,
          contractAddress: params[0].to,
          encodedFunction: params[0].data
        }]
      })).to.equal(true)
    })
  })

  describe('setTrustedAccount', () => {
    it('should set a trusted account successfully', async () => {
      const mockBundle = { some: 'bundle' }
      const mockGetSetRecoveryHashBundle = sinon.stub()
      mockGetSetRecoveryHashBundle.returns(mockBundle)
      const mockWallet: any = {
        address: '0x12345',
        getSetRecoveryHashBundle: mockGetSetRecoveryHashBundle
      }
      sinon.stub(BlsWalletWrapper, 'connect').resolves(mockWallet)

      const mockResult = { hash: '0x67890' }
      const mockAggregator = sinon.createStubInstance(Aggregator)
      mockAggregator.add.resolves(mockResult)
      // Stub the getAggregator function to return the mockAggregator
      sinon.stub(BlsAccount.prototype, 'getAggregator' as any).returns(mockAggregator as any)

      const recoveryPhrase = 'some_recovery_phrase'
      const trustedAccountAddress = '0x12345'
      const account = await BlsAccount.createAccount('0x123')

      const transaction = await account.setTrustedAccount(recoveryPhrase, trustedAccountAddress)

      expect(transaction).to.be.instanceOf(BlsTransaction)
      expect(transaction.hash).to.equal(mockResult.hash)
      expect(mockGetSetRecoveryHashBundle.calledWith(recoveryPhrase, trustedAccountAddress)).to.equal(true)
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

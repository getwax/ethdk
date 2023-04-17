import { expect } from 'chai'
import sinon from 'sinon'
import { BLS_NETWORKS } from '../../src/Networks'
import { getNetwork } from '../../src/Bls/BlsNetworks'

describe('getNetwork', () => {
  afterEach(() => {
    sinon.restore()
  })

  it('should return the default network when network is undefined', () => {
    // Arrange
    const expectedNetwork = BLS_NETWORKS.localhost

    // Act
    const resultNetwork = getNetwork(undefined)

    // Assert
    expect(resultNetwork).to.deep.equal(expectedNetwork)
  })

  it('should return the default network when network is null', () => {
    // Arrange
    const expectedNetwork = BLS_NETWORKS.localhost

    // Act
    const resultNetwork = getNetwork(null as any)

    // Assert
    expect(resultNetwork).to.deep.equal(expectedNetwork)
  })

  it('should return the ExternallyOwnedAccountNetwork when network type is bls', () => {
    // Arrange
    const expectedNetwork = {
      type: 'bls',
      name: 'localhost',
      chainId: 1337,
      rpcUrl: 'http://localhost:8545',
      aggregatorUrl: 'http://localhost:3000',
      aggregatorUtilities: '0x76cE3c1F2E6d87c355560fCbd28ccAcAe03f95F6',
      verificationGateway: '0x689A095B4507Bfa302eef8551F90fB322B3451c6',
    }

    // Act
    const resultNetwork = getNetwork(BLS_NETWORKS.localhost)

    // Assert
    expect(resultNetwork).to.deep.equal(expectedNetwork)
  })

  it('should throw an error when network type is not bls', () => {
    // Arrange
    const network = {
      type: 'unsupported',
      name: 'testnet',
      chainId: 1234,
      rpcUrl: 'http://localhost:1234',
    }

    // Act & Assert
    expect(() => getNetwork(network)).to.throw('Unsupported network')
  })
})

import { expect } from 'chai'
import sinon from 'sinon'
import { EOA_NETWORKS } from '../../src/Networks'
import { getNetwork } from '../../src/Eoa/EoaNetworks'

describe('getNetwork', () => {
  afterEach(() => {
    sinon.restore()
  })

  it('should return the default network when network is undefined', () => {
    // Arrange
    const expectedNetwork = EOA_NETWORKS.localhost

    // Act
    const resultNetwork = getNetwork(undefined)

    // Assert
    expect(resultNetwork).to.deep.equal(expectedNetwork)
  })

  it('should return the default network when network is null', () => {
    // Arrange
    const expectedNetwork = EOA_NETWORKS.localhost

    // Act
    const resultNetwork = getNetwork(null as any)

    // Assert
    expect(resultNetwork).to.deep.equal(expectedNetwork)
  })

  it('should return the EoaNetwork when network type is eoa', () => {
    // Arrange
    const expectedNetwork = {
      type: 'eoa',
      name: 'localhost',
      chainId: 1337,
      rpcUrl: 'http://localhost:8545',
    }

    // Act
    const resultNetwork = getNetwork(EOA_NETWORKS.localhost)

    // Assert
    expect(resultNetwork).to.deep.equal(expectedNetwork)
  })

  it('should throw an error when network type is not eoa', () => {
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

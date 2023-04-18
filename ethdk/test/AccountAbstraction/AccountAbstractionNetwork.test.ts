import { expect } from 'chai'
import sinon from 'sinon'
import { AA_NETWORKS } from '../../src/Networks'
import { getNetwork } from '../../src/AccountAbstraction/AccountAbstractionNetworks'

describe('getNetwork', () => {
  afterEach(() => {
    sinon.restore()
  })

  it('should return the default network when network is undefined', () => {
    // Arrange
    const expectedNetwork = AA_NETWORKS.localhost

    // Act
    const resultNetwork = getNetwork(undefined)

    // Assert
    expect(resultNetwork).to.deep.equal(expectedNetwork)
  })

  it('should return the default network when network is null', () => {
    // Arrange
    const expectedNetwork = AA_NETWORKS.localhost

    // Act
    const resultNetwork = getNetwork(null as any)

    // Assert
    expect(resultNetwork).to.deep.equal(expectedNetwork)
  })

  it('should return the AccountAbstractionNework when network type is aa', () => {
    // Arrange
    const expectedNetwork = {
      type: 'aa',
      name: 'localhost',
      chainId: 1337,
      rpcUrl: 'http://localhost:8545',
      bundlerUrl: 'http://localhost:3000/rpc',
      entryPointAddress: '0x0576a174d229e3cfa37253523e645a78a0c91b57',
    }

    // Act
    const resultNetwork = getNetwork(AA_NETWORKS.localhost)

    // Assert
    expect(resultNetwork).to.deep.equal(expectedNetwork)
  })

  it('should throw an error when network type is not aa', () => {
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

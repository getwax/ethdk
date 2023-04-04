import { type Network, type BlsNetwork } from '../interfaces/Network'

export const localhost: BlsNetwork = {
  type: 'bls',
  name: 'localhost',
  chainId: 1337,
  rpcUrl: 'http://localhost:8545',
  aggregatorUrl: 'http://localhost:3000',
  aggregatorUtilities: '0x76cE3c1F2E6d87c355560fCbd28ccAcAe03f95F6',
  verificationGateway: '0x689A095B4507Bfa302eef8551F90fB322B3451c6',
}

export function getNetwork(network?: Network): BlsNetwork {
  if (network === undefined) {
    // Return default network
    return localhost
  }
  if (network?.type === 'bls') {
    return network as BlsNetwork
  }
  throw new Error('Unsupported network')
}

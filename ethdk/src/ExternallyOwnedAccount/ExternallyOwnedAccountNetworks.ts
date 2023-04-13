import {
  type Network,
  type ExternallyOwnedAccountNetwork,
} from '../interfaces/Network'

export const localhost: ExternallyOwnedAccountNetwork = {
  type: 'eoa',
  name: 'localhost',
  chainId: 1337,
  rpcUrl: 'http://localhost:8545',
}

const defaultNetwork = localhost

export function getNetwork(network?: Network): ExternallyOwnedAccountNetwork {
  if (network === undefined || network === null) {
    return defaultNetwork
  }

  if (network.type === 'eoa') {
    return network as ExternallyOwnedAccountNetwork
  }
  throw new Error('Unsupported network')
}

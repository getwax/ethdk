import {
  type Network,
  type ExternallyOwnedAccountNetwork,
} from '../interfaces/Network'
import isNullOrUndefined from '../utils/isNullOrUndefined'

export const localhost: ExternallyOwnedAccountNetwork = {
  type: 'eoa',
  name: 'localhost',
  chainId: 1337,
  rpcUrl: 'http://localhost:8545',
}

const defaultNetwork = localhost

export function getNetwork(network?: Network): ExternallyOwnedAccountNetwork {
  if (isNullOrUndefined(network)) {
    return defaultNetwork
  }

  if (network.type === 'eoa') {
    return network as ExternallyOwnedAccountNetwork
  }
  throw new Error('Unsupported network')
}

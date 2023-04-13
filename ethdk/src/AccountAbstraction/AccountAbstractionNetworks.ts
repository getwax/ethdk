import {
  type Network,
  type AccountAbstractionNetwork,
} from '../interfaces/Network'

export const localhost: AccountAbstractionNetwork = {
  type: 'aa',
  name: 'localhost',
  chainId: 1337,
  rpcUrl: 'http://localhost:8545',
  bundlerUrl: 'http://localhost:3000/rpc',
  entryPointAddress: '0x0576a174d229e3cfa37253523e645a78a0c91b57',
}

export function getNetwork(network?: Network): AccountAbstractionNetwork {
  if (network === undefined || network === null) {
    // Return default network
    return localhost
  }

  if (network.type === 'aa') {
    return network as AccountAbstractionNetwork
  }
  throw new Error('Unsupported network')
}

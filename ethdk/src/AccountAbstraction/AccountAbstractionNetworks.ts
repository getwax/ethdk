import {
  type Network,
  type AccountAbstractionNetwork,
} from '../interfaces/Network'

export const localhost: AccountAbstractionNetwork = {
  type: 'aa',
  name: 'localhost',
  chainId: 1337,
  rpcUrl: 'http://localhost:8545',
  bundlerUrl: 'http://localhost:3000',
  entryPointAddress: '0x689A095B4507Bfa302eef8551F90fB322B3451c6',
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

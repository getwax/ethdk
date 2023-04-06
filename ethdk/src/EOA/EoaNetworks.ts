import { type Network, type EoaNetwork } from '../interfaces/Network'

export const localhost: EoaNetwork = {
  type: 'eoa',
  name: 'localhost',
  chainId: 1337,
  rpcUrl: 'http://localhost:8545',
}

const defaultNetwork = localhost

export function getNetwork(network?: Network): EoaNetwork {
  if (network === undefined || network === null) {
    return defaultNetwork
  }

  if (network.type === 'eoa') {
    return network as EoaNetwork
  }
  throw new Error('Unsupported network')
}

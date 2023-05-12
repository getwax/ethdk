import { type Network, type BlsNetwork } from '../interfaces/Network'
import isNullOrUndefined from '../utils/isNullOrUndefined'

export const optimismGoerli: BlsNetwork = {
  type: 'bls',
  name: 'Optimism Goerli',
  chainId: 420,
  rpcUrl: 'https://goerli.optimism.io',
  aggregatorUrl: 'https://optimism-goerli.blswallet.org/',
  aggregatorUtilities: '0x4bD2E4e99B50A2a9e6b9dABfA3C8dCD1f885F008',
  verificationGateway: '0xE25229F29BAD62B1198F05F32169B70a9edc84b8',
}

export const arbitrumGoerli: BlsNetwork = {
  type: 'bls',
  name: 'Arbitrum Goerli',
  chainId: 421613,
  rpcUrl: 'https://goerli-rollup.arbitrum.io/rpc',
  aggregatorUrl: 'https://arbitrum-goerli.blswallet.org/',
  aggregatorUtilities: '0x4bD2E4e99B50A2a9e6b9dABfA3C8dCD1f885F008',
  verificationGateway: '0xE25229F29BAD62B1198F05F32169B70a9edc84b8',
}

export function getNetwork(network?: Network): BlsNetwork {
  if (isNullOrUndefined(network)) {
    // Return default network
    return arbitrumGoerli
  }

  if (network.type === 'bls') {
    return network as BlsNetwork
  }
  throw new Error('Unsupported network')
}

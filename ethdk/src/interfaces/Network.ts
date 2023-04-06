export interface Network {
  type: string
  name: string
  chainId: number
  rpcUrl: string
}

export interface BlsNetwork extends Network {
  type: 'bls'
  aggregatorUrl: string
  verificationGateway: string
  aggregatorUtilities: string
}

export interface EoaNetwork extends Network {
  type: 'eoa'
}

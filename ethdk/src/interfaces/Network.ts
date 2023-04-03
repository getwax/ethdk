export interface Network {
  name: string
  chainId: number
  rpcUrl: string
}

export interface BlsNetwork extends Network {
  aggregatorUrl: string
  verificationGateway: string
  aggregatorUtilities: string
}

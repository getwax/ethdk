export interface Network {
  name: string
  chainId: string
  rpcUrl: string
}

export interface BlsNetwork extends Network {
  aggregatorUrl: string
  verificationGateway: string
}

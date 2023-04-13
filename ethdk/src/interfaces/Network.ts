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

export interface AccountAbstractionNetwork extends Network {
  type: 'aa'
  entryPointAddress: string
  bundlerUrl: string
}

export interface ExternallyOwnedAccountNetwork extends Network {
  type: 'eoa'
}

import { localhost as blsLocalhost } from '../Bls/BlsNetworks'
import { localhost as eoaLocalhost } from '../ExternallyOwnedAccount/ExternallyOwnedAccountNetworks'
import { localhost as aaLocalhost } from '../AccountAbstraction/AccountAbstractionNetworks'

export const BLS_NETWORKS = {
  localhost: blsLocalhost,
}

export const EOA_NETWORKS = {
  localhost: eoaLocalhost,
}

export const AA_NETWORKS = {
  localhost: aaLocalhost,
}

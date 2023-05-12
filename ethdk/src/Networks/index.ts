import { optimismGoerli, arbitrumGoerli } from '../Bls/BlsNetworks'
import { localhost as eoaLocalhost } from '../ExternallyOwnedAccount/ExternallyOwnedAccountNetworks'
import { localhost as aaLocalhost } from '../AccountAbstraction/AccountAbstractionNetworks'

export const BLS_NETWORKS = {
  optimismGoerli,
  arbitrumGoerli,
}

export const EOA_NETWORKS = {
  localhost: eoaLocalhost,
}

export const AA_NETWORKS = {
  localhost: aaLocalhost,
}

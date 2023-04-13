import { type Network } from './interfaces/Network'
import BlsAccount from './Bls/BlsAccount'
import AccountAbstractionAccount from './AccountAbstraction/AccountAbstractionAccount'
import ExternallyOwnedAccount from './ExternallyOwnedAccount/ExternallyOwnedAccount'

interface AccountConfig {
  accountType: 'bls' | 'eoa' | 'aa'
  privateKey?: string
  network?: Network
}

interface AccountTypeMap {
  bls: BlsAccount
  aa: AccountAbstractionAccount
  eoa: ExternallyOwnedAccount
  // Add more types as needed
}

type AccountTypeToReturnType<T extends keyof AccountTypeMap> = AccountTypeMap[T]

/**
 * Creates an account of the specified type
 * @param accountType The type of account to create ('bls', 'eoa', etc.)
 * @param privateKey Optional private key to use for the account
 * @returns An account of the specified type
 */
export async function createAccount<T extends keyof AccountTypeMap>({
  accountType,
  privateKey,
  network,
}: AccountConfig & { accountType: T }): Promise<AccountTypeToReturnType<T>> {
  if (accountType === 'bls') {
    const account = await BlsAccount.createAccount({
      privateKey,
      network,
    })
    return account as AccountTypeToReturnType<T>
  }
  if (accountType === 'aa') {
    const account = await AccountAbstractionAccount.createAccount({
      privateKey,
      network,
    })
    return account as AccountTypeToReturnType<T>
  }
  if (accountType === 'eoa') {
    const account = ExternallyOwnedAccount.createAccount({
      privateKey,
      network,
    })
    return account as AccountTypeToReturnType<T>
  }
  throw new Error('Unsupported account type')
}

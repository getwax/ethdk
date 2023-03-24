import BlsAccount from './Bls/BlsAccount'
import type Account from './interfaces/Account'

interface AccountConfig {
  accountType: 'bls' | 'eoa'
  privateKey?: string
  network?: string
}

/**
 * Creates an account of the specified type
 * @param accountType The type of account to create ('bls', 'eoa', etc.)
 * @param privateKey Optional private key to use for the account
 * @returns An account of the specified type
 */
export async function createAccount({
  accountType,
  privateKey,
  network,
}: AccountConfig): Promise<Account> {
  if (accountType === BlsAccount.accountType) {
    return await BlsAccount.createAccount({
      privateKey,
      network,
    })
  }
  throw new Error('Unsupported account type')
}

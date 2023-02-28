import BlsAccount from './BlsAccount'
import type Account from './interfaces/Account'

/**
 * Creates an account of the specified type
 * @param accountType The type of account to create ('bls', 'eoa', etc.)
 * @param privateKey Optional private key to use for the account
 * @returns An account of the specified type
 */
export async function createAccount (accountType: string, privateKey?: string): Promise<Account> {
  if (accountType === BlsAccount.accountType) {
    return await BlsAccount.createAccount(privateKey)
  }
  throw new Error('Unsupported account type')
}

/**
 * Generates a private key of the specified type
 * @param accountType The type of account to create ('bls', 'eoa', etc.)
 * @returns A private key of the specified type
 */
export async function generatePrivateKey (accountType: string): Promise<string> {
  if (accountType === BlsAccount.accountType) {
    return await BlsAccount.generatePrivateKey()
  }
  throw new Error('Unsupported account type')
}

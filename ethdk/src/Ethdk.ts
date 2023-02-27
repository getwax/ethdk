import BlsAccount from './BlsAccount'
import type Account from './interfaces/Account'

export async function createAccount (accountType: string, privateKey?: string): Promise<Account> {
  if (accountType === BlsAccount.accountType) {
    return await BlsAccount.createAccount(privateKey)
  }
  throw new Error('Unsupported account type')
}

export async function generatePrivateKey (accountType: string): Promise<string> {
  if (accountType === BlsAccount.accountType) {
    return await BlsAccount.generatePrivateKey()
  }
  throw new Error('Unsupported account type')
}

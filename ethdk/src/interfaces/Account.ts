import { type Deferrable } from 'ethers/lib/utils'
import { type ethers } from 'ethers'
import type Transaction from './Transaction'

export default interface Account {
  address: string
  sendTransaction: (
    transaction: Deferrable<ethers.providers.TransactionRequest>,
  ) => Promise<Transaction>
}

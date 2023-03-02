import type SendTransactionParams from './SendTransactionParams'
import type Transaction from './Transaction'

export default interface Account {
  address: string
  sendTransaction: (params: SendTransactionParams[]) => Promise<Transaction>
}

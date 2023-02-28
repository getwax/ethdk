import type SendTransactionParams from './SendTransactionParams'

export default interface Account {
  address: string
  sendTransaction: (params: SendTransactionParams[]) => Promise<string>
}

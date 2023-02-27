export default interface Account {
  address: string
  sendTransaction: (params: any) => Promise<string>
}

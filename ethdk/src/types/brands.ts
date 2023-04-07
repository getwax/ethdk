/** Generic Brand type to allow nominal typing */
export type Brand<T, B> = T & { __brand: B }

export type PrivateKey = Brand<string, 'PrivateKey'>
export type SeedPhrase = Brand<string, 'SeedPhrase'>

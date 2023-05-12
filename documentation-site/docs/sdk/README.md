# ethdk

Ethdk is meant to make interacting with the Ethereum ecosystem easier for developers by abstracting the web3 domain knowledge into an easy-to-understand node module.
With familar language, naming, and sensible defaults; web2 developers can effortlessly integrate and experiment with web3 components in their product.

The approach is to then attempt integrations with low-/no-code solutions so that more entrepreneurs may experiment and innovate with web3 capabilities.
Example applications will supplement this direction to demonstrate what is possible.

## Getting started

How to use ethdk

### Accounts

```typescript
import { networks, createAccount } from 'ethdk'

// Private key param is optional. A random private key will
// be generated if one is not provided.
const account = await createAccount({
  accountType: 'bls',
  network: networks.BLS_NETWORKS.arbitrumGoerli,
})

const { address } = account
```

#### Recovery

```typescript
const recoveryPhrase = 'Do not forget this!'
const trustedAccount = '0x70b8...06A0'
account.setTrustedAccount(recoveryPhrase, trustedAccount)
```

### Transaction

```typescript
const transaction = await account.sendTransaction(...);

const { hash } = transaction;

```

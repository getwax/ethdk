# ethdk

Ethdk is meant to make interacting with the Ethereum ecosystem easier for developers by abstracting the web3 domain knowledge into an easy-to-understand node module.

## Getting started
How to use ethdk
### Accounts

```typescript
import { createAccount, generatePrivateKey } from "ethdk";

const privateKey = await generatePrivateKey('bls');

// Private key param is optional. A random private key will
// be generated if one is not provided.
const account = createAccount('bls', privateKey); 

const { address } = account;

```

#### Recovery

```typescript
const recoveryPhrase = 'Do not forget this!';
const trustedAccount = '0x70b8...06A0';
account.setTrustedAccount(recoveryPhrase, trustedAccount);
```

### Transaction

```typescript
const transactionHash = await account.sendTransaction(...);
                                            
```

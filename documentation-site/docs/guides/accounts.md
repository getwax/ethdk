---
sidebar_position: 1
---

# Accounts

`ethdk` is a Node.js module that enables users to easily and swiftly create Ethereum accounts/wallets, while also providing the unique features and functionality associated with each account type. For instance, the BLS account offers account recovery capabilities. In this documentation, we will discuss the supported account types and how to use the `createAccount` factory function to create accounts that leverage their distinctive features.

## Supported Accounts

Below is a list of the supported account types and their unique features/functionality.

**`bls` - BLS Account**

- Send transactions
- Set trusted account for recovery
- Recover a wallet

**`aa` - Account Abstraction**

- Send transactions

**`eoa` - Externally Owned Account**

- Send transactions

## Usage

Create different account types

```typescript
import { createAccount, networks } from "ethdk";

async function main() {
  const blsAccount = await createAccount({
    accountType: "bls",
    network: networks.BLS_NETWORKS.arbitrumGoerli,
  });

  const eoaAccount = await createAccount({
    accountType: "eoa",
    network: networks.EOA_NETWORKS.localhost,
  });

  const aaAccount = await createAccount({
    accountType: "aa",
    network: networks.AA_NETWORKS.localhost,
  });

  console.log("BLS Account Address:", blsAccount.address);
  console.log("EOA Account Address:", eoaAccount.address);
  console.log("AA Account Address:", aaAccount.address);
}

main();
```

Set a trusted wallet for a BLS account

```typescript
import { createAccount, networks } from "ethdk";

async function main() {
  const blsAccount = await createAccount({
    accountType: "bls",
    network: networks.BLS_NETWORKS.arbitrumBoerli,
  });

  const recoveryPhrase = "Do not forget this!";
  const trustedAccount = "0x70b8448C7361964Ef5124c5E6425c852D29906A0";
  const tx = await account.setTrustedAccount(recoveryPhrase, trustedAccount);
  console.log("Transaction hash: ", tx.hash);
}

main();
```

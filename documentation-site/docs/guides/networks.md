---
sidebar_position: 2
---

# Networks

By default, ethdk is opinionated about the networks it exports. Users can utilize custom networks, but all exported networks will already support the smart contract wallet if necessary (i.e., contracts will already be deployed). Currently, only local networks are supported, but more networks will be added soon.

## Usage

Import a local BLS network

```typescript
import { networks, createAccount } from "ethdk";

const account = await createAccount({
  accountType: "bls",
  network: networks.BLS_NETWORKS.arbitrumGoerli,
});

const { address } = account;
```

Manually use a local BLS network

```typescript
import { networks, createAccount } from "ethdk";

const account = await createAccount({
  accountType: "bls",
  network: {
    type: "bls",
    name: "localhost",
    chainId: 1337,
    rpcUrl: "http://localhost:8545",
    aggregatorUrl: "http://localhost:3000",
    aggregatorUtilities: "0x76cE3c1F2E6d87c355560fCbd28ccAcAe03f95F6",
    verificationGateway: "0x689A095B4507Bfa302eef8551F90fB322B3451c6",
  },
});

const { address } = account;
```

## Supported Networks

Network configurations that can be imported from ethdk

### BLS Accounts

- `localhost`

### AA Acounts

- `localhost`

### EOA Accounts

- `localhost`

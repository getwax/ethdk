## Implements

- `default`

## Table of contents

### Constructors

- [constructor](AccountAbstractionTransaction.md#constructor)

### Properties

- [hash](AccountAbstractionTransaction.md#hash)
- [network](AccountAbstractionTransaction.md#network)

### Methods

- [getTransactionReceipt](AccountAbstractionTransaction.md#gettransactionreceipt)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new AccountAbstractionTransaction**(`«destructured»`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `hash` | `string` |
| › `network` | `Network` |

#### Defined in

[AccountAbstraction/AccountAbstractionTransaction.ts:15](https://github.com/web3well/ethdk/blob/89d0f1c/ethdk/src/AccountAbstraction/AccountAbstractionTransaction.ts#L15)

## Properties

### <a id="hash" name="hash"></a> hash

• **hash**: `string`

#### Implementation of

Transaction.hash

#### Defined in

[AccountAbstraction/AccountAbstractionTransaction.ts:12](https://github.com/web3well/ethdk/blob/89d0f1c/ethdk/src/AccountAbstraction/AccountAbstractionTransaction.ts#L12)

___

### <a id="network" name="network"></a> network

• **network**: `AccountAbstractionNetwork`

#### Defined in

[AccountAbstraction/AccountAbstractionTransaction.ts:13](https://github.com/web3well/ethdk/blob/89d0f1c/ethdk/src/AccountAbstraction/AccountAbstractionTransaction.ts#L13)

## Methods

### <a id="gettransactionreceipt" name="gettransactionreceipt"></a> getTransactionReceipt

▸ **getTransactionReceipt**(): `Promise`<`undefined` \| `TransactionReceipt`\>

#### Returns

`Promise`<`undefined` \| `TransactionReceipt`\>

#### Defined in

[AccountAbstraction/AccountAbstractionTransaction.ts:20](https://github.com/web3well/ethdk/blob/89d0f1c/ethdk/src/AccountAbstraction/AccountAbstractionTransaction.ts#L20)

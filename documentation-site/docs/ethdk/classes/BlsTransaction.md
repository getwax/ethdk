## Implements

- `default`

## Table of contents

### Constructors

- [constructor](BlsTransaction.md#constructor)

### Properties

- [hash](BlsTransaction.md#hash)
- [network](BlsTransaction.md#network)

### Methods

- [getAggregator](BlsTransaction.md#getaggregator)
- [getTransactionReceipt](BlsTransaction.md#gettransactionreceipt)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new BlsTransaction**(`«destructured»`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `bundleHash` | `string` |
| › `network` | `Network` |

#### Defined in

[Bls/BlsTransaction.ts:16](https://github.com/web3well/ethdk/blob/89d0f1c/ethdk/src/Bls/BlsTransaction.ts#L16)

## Properties

### <a id="hash" name="hash"></a> hash

• **hash**: `string`

#### Implementation of

Transaction.hash

#### Defined in

[Bls/BlsTransaction.ts:13](https://github.com/web3well/ethdk/blob/89d0f1c/ethdk/src/Bls/BlsTransaction.ts#L13)

___

### <a id="network" name="network"></a> network

• **network**: `BlsNetwork`

#### Defined in

[Bls/BlsTransaction.ts:14](https://github.com/web3well/ethdk/blob/89d0f1c/ethdk/src/Bls/BlsTransaction.ts#L14)

## Methods

### <a id="getaggregator" name="getaggregator"></a> getAggregator

▸ `Private` **getAggregator**(): `default`

#### Returns

`default`

#### Defined in

[Bls/BlsTransaction.ts:32](https://github.com/web3well/ethdk/blob/89d0f1c/ethdk/src/Bls/BlsTransaction.ts#L32)

___

### <a id="gettransactionreceipt" name="gettransactionreceipt"></a> getTransactionReceipt

▸ **getTransactionReceipt**(): `Promise`<`undefined` \| `ReceiptResponse`\>

#### Returns

`Promise`<`undefined` \| `ReceiptResponse`\>

#### Defined in

[Bls/BlsTransaction.ts:27](https://github.com/web3well/ethdk/blob/89d0f1c/ethdk/src/Bls/BlsTransaction.ts#L27)

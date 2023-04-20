## Implements

- `default`

## Table of contents

### Constructors

- [constructor](BlsAccount.md#constructor)

### Properties

- [accountType](BlsAccount.md#accounttype)
- [address](BlsAccount.md#address)
- [blsProvider](BlsAccount.md#blsprovider)
- [blsSigner](BlsAccount.md#blssigner)
- [networkConfig](BlsAccount.md#networkconfig)
- [privateKey](BlsAccount.md#privatekey)

### Methods

- [getAggregator](BlsAccount.md#getaggregator)
- [getBalance](BlsAccount.md#getbalance)
- [resetAccountPrivateKey](BlsAccount.md#resetaccountprivatekey)
- [sendTransaction](BlsAccount.md#sendtransaction)
- [setTrustedAccount](BlsAccount.md#settrustedaccount)
- [createAccount](BlsAccount.md#createaccount)
- [generatePrivateKey](BlsAccount.md#generateprivatekey)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• `Private` **new BlsAccount**(`«destructured»`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `address` | `string` |
| › `network` | `BlsNetwork` |
| › `privateKey` | `string` |
| › `provider` | `default` |
| › `signer` | `default` |

#### Defined in

[Bls/BlsAccount.ts:26](https://github.com/web3well/ethdk/blob/dc49f5a/ethdk/src/Bls/BlsAccount.ts#L26)

## Properties

### <a id="accounttype" name="accounttype"></a> accountType

• **accountType**: `string` = `'bls'`

#### Implementation of

Account.accountType

#### Defined in

[Bls/BlsAccount.ts:18](https://github.com/web3well/ethdk/blob/dc49f5a/ethdk/src/Bls/BlsAccount.ts#L18)

___

### <a id="address" name="address"></a> address

• **address**: `string`

#### Implementation of

Account.address

#### Defined in

[Bls/BlsAccount.ts:20](https://github.com/web3well/ethdk/blob/dc49f5a/ethdk/src/Bls/BlsAccount.ts#L20)

___

### <a id="blsprovider" name="blsprovider"></a> blsProvider

• `Private` `Readonly` **blsProvider**: `default`

#### Defined in

[Bls/BlsAccount.ts:23](https://github.com/web3well/ethdk/blob/dc49f5a/ethdk/src/Bls/BlsAccount.ts#L23)

___

### <a id="blssigner" name="blssigner"></a> blsSigner

• `Private` `Readonly` **blsSigner**: `default`

#### Defined in

[Bls/BlsAccount.ts:24](https://github.com/web3well/ethdk/blob/dc49f5a/ethdk/src/Bls/BlsAccount.ts#L24)

___

### <a id="networkconfig" name="networkconfig"></a> networkConfig

• `Private` `Readonly` **networkConfig**: `BlsNetwork`

#### Defined in

[Bls/BlsAccount.ts:22](https://github.com/web3well/ethdk/blob/dc49f5a/ethdk/src/Bls/BlsAccount.ts#L22)

___

### <a id="privatekey" name="privatekey"></a> privateKey

• `Private` `Readonly` **privateKey**: `string`

#### Defined in

[Bls/BlsAccount.ts:21](https://github.com/web3well/ethdk/blob/dc49f5a/ethdk/src/Bls/BlsAccount.ts#L21)

## Methods

### <a id="getaggregator" name="getaggregator"></a> getAggregator

▸ `Private` **getAggregator**(): `default`

#### Returns

`default`

#### Defined in

[Bls/BlsAccount.ts:170](https://github.com/web3well/ethdk/blob/dc49f5a/ethdk/src/Bls/BlsAccount.ts#L170)

___

### <a id="getbalance" name="getbalance"></a> getBalance

▸ **getBalance**(): `Promise`<`string`\>

Get the balance of this account

#### Returns

`Promise`<`string`\>

The balance of this account formated in ether (instead of wei)

#### Defined in

[Bls/BlsAccount.ts:165](https://github.com/web3well/ethdk/blob/dc49f5a/ethdk/src/Bls/BlsAccount.ts#L165)

___

### <a id="resetaccountprivatekey" name="resetaccountprivatekey"></a> resetAccountPrivateKey

▸ **resetAccountPrivateKey**(`compromisedAccountAddress`, `recoveryPhrase`, `newPrivateKey`): `Promise`<`default`\>

Recovers a compromised BLS wallet by assigning it a new private key. This function
must be called from the trusted account that was previously set by the compromised wallet.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `compromisedAccountAddress` | `string` | The address of the compromised BLS wallet. |
| `recoveryPhrase` | `string` | The recovery phrase associated with the compromised wallet. |
| `newPrivateKey` | `string` | The new private key to be assigned to the compromised wallet. |

#### Returns

`Promise`<`default`\>

Transaction hash of the transaction that was sent to the aggregator

#### Defined in

[Bls/BlsAccount.ts:133](https://github.com/web3well/ethdk/blob/dc49f5a/ethdk/src/Bls/BlsAccount.ts#L133)

___

### <a id="sendtransaction" name="sendtransaction"></a> sendTransaction

▸ **sendTransaction**(`transaction`): `Promise`<`default`\>

Sends a transaction to the aggregator to be bundled and submitted to the L2

#### Parameters

| Name | Type |
| :------ | :------ |
| `transaction` | `Deferrable`<`TransactionRequest`\> |

#### Returns

`Promise`<`default`\>

Transaction hash of the transaction that was sent to the aggregator

#### Implementation of

Account.sendTransaction

#### Defined in

[Bls/BlsAccount.ts:86](https://github.com/web3well/ethdk/blob/dc49f5a/ethdk/src/Bls/BlsAccount.ts#L86)

___

### <a id="settrustedaccount" name="settrustedaccount"></a> setTrustedAccount

▸ **setTrustedAccount**(`recoveryPhrase`, `trustedAccountAddress`): `Promise`<`default`\>

Sets the trusted account for this account. The trusted account will be able to reset this accounts private key
by calling the recoverWallet function using this accounts address and the recovery phrase.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `recoveryPhrase` | `string` | String that is used as salt to generate the recovery hash |
| `trustedAccountAddress` | `string` | Address of the account that will be able to reset this accounts private key |

#### Returns

`Promise`<`default`\>

Transaction hash of the transaction that was sent to the aggregator

#### Defined in

[Bls/BlsAccount.ts:103](https://github.com/web3well/ethdk/blob/dc49f5a/ethdk/src/Bls/BlsAccount.ts#L103)

___

### <a id="createaccount" name="createaccount"></a> createAccount

▸ `Static` **createAccount**(`«destructured»?`): `Promise`<[`BlsAccount`](BlsAccount.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `network?` | `Network` |
| › `privateKey?` | `string` |

#### Returns

`Promise`<[`BlsAccount`](BlsAccount.md)\>

#### Defined in

[Bls/BlsAccount.ts:46](https://github.com/web3well/ethdk/blob/dc49f5a/ethdk/src/Bls/BlsAccount.ts#L46)

___

### <a id="generateprivatekey" name="generateprivatekey"></a> generatePrivateKey

▸ `Static` **generatePrivateKey**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

#### Defined in

[Bls/BlsAccount.ts:77](https://github.com/web3well/ethdk/blob/dc49f5a/ethdk/src/Bls/BlsAccount.ts#L77)

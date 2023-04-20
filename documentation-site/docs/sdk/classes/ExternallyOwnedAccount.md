## Implements

- `default`

## Table of contents

### Constructors

- [constructor](ExternallyOwnedAccount.md#constructor)

### Properties

- [accountType](ExternallyOwnedAccount.md#accounttype)
- [address](ExternallyOwnedAccount.md#address)
- [networkConfig](ExternallyOwnedAccount.md#networkconfig)
- [privateKey](ExternallyOwnedAccount.md#privatekey)
- [provider](ExternallyOwnedAccount.md#provider)
- [seedPhrase](ExternallyOwnedAccount.md#seedphrase)
- [signer](ExternallyOwnedAccount.md#signer)

### Methods

- [getBalance](ExternallyOwnedAccount.md#getbalance)
- [sendTransaction](ExternallyOwnedAccount.md#sendtransaction)
- [createAccount](ExternallyOwnedAccount.md#createaccount)
- [createAccountFromPrivateKey](ExternallyOwnedAccount.md#createaccountfromprivatekey)
- [createAccountFromSeedPhrase](ExternallyOwnedAccount.md#createaccountfromseedphrase)
- [generatePrivateKey](ExternallyOwnedAccount.md#generateprivatekey)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• `Private` **new ExternallyOwnedAccount**(`«destructured»`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `address` | `string` |
| › `network` | `ExternallyOwnedAccountNetwork` |
| › `privateKey` | `string` |
| › `provider` | `JsonRpcProvider` |
| › `seedPhrase` | `string` |
| › `signer` | `Wallet` |

#### Defined in

[ExternallyOwnedAccount/ExternallyOwnedAccount.ts:25](https://github.com/web3well/ethdk/blob/dc49f5a/ethdk/src/ExternallyOwnedAccount/ExternallyOwnedAccount.ts#L25)

## Properties

### <a id="accounttype" name="accounttype"></a> accountType

• **accountType**: `string` = `'eoa'`

#### Implementation of

Account.accountType

#### Defined in

[ExternallyOwnedAccount/ExternallyOwnedAccount.ts:16](https://github.com/web3well/ethdk/blob/dc49f5a/ethdk/src/ExternallyOwnedAccount/ExternallyOwnedAccount.ts#L16)

___

### <a id="address" name="address"></a> address

• **address**: `string`

#### Implementation of

Account.address

#### Defined in

[ExternallyOwnedAccount/ExternallyOwnedAccount.ts:18](https://github.com/web3well/ethdk/blob/dc49f5a/ethdk/src/ExternallyOwnedAccount/ExternallyOwnedAccount.ts#L18)

___

### <a id="networkconfig" name="networkconfig"></a> networkConfig

• `Private` `Readonly` **networkConfig**: `ExternallyOwnedAccountNetwork`

#### Defined in

[ExternallyOwnedAccount/ExternallyOwnedAccount.ts:21](https://github.com/web3well/ethdk/blob/dc49f5a/ethdk/src/ExternallyOwnedAccount/ExternallyOwnedAccount.ts#L21)

___

### <a id="privatekey" name="privatekey"></a> privateKey

• `Private` `Readonly` **privateKey**: `string`

#### Defined in

[ExternallyOwnedAccount/ExternallyOwnedAccount.ts:19](https://github.com/web3well/ethdk/blob/dc49f5a/ethdk/src/ExternallyOwnedAccount/ExternallyOwnedAccount.ts#L19)

___

### <a id="provider" name="provider"></a> provider

• `Private` `Readonly` **provider**: `JsonRpcProvider`

#### Defined in

[ExternallyOwnedAccount/ExternallyOwnedAccount.ts:22](https://github.com/web3well/ethdk/blob/dc49f5a/ethdk/src/ExternallyOwnedAccount/ExternallyOwnedAccount.ts#L22)

___

### <a id="seedphrase" name="seedphrase"></a> seedPhrase

• `Private` `Readonly` **seedPhrase**: `string`

#### Defined in

[ExternallyOwnedAccount/ExternallyOwnedAccount.ts:20](https://github.com/web3well/ethdk/blob/dc49f5a/ethdk/src/ExternallyOwnedAccount/ExternallyOwnedAccount.ts#L20)

___

### <a id="signer" name="signer"></a> signer

• `Private` `Readonly` **signer**: `Wallet`

#### Defined in

[ExternallyOwnedAccount/ExternallyOwnedAccount.ts:23](https://github.com/web3well/ethdk/blob/dc49f5a/ethdk/src/ExternallyOwnedAccount/ExternallyOwnedAccount.ts#L23)

## Methods

### <a id="getbalance" name="getbalance"></a> getBalance

▸ **getBalance**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

#### Defined in

[ExternallyOwnedAccount/ExternallyOwnedAccount.ts:149](https://github.com/web3well/ethdk/blob/dc49f5a/ethdk/src/ExternallyOwnedAccount/ExternallyOwnedAccount.ts#L149)

___

### <a id="sendtransaction" name="sendtransaction"></a> sendTransaction

▸ **sendTransaction**(`transaction`): `Promise`<`default`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `transaction` | `Deferrable`<`TransactionRequest`\> |

#### Returns

`Promise`<`default`\>

#### Implementation of

Account.sendTransaction

#### Defined in

[ExternallyOwnedAccount/ExternallyOwnedAccount.ts:139](https://github.com/web3well/ethdk/blob/dc49f5a/ethdk/src/ExternallyOwnedAccount/ExternallyOwnedAccount.ts#L139)

___

### <a id="createaccount" name="createaccount"></a> createAccount

▸ `Static` **createAccount**(`«destructured»?`): [`ExternallyOwnedAccount`](ExternallyOwnedAccount.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `network?` | `Network` |
| › `privateKey?` | `string` |

#### Returns

[`ExternallyOwnedAccount`](ExternallyOwnedAccount.md)

#### Defined in

[ExternallyOwnedAccount/ExternallyOwnedAccount.ts:48](https://github.com/web3well/ethdk/blob/dc49f5a/ethdk/src/ExternallyOwnedAccount/ExternallyOwnedAccount.ts#L48)

___

### <a id="createaccountfromprivatekey" name="createaccountfromprivatekey"></a> createAccountFromPrivateKey

▸ `Static` **createAccountFromPrivateKey**(`«destructured»`): [`ExternallyOwnedAccount`](ExternallyOwnedAccount.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `network?` | `Network` |
| › `privateKey` | `string` |

#### Returns

[`ExternallyOwnedAccount`](ExternallyOwnedAccount.md)

#### Defined in

[ExternallyOwnedAccount/ExternallyOwnedAccount.ts:67](https://github.com/web3well/ethdk/blob/dc49f5a/ethdk/src/ExternallyOwnedAccount/ExternallyOwnedAccount.ts#L67)

___

### <a id="createaccountfromseedphrase" name="createaccountfromseedphrase"></a> createAccountFromSeedPhrase

▸ `Static` **createAccountFromSeedPhrase**(`«destructured»`): [`ExternallyOwnedAccount`](ExternallyOwnedAccount.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `network?` | `Network` |
| › `seedPhrase` | `string` |

#### Returns

[`ExternallyOwnedAccount`](ExternallyOwnedAccount.md)

#### Defined in

[ExternallyOwnedAccount/ExternallyOwnedAccount.ts:101](https://github.com/web3well/ethdk/blob/dc49f5a/ethdk/src/ExternallyOwnedAccount/ExternallyOwnedAccount.ts#L101)

___

### <a id="generateprivatekey" name="generateprivatekey"></a> generatePrivateKey

▸ `Static` **generatePrivateKey**(): `string`

#### Returns

`string`

#### Defined in

[ExternallyOwnedAccount/ExternallyOwnedAccount.ts:135](https://github.com/web3well/ethdk/blob/dc49f5a/ethdk/src/ExternallyOwnedAccount/ExternallyOwnedAccount.ts#L135)

## Implements

- `default`

## Table of contents

### Constructors

- [constructor](AccountAbstractionAccount.md#constructor)

### Properties

- [aaProvider](AccountAbstractionAccount.md#aaprovider)
- [aaSigner](AccountAbstractionAccount.md#aasigner)
- [accountType](AccountAbstractionAccount.md#accounttype)
- [address](AccountAbstractionAccount.md#address)
- [networkConfig](AccountAbstractionAccount.md#networkconfig)
- [privateKey](AccountAbstractionAccount.md#privatekey)

### Methods

- [getBalance](AccountAbstractionAccount.md#getbalance)
- [sendTransaction](AccountAbstractionAccount.md#sendtransaction)
- [createAccount](AccountAbstractionAccount.md#createaccount)
- [generatePrivateKey](AccountAbstractionAccount.md#generateprivatekey)
- [getAaProvider](AccountAbstractionAccount.md#getaaprovider)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• `Private` **new AccountAbstractionAccount**(`«destructured»`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `address` | `string` |
| › `network` | `AccountAbstractionNetwork` |
| › `privateKey` | `string` |
| › `provider` | `ERC4337EthersProvider` |
| › `signer` | `ERC4337EthersSigner` |

#### Defined in

[AccountAbstraction/AccountAbstractionAccount.ts:28](https://github.com/web3well/ethdk/blob/dc49f5a/ethdk/src/AccountAbstraction/AccountAbstractionAccount.ts#L28)

## Properties

### <a id="aaprovider" name="aaprovider"></a> aaProvider

• `Private` `Readonly` **aaProvider**: `ERC4337EthersProvider`

#### Defined in

[AccountAbstraction/AccountAbstractionAccount.ts:25](https://github.com/web3well/ethdk/blob/dc49f5a/ethdk/src/AccountAbstraction/AccountAbstractionAccount.ts#L25)

___

### <a id="aasigner" name="aasigner"></a> aaSigner

• `Private` `Readonly` **aaSigner**: `ERC4337EthersSigner`

#### Defined in

[AccountAbstraction/AccountAbstractionAccount.ts:26](https://github.com/web3well/ethdk/blob/dc49f5a/ethdk/src/AccountAbstraction/AccountAbstractionAccount.ts#L26)

___

### <a id="accounttype" name="accounttype"></a> accountType

• **accountType**: `string` = `'aa'`

#### Implementation of

Account.accountType

#### Defined in

[AccountAbstraction/AccountAbstractionAccount.ts:20](https://github.com/web3well/ethdk/blob/dc49f5a/ethdk/src/AccountAbstraction/AccountAbstractionAccount.ts#L20)

___

### <a id="address" name="address"></a> address

• **address**: `string`

#### Implementation of

Account.address

#### Defined in

[AccountAbstraction/AccountAbstractionAccount.ts:22](https://github.com/web3well/ethdk/blob/dc49f5a/ethdk/src/AccountAbstraction/AccountAbstractionAccount.ts#L22)

___

### <a id="networkconfig" name="networkconfig"></a> networkConfig

• `Private` `Readonly` **networkConfig**: `AccountAbstractionNetwork`

#### Defined in

[AccountAbstraction/AccountAbstractionAccount.ts:24](https://github.com/web3well/ethdk/blob/dc49f5a/ethdk/src/AccountAbstraction/AccountAbstractionAccount.ts#L24)

___

### <a id="privatekey" name="privatekey"></a> privateKey

• `Private` `Readonly` **privateKey**: `string`

#### Defined in

[AccountAbstraction/AccountAbstractionAccount.ts:23](https://github.com/web3well/ethdk/blob/dc49f5a/ethdk/src/AccountAbstraction/AccountAbstractionAccount.ts#L23)

## Methods

### <a id="getbalance" name="getbalance"></a> getBalance

▸ **getBalance**(): `Promise`<`string`\>

Get the balance of this account

#### Returns

`Promise`<`string`\>

The balance of this account formated in ether (instead of wei)

#### Defined in

[AccountAbstraction/AccountAbstractionAccount.ts:97](https://github.com/web3well/ethdk/blob/dc49f5a/ethdk/src/AccountAbstraction/AccountAbstractionAccount.ts#L97)

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

[AccountAbstraction/AccountAbstractionAccount.ts:79](https://github.com/web3well/ethdk/blob/dc49f5a/ethdk/src/AccountAbstraction/AccountAbstractionAccount.ts#L79)

___

### <a id="createaccount" name="createaccount"></a> createAccount

▸ `Static` **createAccount**(`«destructured»?`): `Promise`<[`AccountAbstractionAccount`](AccountAbstractionAccount.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `network?` | `Network` |
| › `privateKey?` | `string` |

#### Returns

`Promise`<[`AccountAbstractionAccount`](AccountAbstractionAccount.md)\>

#### Defined in

[AccountAbstraction/AccountAbstractionAccount.ts:48](https://github.com/web3well/ethdk/blob/dc49f5a/ethdk/src/AccountAbstraction/AccountAbstractionAccount.ts#L48)

___

### <a id="generateprivatekey" name="generateprivatekey"></a> generatePrivateKey

▸ `Static` **generatePrivateKey**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

#### Defined in

[AccountAbstraction/AccountAbstractionAccount.ts:89](https://github.com/web3well/ethdk/blob/dc49f5a/ethdk/src/AccountAbstraction/AccountAbstractionAccount.ts#L89)

___

### <a id="getaaprovider" name="getaaprovider"></a> getAaProvider

▸ `Static` **getAaProvider**(`provider`, `signer`, `networkConfig`): `Promise`<`ERC4337EthersProvider`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `provider` | `JsonRpcProvider` |
| `signer` | `Signer` |
| `networkConfig` | `AccountAbstractionNetwork` |

#### Returns

`Promise`<`ERC4337EthersProvider`\>

#### Defined in

[AccountAbstraction/AccountAbstractionAccount.ts:104](https://github.com/web3well/ethdk/blob/dc49f5a/ethdk/src/AccountAbstraction/AccountAbstractionAccount.ts#L104)

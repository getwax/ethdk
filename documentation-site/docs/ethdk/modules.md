## Table of contents

### Namespaces

- [networks](modules/networks.md)

### Classes

- [AccountAbstractionAccount](classes/AccountAbstractionAccount.md)
- [AccountAbstractionTransaction](classes/AccountAbstractionTransaction.md)
- [BlsAccount](classes/BlsAccount.md)
- [BlsTransaction](classes/BlsTransaction.md)
- [ExternallyOwnedAccount](classes/ExternallyOwnedAccount.md)
- [ExternallyOwnedAccountTransaction](classes/ExternallyOwnedAccountTransaction.md)

### Functions

- [createAccount](modules.md#createaccount)

## Functions

### <a id="createaccount" name="createaccount"></a> createAccount

▸ **createAccount**<`T`\>(`«destructured»`): `Promise`<`AccountTypeToReturnType`<`T`\>\>

Creates an account of the specified type

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends keyof `AccountTypeMap` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `AccountConfig` & { `accountType`: `T`  } |

#### Returns

`Promise`<`AccountTypeToReturnType`<`T`\>\>

An account of the specified type

#### Defined in

[Ethdk.ts:27](https://github.com/web3well/ethdk/blob/89d0f1c/ethdk/src/Ethdk.ts#L27)

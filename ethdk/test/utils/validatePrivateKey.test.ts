import { expect } from 'chai'
import { describe, it } from 'mocha'
import validatePrivateKey from '../../src/utils/validatePrivateKey'

describe('validatePrivateKey', () => {
  it('should return true for a valid private key', () => {
    // Arrange
    const privateKey =
      '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'

    // Act
    const result = validatePrivateKey(privateKey)

    // Assert
    expect(result.success).to.equal(true)
    expect(result.error).to.equal('')
  })

  const testCases = [
    {
      privateKey:
        '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff800',
      errorMessage:
        'Private key must be 64 characters long, excluding the "0x" prefix',
    },
    {
      privateKey:
        '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff8',
      errorMessage:
        'Private key must be 64 characters long, excluding the "0x" prefix',
    },
    {
      privateKey:
        'ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
      errorMessage: 'Private key must start with "0x"',
    },
    {
      privateKey: '0x',
      errorMessage:
        'Private key must be 64 characters long, excluding the "0x" prefix',
    },
    {
      privateKey: '0x00',
      errorMessage:
        'Private key must be 64 characters long, excluding the "0x" prefix',
    },
    {
      privateKey: 'not a private key',
      errorMessage: 'Private key must start with "0x"',
    },
    {
      privateKey:
        '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2fxyz',
      errorMessage:
        'Private key must only contain lowercase or uppercase hexadecimal characters (a-f, A-F, 0-9)',
    },
    {
      privateKey:
        '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2f!&#',
      errorMessage:
        'Private key must only contain lowercase or uppercase hexadecimal characters (a-f, A-F, 0-9)',
    },
  ]
  testCases.forEach((testCase) => {
    it(`should return false for an invalid private key: ${testCase.privateKey}`, () => {
      // Arrange & Act
      const result = validatePrivateKey(testCase.privateKey)
      // Assert
      expect(result.success).to.equal(false)
      expect(result.error).to.equal(testCase.errorMessage)
    })
  })
})

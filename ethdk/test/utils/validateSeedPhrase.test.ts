import { expect } from 'chai'
import { describe, it } from 'mocha'
import validateSeedPhrase from '../../src/utils/validateSeedPhrase'

describe('validateSeedPhrase', () => {
  const validTestCases = [
    'sock poet alone around radar forum quiz session observe rebel another choice',
    'test test test test test test test test test test test junk',
  ]
  validTestCases.forEach((testCase) => {
    it(`should return true for a valid seed phrase: ${testCase}`, () => {
      // Arrange & Act
      const result = validateSeedPhrase(testCase)

      // Assert
      expect(result.success).to.equal(true)
      expect(result.error).to.equal('')
    })
  })

  const invalidTestCases = [
    {
      seedPhrase:
        'sock poet alone around radar forum quiz session observe rebel another choice long',
      error: 'Seed phrase must contain exactly 12 words',
    },
    {
      seedPhrase:
        'sock poet alone around radar forum quiz session observe rebel short',
      error: 'Seed phrase must contain exactly 12 words',
    },
    {
      seedPhrase:
        'sock poet alone around radar forum quiz session observe rebel another numb3r',
      error:
        'Each word in the seed phrase must only contain lowercase letters (a-z)',
    },
    {
      seedPhrase:
        'sock poet alone around radar forum quiz session observe rebel another whitespa ce',
      error: 'Seed phrase must contain exactly 12 words',
    },
    {
      seedPhrase:
        'Sock Poet Alone Around Radar Forum Quiz Session Observe Rebel Another Captials',
      error:
        'Each word in the seed phrase must only contain lowercase letters (a-z)',
    },
    {
      seedPhrase:
        'sock poet alone around radar forum quiz session observe rebel another  extraspace',
      error: 'Seed phrase must contain exactly 12 words',
    },
  ]
  invalidTestCases.forEach((testCase) => {
    it(`should return true for an invalid seed phrase: ${testCase.seedPhrase}`, () => {
      // Arrange & Act
      const result = validateSeedPhrase(testCase.seedPhrase)

      // Assert
      expect(result.success).to.equal(false)
      expect(result.error).to.equal(testCase.error)
    })
  })
})

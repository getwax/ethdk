import { describe, it } from 'mocha'
import { expect } from 'chai'
import isNullOrUndefined from '../../src/utils/isNullOrUndefined'

describe('isNullOrUndefined', () => {
  it('should return true for null', () => {
    // Arrange
    const value = null

    // Act
    const result = isNullOrUndefined(value)

    // Assert
    expect(result).to.equal(true)
  })

  it('should return true for undefined', () => {
    // Arrange
    const value = undefined

    // Act
    const result = isNullOrUndefined(value)

    // Assert
    expect(result).to.equal(true)
  })

  it('should return false for a number', () => {
    // Arrange
    const value = 42

    // Act
    const result = isNullOrUndefined(value)

    // Assert
    expect(result).to.equal(false)
  })

  const testCases = [0, 42, 'null', 'undefined', [null], true, false]
  testCases.forEach((testCase) => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    it(`should return false for ${testCase}`, () => {
      // Arrange & Act
      const result = isNullOrUndefined(testCase)

      // Assert
      expect(result).to.equal(false)
    })
  })
})

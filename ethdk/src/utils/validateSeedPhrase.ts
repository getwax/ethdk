export default function validateSeedPhrase(input: string): {
  success: boolean
  error: string
} {
  const words = input.split(' ')
  if (words.length !== 12) {
    return {
      success: false,
      error: 'Seed phrase must contain exactly 12 words',
    }
  }

  const lowercaseLettersPattern = /^[a-z]+$/
  for (const word of words) {
    if (!lowercaseLettersPattern.test(word)) {
      return {
        success: false,
        error:
          'Each word in the seed phrase must only contain lowercase letters (a-z)',
      }
    }
  }

  return { success: true, error: '' }
}

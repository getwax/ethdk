export default function validatePrivateKey(input: string): {
  success: boolean
  error: string
} {
  if (!input.startsWith('0x')) {
    return { success: false, error: 'Private key must start with "0x"' }
  }

  if (input.length !== 66) {
    return {
      success: false,
      error:
        'Private key must be 64 characters long, excluding the "0x" prefix',
    }
  }

  const validCharactersPattern = /^[a-fA-F0-9]{64}$/
  if (!validCharactersPattern.test(input.slice(2))) {
    return {
      success: false,
      error:
        'Private key must only contain lowercase or uppercase hexadecimal characters (a-f, A-F, 0-9)',
    }
  }

  return { success: true, error: '' }
}

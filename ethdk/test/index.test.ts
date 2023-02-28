import { generatePrivateKey } from '../src/Ethdk'
import { expect } from 'chai'

describe('Ethdk', () => {
  it('should create a bls private key', async () => {
    const privateKey = await generatePrivateKey('bls')
    // Private key should be a hex string of length 66
    const privateKeyRegex = /^0x[0-9a-fA-F]{64}$/
    expect(privateKey).to.match(privateKeyRegex)
  })
})

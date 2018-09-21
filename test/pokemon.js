
/* eslint no-undef: 1 */
const config = require('../config/config')

const Pokemon = artifacts.require('Pokemon')

contract('Testing ERC721 contract', async (accounts) => {
  let token
  const name = 'Pokemon'
  const symbol = 'PKM'

  const { uriUrl } = config.pokemon

  const [, mintReceiver] = accounts
  const [, , secondMintReceiver] = accounts
  const [, , wrongOwner] = accounts
  const [, , , receiver] = accounts

  beforeEach(async () => {
    token = await Pokemon.new(name, symbol)
  })

  describe('Deploy and minting: ', async () => {
    it('should be able to deploy and mint ERC721 token', async () => {
      const tokenId = 1
      await token.mintUniqueTokenTo(mintReceiver, tokenId, `${uriUrl}/${tokenId}`)
      expect(await token.symbol()).to.equal(symbol)
      expect(await token.name()).to.equal(name)
      expect(await token.ownerOf(tokenId)).to.equal(mintReceiver)
      expect(await token.tokenURI(tokenId)).to.equal(`${uriUrl}/${tokenId}`)
    })
    it('should be impossible to mint same tokenId unique', async () => {
      const tokenId = 1
      await token.mintUniqueTokenTo(mintReceiver, tokenId, `${uriUrl}/${tokenId}`)
      try {
        await token.mintUniqueTokenTo(secondMintReceiver, tokenId, `${uriUrl}/${tokenId}`)
      } catch (e) {
        assert.include(e.message, 'revert', 'Unique tokens can be duplicated')
      }
    })
  })
  describe('Ownership and transfer: ', async () => {
    beforeEach(async () => {
      const min = 1
      const max = 3
      const mintPromises = []
      for (let currentItemId = min; currentItemId <= max; currentItemId += 1) {
        mintPromises.push(token.mintUniqueTokenTo(mintReceiver, currentItemId, `${uriUrl}/${currentItemId}`))
      }
      await Promise.all(mintPromises)
    })
    it('should allow creation of multiple unique tokens and manage ownership', async () => {
      expect(Number(await token.totalSupply())).to.equal(3)
      expect(await token.exists(1)).to.equal(true)
      expect(await token.exists(2)).to.equal(true)
      expect(await token.exists(3)).to.equal(true)
      expect(await token.exists(9999)).to.equal(false)
      expect(await token.ownerOf(1)).to.equal(mintReceiver)
      expect(await token.ownerOf(2)).to.equal(mintReceiver)
      expect(await token.ownerOf(3)).to.equal(mintReceiver)
    })
    describe('Fail cases: ', async () => {
      it('should not allow safe transfers', async () => {
        try {
          await token.safeTransferFrom(wrongOwner, receiver, 1, {
            from: wrongOwner,
          })
        } catch (e) {
          assert.include(e.message, 'revert', 'Can move not owned token')
        }

        try {
          await token.safeTransferFrom(mintReceiver, receiver, 4, {
            from: mintReceiver,
          })
        } catch (e) {
          assert.include(e.message, 'revert', 'Can move not exsting token')
        }
      })
    })
    describe('Success cases: ', async () => {
      it('should allow safe transfers', async () => {
        await token.safeTransferFrom(mintReceiver, receiver, 2, {
          from: mintReceiver,
        })
        expect(await token.ownerOf(2)).to.equal(receiver)
      })
    })
  })
})

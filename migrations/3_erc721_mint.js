/* eslint no-undef: 1 */
/* global artifacts, web3 */
const Pokemon = artifacts.require('./Pokemon.sol')
const colors = require('colors')
const config = require('../config/config')

let receiver

module.exports = (deployer, network, accounts) => Pokemon.deployed().then((instance) => {
  // retriving pokemon token instance
  const pokemonToken = instance
  // setting the receiver of the all minted tokens
  if (config.networks[network] && web3.isAddress(config.networks[network].receiver)) {
    receiver = config.networks[network].receiver
  } else {
    [, receiver] = accounts
  }
  console.log(colors.magenta(`[receiver address]: ${receiver}`))
  // setting the range for pokemons to be minted
  const { min } = config.pokemon
  const { max } = config.pokemon
  const { uriUrl } = config.pokemon

  const mintingPromises = []

  // for the setted range mint a token composed by:
  //  - its unique ID
  //  - a meta URI url connected to a service returning a JSON schema defined as follows
  //    - {
  //        "name": "Bulbasaur",
  //        "description": "Pokemon description",
  //        "image": "http://localhost:3000/assets/images/1.png",
  //        "meta": "http://localhost:3000/api/pokemons/1/meta"
  //      }
  for (let currentItemId = min; currentItemId <= max; currentItemId += 1) {
    mintingPromises.push(
      pokemonToken.mintUniqueTokenTo(
        receiver,
        currentItemId,
        `${uriUrl}/${currentItemId}`,
      ),
    )
  }

  Promise.all(mintingPromises).then(() => {
    console.log('All tokens has been minted during the migration')
  })
})

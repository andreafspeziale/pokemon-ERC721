/* eslint no-undef: 1 */
const Pokemon = artifacts.require('./Pokemon.sol')
const colors = require('colors')

module.exports = deployer => deployer.deploy(Pokemon, 'Pokemon', 'PKM')
  .then((instance) => {
    console.log(colors.green(`[pokemonToken address]: ${instance.address}`))
  })

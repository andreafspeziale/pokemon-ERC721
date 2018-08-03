const Pokemon = artifacts.require('./Pokemon.sol')
const colors  = require('colors')

module.exports = async function(deployer) {
  await deployer.deploy(Pokemon, 'Pokemon', 'PKM')
  const pokemonToken = await Pokemon.deployed()
  console.log(colors.green(`[pokemonToken address]: ${pokemonToken.address}`))
};
/* eslint no-undef: 1 */
const Pokemon = artifacts.require('Pokemon')
const colors = require('colors')
const config = require('../config/config')

module.exports = async () => {
  let receiver
  const pokemonToken = await Pokemon.deployed()
  const { network } = web3.version
  if (network === '47') {
    [receiver] = web3.eth.accounts
  } else {
    [receiver] = config.networks.parity
  }

  // NOTE:
  // at this stage all the avaiable pokemon between the range have been minted
  // to use this script an extra the max of the pokemon range becomes the new min
  // and the extraMax is used to randomly mint new items

  // normal max range
  const { max } = config.pokemon
  // the new min is the max normal range
  const min = max
  const { extraMax } = config.pokemon
  const { uriUrl } = config.pokemon

  const pokemonItem = Math.floor(Math.random() * (extraMax - min + 1)) + min

  const exists = await pokemonToken.exists(pokemonItem)

  if (exists) {
    console.log(colors.yellow(`[exists]: ${exists}`))
    console.warn(colors.yellow(`Sorry but item ${pokemonItem} has been already mined`))
  } else {
    console.log(colors.green(`[exists]: ${exists}`))
    const mintTx = await pokemonToken.mintUniqueTokenTo(receiver, pokemonItem, `${uriUrl}/${pokemonItem}`)
    if (mintTx.receipt.status === '0x1' || mintTx.receipt.status === 1) {
      console.log(colors.green('[mintTx]: success'))
    } else {
      console.log(colors.red('[mintTx]: fail'))
    }
    console.log(colors.magenta(`[pokemonItem minted]: ${pokemonItem}`))
  }
}

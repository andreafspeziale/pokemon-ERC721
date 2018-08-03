const Pokemon = artifacts.require('./Pokemon.sol')
const colors  = require('colors')
const config = require('../config/config')
const rp = require('request-promise')
let receiver

module.exports = async function (deployer, network, accounts) {
    const pokemonToken = await Pokemon.deployed()
    network === 'development' ? receiver = accounts[1] : receiver = config.networks[network].receiver
    console.log(colors.magenta(`[receiver address]: ${receiver}`))

    const min = config.pokemon.min
    const max = config.pokemon.max
    const endpoint = config.pokemon.endpoint
    const pokemonItem = Math.floor(Math.random() * (max - min + 1)) + min
    const pokemon = await rp({
        uri: endpoint + 'pokemon/' + pokemonItem,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true
    })

    const mintTx = await pokemonToken.mintUniqueTokenTo(receiver, pokemonItem, pokemon.name)

    if(mintTx.receipt.status === '0x1' || mintTx.receipt.status === '1')
        console.log(colors.green(`[mintTx]: success`))
    else
        console.log(colors.red(`[mintTx]: fail`))

    console.log(colors.green(`[mintTx]: ${mintTx.receipt.status === '0x1' ? 'success' : 'fail'}`))
    console.log(colors.magenta(`[pokemonItem minted]: ${pokemonItem}`))
    console.log(colors.magenta(`[pokemonName minted]: ${pokemon.name}`))
};
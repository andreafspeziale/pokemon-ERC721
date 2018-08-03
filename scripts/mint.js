const Pokemon = artifacts.require('Pokemon')
const config = require('../config/config')
const rp = require('request-promise')
const colors  = require('colors')

module.exports = async function(callback) {
    let receiver
    const pokemonToken = await Pokemon.deployed();
    const network = web3.version.network
    network === '47' ? receiver = web3.eth.accounts[0] : receiver = config.networks.parity.receiver
    
    const min = config.pokemon.min
    const max = config.pokemon.max
    const endpoint = config.pokemon.endpoint
    const pokemonItem = Math.floor(Math.random() * (max - min + 1)) + min

    const exists = await pokemonToken.exists(pokemonItem)
    const pokemon = await rp({
        uri: endpoint + 'pokemon/' + pokemonItem,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true
    })

    if(exists) {
        console.log(colors.yellow(`[exists]: ${exists}`))
        console.warn(colors.yellow(`Sorry but item ${pokemonItem}, ${pokemon.name} has been already mined`))
    } else {
        console.log(colors.green(`[exists]: ${exists}`))
        const mintTx = await pokemonToken.mintUniqueTokenTo(receiver, pokemonItem, pokemon.name)
        if(mintTx.receipt.status === '0x1' || mintTx.receipt.status === 1)
            console.log(colors.green(`[mintTx]: success`))
        else
            console.log(colors.red(`[mintTx]: fail`))
        console.log(colors.magenta(`[pokemonItem minted]: ${pokemonItem}`))
        console.log(colors.magenta(`[pokemonName minted]: ${pokemon.name}`))
    }
}
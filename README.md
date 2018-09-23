# Pokemon ERC-721
> ERC-721 is the Ethereum standard for non-fungible tokens.

## Full working sample
This project is composed by two components:
- **Truffle project**
- **App** - [repository](https://github.com)

The *Truffle project* contains the smart contracts and all the tools for the contracts deployment and testing.

The *App project* contains a simple server to retrive the `Pokemon tokenURI` information and a HTML page to display and transfer the tokens and so the related Pokemons.

To quickly run the whole project
- clone this repository
- `$ npm i`
- `$ cd config && cp config.js.sample config.js`
- use the following as `config.js`: 
```
module.exports = {
  pokemon: {
    min: 1,
    max: 151,
    extraMax: 201,
    uriUrl: 'http://localhost:3000/api/pokemons',
  },
  networks: {
    parity: {
      receiver: 'SOMETHING',
    },
  },
} 
```
- `$ npm run ganache` | Save the private keys of the displayed accounts, you will need to import it into `Metamask`
- `$ npm run migrate:development`

At this point leaving all up and running move to the [*Pokemon App* README](https://github.com) and follow the instructions.

## System used
> System used during the development of the project
- node v10.9.0
- npm 6.2.0

## Install
> Install project dependencies

Command: *`$ npm i`*

## Available networks
> Truffle newtowks
- `development`
- `parity` (usage needs to be granted)

## Run local Ethereum node
> As it's configured the following script spawn a local Ethereum Network with the following params:
> - port: 7545
> - networkId: 47
> - blockTime: 1 sec

Command: *`$ npm run ganache`*

## Truffle migration
> Deploy and mint each unique token to the specified network

> NOTE: for the contracts deployment will be used the `eth.accounts[0]` on both network (it needs to be unlock and funded)

> NOTE: at *`t0`* all the tokens will be minted towards `eth.accounts[1]` in the `development network`

> NOTE: at *`t0`* all the tokens will be minted towards `config specified account` in the `parity network`

Command: *`$ npm run migrate:NETWORK_NAME`*

## Run the tests
> Truffle smart contract tests

Command: *`$ npm run test:NETWORK_NAME`*

## Mint Pokemon on demand
> NOTE: will mint towards `eth.accounts[1]` in the `development network`

> NOTE: will mint towards `config specified account` in the `parity network`

Command: *`$ npm run mint:NETWORK_NAME`*

## Config
The **config folder** contains a config file where you can specified for the parity network the receiver address of the minted tokens.

In addition you can specify the range of avaiable pokemons you want to mint.
Keep in mind that the related App project supports only the first 151 pokemon.
# Pokemon ERC721
ERC721 is the Ethereum standard for non-fungible tokens.

## System used
- node v9.10.1
- npm 5.8.0

## Install
- `$ npm i`

## Set env
- `$ source set_path.sh`

## Network choices
- development
- parity (usage needs to be granted)

## Run local node
- `$ npm run ganache`

## Migrate
- `$ npm run migrate:NETWORK_NAME`

## Test
- `$ npm run test:NETWORK_NAME`

## Mint Pokemon
- `$ npm run mint:NETWORK_NAME`

## Config
The config folder contains a config file where you can specified for the parity network the receiver address of the minted tokens.

Plus you can specify the range of avaiable pokemons.
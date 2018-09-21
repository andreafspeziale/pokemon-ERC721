/* eslint no-undef: 1 */
const Migrations = artifacts.require('./Migrations.sol')
const colors = require('colors')

module.exports = (deployer, network) => {
  console.log(colors.magenta(`[network]: ${network}`))
  deployer.deploy(Migrations)
}

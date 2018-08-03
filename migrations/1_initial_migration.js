var Migrations = artifacts.require("./Migrations.sol")
const colors   = require('colors')

module.exports = function(deployer, network) {
  console.log(colors.magenta(`[network]: ${network}`))
  deployer.deploy(Migrations)
}

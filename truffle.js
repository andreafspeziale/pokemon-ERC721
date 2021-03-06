module.exports = {
  compilers: {
    solc: {
      version: '0.4.24+commit.e67f0147',
    },
  },
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '47',
    },
    parity: {
      host: 'dev-shared.eidoo.io',
      port: 8545,
      network_id: '8995',
      gas: 4700000,
      gasPrice: 22000000000,
    },
  },
}

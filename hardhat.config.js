const { task } = require("hardhat/config");

require("@nomiclabs/hardhat-waffle");
const dotenv = require("dotenv");

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
  solidity: "0.8.4",
  networks: {
    kovan: {
      url: `${process.env.KORVAN_URL}${process.env.INFURA_KEY}`,
      chainId: 42,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};

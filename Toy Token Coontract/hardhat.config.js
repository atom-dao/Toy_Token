require("@nomiclabs/hardhat-waffle");
require('dotenv').config()

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


module.exports = {
  solidity: "0.8.9",
  networks:{
    mumbai:{
      url: 'https://polygon-mumbai.g.alchemy.com/v2/DDzeTt7Tg_d1xY6DEWW539LpnQZYW8xW',
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    }
  }
};


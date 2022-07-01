const hre = require("hardhat")

const main = async() => {
    const toyTokenFactory = await hre.ethers.getContractFactory("TOYTOKEN")
    const toyToken = await toyTokenFactory.deploy()
    await toyToken.deployed()

    console.log("Token contract deployed successfully!")
    const tokenName = await toyToken.name()
    console.log("Token Name : ",tokenName)

    const tokenSymbol = await toyToken.symbol()
    console.log("Token Symbol : ",tokenSymbol)

    const totalSupply = await toyToken.totalSupply()
    console.log("Total Supply : ",totalSupply)

}

const runMain = async() => {
    try{
        await main()
        process.exit(0)
    } catch(err){
        console.error(err)
        process.exit(1)
    }
}

runMain()
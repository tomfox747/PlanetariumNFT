const hre = require("hardhat");

const marketplaceAddress = "0x59b670e9fA9D0A427751Af201D676719a970857b"

const formatter = () => {
    console.log("----------------------------------------------------")
}

const main = async () => {
    
    let contract = await hre.ethers.getContractAt("GalaxyMarketplace", marketplaceAddress)
    let result = await contract.functions.getGalaxies()

    formatter()
    console.log(result)
    formatter()
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error(error);
    process.exit(1);
    });
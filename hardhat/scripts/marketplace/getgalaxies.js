const hre = require("hardhat");
const addresses = require('../../contractAddresses')

// CONFIG------------------------------------------------------------------
const marketplaceAddress = addresses.addresses.marketPlaces.Galaxy
// CONFIG------------------------------------------------------------------

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
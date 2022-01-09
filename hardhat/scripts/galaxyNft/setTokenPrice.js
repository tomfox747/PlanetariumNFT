const { getCreate2Address } = require("ethers/lib/utils");
const hre = require("hardhat");
const addresses = require('../../contractAddresses')

//Configuration -----------------------------------------------------------
const NFTaddress = addresses.addresses.nfts.Galaxy.milkyWay
const price = "1300000000000000000"
//Configuration -----------------------------------------------------------



const formatter = () => {
    console.log("")
    console.log("---------------------------------------------------------")
    console.log("")
}

const main = async () => {

    const nft = await hre.ethers.getContractAt("GalaxyNFT", NFTaddress);
    let result = await nft.functions.setTokenPrice(0, price)
    console.log(result)

    formatter()
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
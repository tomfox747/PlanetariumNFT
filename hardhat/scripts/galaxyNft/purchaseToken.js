const { getCreate2Address } = require("ethers/lib/utils");
const hre = require("hardhat");
const addresses = require('../../contractAddresses')

//Configuration -----------------------------------------------------------
const id = 1
const NFTaddress = addresses.addresses.nfts.Galaxy.milkyWay
//Configuration -----------------------------------------------------------



const formatter = () => {
    console.log("")
    console.log("---------------------------------------------------------")
    console.log("")
}

const main = async () => {

    const nft = await hre.ethers.getContractAt("GalaxyNFT", NFTaddress);
    const options = {value: ethers.utils.parseEther("1.0")}
    let result = await nft.functions.purchaseToken(1, options)
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
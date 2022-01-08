const { getCreate2Address } = require("ethers/lib/utils");
const hre = require("hardhat");

//Configuration -----------------------------------------------------------
const NFTaddress = "0xa85233C63b9Ee964Add6F2cffe00Fd84eb32338f"
//Configuration -----------------------------------------------------------



const formatter = () => {
    console.log("")
    console.log("---------------------------------------------------------")
    console.log("")
}

const main = async () => {

    const nft = await hre.ethers.getContractAt("GalaxyNFT", NFTaddress);
    const options = {value: ethers.utils.parseEther("1.0")}
    await nft.functions.createToken(options)
    console.log("New Token Created")

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
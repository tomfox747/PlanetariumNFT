const { getCreate2Address } = require("ethers/lib/utils");
const hre = require("hardhat");

//Configuration -----------------------------------------------------------
const id = 1
const NFTaddress = "0xa85233C63b9Ee964Add6F2cffe00Fd84eb32338f"
const metaData = {
    type:"Galaxy",
    name:"Milky Way",
    description:"The Milky Way is a large barred spiral galaxy. All the stars we see in the night sky are in our own Milky Way Galaxy. Our galaxy is called the Milky Way because it appears as a milky band of light in the sky when you see it in a really dark area."
}
//Configuration -----------------------------------------------------------



const formatter = () => {
    console.log("")
    console.log("---------------------------------------------------------")
    console.log("")
}

const main = async () => {

    const nft = await hre.ethers.getContractAt("GalaxyNFT", NFTaddress);
    let result = await nft.functions.setMetaData(JSON.stringify(metaData))
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
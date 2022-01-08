const { getCreate2Address } = require("ethers/lib/utils");
const hre = require("hardhat");

//Configuration -----------------------------------------------------------
const contractName = "GalaxyNFT"
const marketplaceAddress = "0x59b670e9fA9D0A427751Af201D676719a970857b"
const name = "Milky way"
const symbol = "MLKY"
const data = {
    "type":"galaxy",
    "description":"The Milky Way is a large barred spiral galaxy. All the stars we see in the night sky are in our own Milky Way Galaxy. Our galaxy is called the Milky Way because it appears as a milky band of light in the sky when you see it in a really dark area.",
    "size":"54325"
}
const price = "1000000000000000000"
//Configuration -----------------------------------------------------------


const formatter = () => {
    console.log("")
    console.log("---------------------------------------------------------")
    console.log("")
}

const main = async () => {

    const marketplace = await hre.ethers.getContractAt("GalaxyMarketplace", marketplaceAddress);

    //string memory name, string memory symbol, address marketplaceAddress, string memory data, uint price
    const GalaxyNFT = await hre.ethers.getContractFactory(contractName);
    const galaxyNft = await GalaxyNFT.deploy(name, symbol, marketplaceAddress, JSON.stringify(data), "1000000000000000000");
    await galaxyNft.deployed();

    console.log("galaxy deployed to: " + galaxyNft.address)

    formatter()
    
    await marketplace.functions.createNewGalaxy(galaxyNft.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
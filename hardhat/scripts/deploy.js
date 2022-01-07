const { getCreate2Address } = require("ethers/lib/utils");
const hre = require("hardhat");

async function main() {

  const galaxyData = {
    "type":"galaxy",
    "description":"The Milky Way is a large barred spiral galaxy. All the stars we see in the night sky are in our own Milky Way Galaxy. Our galaxy is called the Milky Way because it appears as a milky band of light in the sky when you see it in a really dark area.",
    "size":"54325"
  }

  const GalaxyMarketplace = await hre.ethers.getContractFactory("GalaxyMarketplace");
  const galaxyMarketplace = await GalaxyMarketplace.deploy();
  await galaxyMarketplace.deployed();

  //string memory name, string memory symbol, address marketplaceAddress, string memory data, uint price
  const GalaxyNFT = await hre.ethers.getContractFactory("GalaxyNFT");
  const galaxyNft = await GalaxyNFT.deploy("Milky way", "MLKY", galaxyMarketplace.address, JSON.stringify(galaxyData), "1000000000000000000");
  await galaxyNft.deployed();
  
  console.log("Galaxy marketplace deployed to:", galaxyMarketplace.address);
  console.log("Galaxy NFT deployed to:", galaxyNft.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

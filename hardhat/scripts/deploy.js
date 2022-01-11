const { getCreate2Address } = require("ethers/lib/utils");
const hre = require("hardhat");

const formatter = () => {
  console.log("")
  console.log("---------------------------------------------------------")
  console.log("")
}

async function main() {

  const GalaxyMarketplace = await hre.ethers.getContractFactory("GalaxyMarketplace");
  const galaxyMarketplace = await GalaxyMarketplace.deploy();
  await galaxyMarketplace.deployed();

  formatter()
  console.log("Galaxy marketplace deployed to:", galaxyMarketplace.address);
  formatter()

  const StarMarketplace = await hre.ethers.getContractFactory("StarMarketplace");
  const starMarketplace = await StarMarketplace.deploy();
  await starMarketplace.deployed();

  formatter()
  console.log("Star marketplace deployed to:", starMarketplace.address);
  formatter()

  console.log("completed")

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

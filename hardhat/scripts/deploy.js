const { getCreate2Address } = require("ethers/lib/utils");
const hre = require("hardhat");

const GalaxyNftData = require("./galaxyNft/createNftSet")
const StarNftData = require('./starNft/createNftSet')
const PlanetNftData = require('./planetNft/createNftSet')
const MoonNftData = require('./moonNft/createNftSet')
const ConstellationNftData = require('./constellationNft/createNftSet')
const OtherNftData = require('./otherNft/createNftSet')

const addresses = require('../contractAddresses_Fujiv2')

const formatter = () => {
  console.log("")
  console.log("---------------------------------------------------------")
  console.log("")
}

// const deployOverrides = {
//   nonce: 1234
//};

async function main() {

  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());
  
  const GalaxyMarketplace = await hre.ethers.getContractFactory("GalaxyMarketplace");
  const galaxyMarketplace = await GalaxyMarketplace.deploy();
  await galaxyMarketplace.deployed();

  console.log("Galaxy marketplace deployed to:", galaxyMarketplace.address);

  const StarMarketplace = await hre.ethers.getContractFactory("StarMarketplace");
  const starMarketplace = await StarMarketplace.deploy();
  await starMarketplace.deployed();

  console.log("Star marketplace deployed to:", starMarketplace.address);

  const PlanetMarketplace = await hre.ethers.getContractFactory("PlanetMarketplace");
  const planetMarketplace = await PlanetMarketplace.deploy();
  await planetMarketplace.deployed();

  console.log("Planet marketplace deployed to:", planetMarketplace.address);

  const MoonMarketplace = await hre.ethers.getContractFactory("MoonMarketplace");
  const moonMarketplace = await MoonMarketplace.deploy();
  await moonMarketplace.deployed();

  console.log("Moon marketplace deployed to:", moonMarketplace.address);

  const ConstellationMarketplace = await hre.ethers.getContractFactory("ConstellationMarketplace");
  const constellationMarketplace = await ConstellationMarketplace.deploy();
  await constellationMarketplace.deployed();

  console.log("Constellation marketplace deployed to:", constellationMarketplace.address);

  const OtherMarketplace = await hre.ethers.getContractFactory("OtherMarketplace");
  const otherMarketplace = await OtherMarketplace.deploy();
  await otherMarketplace.deployed();

  console.log("Other marketplace deployed to:", otherMarketplace.address);

  console.log("completed")

  formatter()

   //// create star nfts
   let marketplace = await hre.ethers.getContractAt("StarMarketplace", addresses.marketPlaces.Star);

   for(let i = 0; i < StarNftData.length; i++){
     let item = StarNftData[1]
     //string memory name, string memory symbol, address marketplaceAddress, string memory data, uint price
     const StarNFT = await hre.ethers.getContractFactory('StarNFT');
     const starNft = await StarNFT.deploy(item.name, item.symbol, addresses.marketPlaces.Star, JSON.stringify(item.data), "1000000000000000000");
     await starNft.deployed();
 
     console.log(item.name + " deployed to: " + starNft.address)
 
     await marketplace.functions.createNew(starNft.address)
     break
   }

   return

  ////// create galaxy nfts
   marketplace = await hre.ethers.getContractAt("GalaxyMarketplace", addresses.marketPlaces.Galaxy);

  for(let i = 0; i < GalaxyNftData.length; i++){
    let item = GalaxyNftData[i]
    //string memory name, string memory symbol, address marketplaceAddress, string memory data, uint price
    const GalaxyNFT = await hre.ethers.getContractFactory('GalaxyNFT');
    const galaxyNft = await GalaxyNFT.deploy(item.name, item.symbol, addresses.marketPlaces.Galaxy, JSON.stringify(item.data), "1000000000000000000");
    await galaxyNft.deployed();

    console.log(item.name + " deployed to: " + galaxyNft.address)

    await marketplace.functions.createNew(galaxyNft.address)
  }

  //// create star nfts
  marketplace = await hre.ethers.getContractAt("StarMarketplace", addresses.marketPlaces.Star);

  for(let i = 0; i < StarNftData.length; i++){
    let item = StarNftData[1]
    //string memory name, string memory symbol, address marketplaceAddress, string memory data, uint price
    const StarNFT = await hre.ethers.getContractFactory('StarNFT');
    const starNft = await StarNFT.deploy(item.name, item.symbol, addresses.marketPlaces.Star, JSON.stringify(item.data), "1000000000000000000");
    await starNft.deployed();

    console.log(item.name + " deployed to: " + starNft.address)

    await marketplace.functions.createNew(starNft.address)
    break
  }
  
  //// create planet nfts
  marketplace = await hre.ethers.getContractAt("PlanetMarketplace", addresses.marketPlaces.Planet);
  
  for(let i = 0; i < PlanetNftData.length; i++){
    let item = PlanetNftData[i]
    //string memory name, string memory symbol, address marketplaceAddress, string memory data, uint price
    const PlanetNFT = await hre.ethers.getContractFactory('PlanetNFT');
    const planetNft = await PlanetNFT.deploy(item.name, item.symbol, addresses.marketPlaces.Planet, JSON.stringify(item.data), "1000000000000000000");
    await planetNft.deployed();

    console.log(item.name + " deployed to: " + planetNft.address)

    await marketplace.functions.createNew(planetNft.address)
  }

  ////// create moon nfts
  marketplace = await hre.ethers.getContractAt("MoonMarketplace", addresses.marketPlaces.Moon);

  for(let i = 0; i < MoonNftData.length; i++){
    let item = MoonNftData[i]
    //string memory name, string memory symbol, address marketplaceAddress, string memory data, uint price
    const MoonNFT = await hre.ethers.getContractFactory('MoonNFT');
    const moonNft = await MoonNFT.deploy(item.name, item.symbol, addresses.marketPlaces.Moon, JSON.stringify(item.data), "1000000000000000000");
    await moonNft.deployed();

    console.log(item.name + " deployed to: " + moonNft.address)

    await marketplace.functions.createNew(moonNft.address)
  }

  ////// create constellation nfts
  marketplace = await hre.ethers.getContractAt("ConstellationMarketplace", addresses.marketPlaces.Constellation);

  for(let i = 0; i < ConstellationNftData.length; i++){
    let item = ConstellationNftData[i]
    //string memory name, string memory symbol, address marketplaceAddress, string memory data, uint price
    const ConstellationNFT = await hre.ethers.getContractFactory('ConstellationNFT');
    const constellationNft = await ConstellationNFT.deploy(item.name, item.symbol, addresses.marketPlaces.Constellation, JSON.stringify(item.data), "1000000000000000000");
    await constellationNft.deployed();

    console.log(item.name + " deployed to: " + constellationNft.address)

    await marketplace.functions.createNew(constellationNft.address)
  }

  ////// create other nfts
  marketplace = await hre.ethers.getContractAt("OtherMarketplace", addresses.marketPlaces.Other);

  for(let i = 0; i < OtherNftData.length; i++){
    let item = OtherNftData[i]
    //string memory name, string memory symbol, address marketplaceAddress, string memory data, uint price
    const OtherNFT = await hre.ethers.getContractFactory('OtherNFT');
    const otherNft = await OtherNFT.deploy(item.name, item.symbol, addresses.marketPlaces.Other, JSON.stringify(item.data), "1000000000000000000");
    await otherNft.deployed();

    console.log(item.name + " deployed to: " + otherNft.address)

    await marketplace.functions.createNew(otherNft.address)
  }

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

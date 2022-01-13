const { getCreate2Address } = require("ethers/lib/utils");
const hre = require("hardhat");
const addresses = require('../../contractAddresses')

//Configuration -----------------------------------------------------------
const contractName = "ConstellationNFT"
const marketplaceAddress = addresses.marketPlaces.Constellation

const data = [
  {
    name: "Orion The Hunter",
    symbol: "ORION",
    data: {
        "name":"Constellation",
        "imageId":"constellation",
        "type":"constellation",
        "description":"Orion is a prominent constellation located on the celestial equator and visible throughout the world. It is one of the most conspicuous and recognizable constellations in the night sky. It is named after Orion, a hunter in Greek mythology. Its brightest stars are blue-white Rigel and red Betelgeuse.",
    }
  },
  {
    name: "Capricornus",
    symbol: "CPC",
    data: {
        "name":"Capricornus",
        "imageId":"capricornus",
        "type":"constellation",
        "description":"Capricornus is one of the constellations of the zodiac. Its name is Latin for horned goat or goat horn or having horns like a goat's, and it is commonly represented in the form of a sea goat: a mythical creature that is half goat, half fish."
    }
  },
  {
    name: "Scorpius",
    symbol: "SCORP",
    data: {
        "name":"Scorpius",
        "imageId":"scorpius",
        "type":"constellation",
        "description":"Scorpius is one of the constellations of the zodiac and is located in the Southern celestial hemisphere. Scorpius is one of the 48 constellations identified by the Greek astronomer Ptolemy in the second century. Its old astronomical symbol is. It is an ancient constellation that pre-dates the Greeks."
    }
  }
]

const price = "1000000000000000000"
//Configuration -----------------------------------------------------------

const main = async () => {

    const marketplace = await hre.ethers.getContractAt("ConstellationMarketplace", marketplaceAddress);

    for(let i = 0; i < data.length; i++){
      let item = data[i]
      //string memory name, string memory symbol, address marketplaceAddress, string memory data, uint price
      const ConstellationNFT = await hre.ethers.getContractFactory(contractName);
      const constellationNFT = await ConstellationNFT.deploy(item.name, item.symbol, marketplaceAddress, JSON.stringify(item.data), "1000000000000000000");
      await constellationNFT.deployed();

      console.log(item.name + " deployed to: " + constellationNFT.address)
      
      await marketplace.functions.createNew(constellationNFT.address)
    }
    console.log("constellations deployed ----------------------------------------------")
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });

module.exports = data
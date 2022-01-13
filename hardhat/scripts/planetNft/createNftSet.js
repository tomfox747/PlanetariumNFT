const { getCreate2Address } = require("ethers/lib/utils");
const hre = require("hardhat");
const addresses = require('../../contractAddresses')

//Configuration -----------------------------------------------------------
const contractName = "PlanetNFT"
const marketplaceAddress = addresses.marketPlaces.Planet

const data = [
  {
    name: "Earth",
    symbol: "ERT",
    data: {
        "name":"Earth",
        "imageId":"earth",
        "type":"planet",
        "description":"Earth is the planet we live on, one of eight planets in our solar system and the only known place in the universe to support life. Earth is the third planet from the sun, after Mercury and Venus and before Mars. ... Earth is an oblate spheroid. This means it is spherical in shape, but not perfectly round.",
        "diameter":"12,700 Km",
    }
  },
  {
    name: "Mars",
    symbol: "MARS",
    data: {
        "name":"Mars",
        "imageId":"mars",
        "type":"planet",
        "description":"Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System, being larger than only Mercury. In English, Mars carries the name of the Roman god of war and is often referred to as the Red Planet.",
        "diameter":"6791"        
    }
  },
  {
    name: "Saturn",
    symbol: "SAT",
    data: {
        "name":"Saturn",
        "imageId":"saturn",
        "type":"planet",
        "description":"Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is a gas giant with an average radius of about nine and a half times that of Earth. It only has one-eighth the average density of Earth; however, with its larger volume, Saturn is over 95 times more massive.",
        "diameter":"120,000 km"
    }
  }
]

const price = "1000000000000000000"
//Configuration -----------------------------------------------------------

const main = async () => {

    const marketplace = await hre.ethers.getContractAt("PlanetMarketplace", marketplaceAddress);

    for(let i = 0; i < data.length; i++){
      let item = data[i]
      //string memory name, string memory symbol, address marketplaceAddress, string memory data, uint price
      const PlanetNFT = await hre.ethers.getContractFactory(contractName);
      const planetNFT = await PlanetNFT.deploy(item.name, item.symbol, marketplaceAddress, JSON.stringify(item.data), "1000000000000000000");
      await planetNFT.deployed();

      console.log(item.name + " deployed to: " + planetNFT.address)
      
      await marketplace.functions.createNew(planetNFT.address)
    }
    console.log("planets deployed ----------------------------------------------")
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
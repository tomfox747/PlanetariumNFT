const { getCreate2Address } = require("ethers/lib/utils");
const hre = require("hardhat");
const addresses = require('../../contractAddresses')

//Configuration -----------------------------------------------------------
const contractName = "MoonNFT"
const marketplaceAddress = addresses.marketPlaces.Moon

const data = [
  {
    name: "The Moon",
    symbol: "MOON",
    data: {
        "name":"Moon",
        "imageId":"moon",
        "type":"moon",
        "description":"THE MOON The moon is Earth's only natural satellite. The moon is a cold, dry orb whose surface is studded with craters and strewn with rocks and dust (called regolith). The moon has no atmosphere. ... The same side of the moon always faces the Earth.",
        "diameter":"3,474 km",
        "planet":"Earth"
    }
  },
  {
    name: "Titan",
    symbol: "TTN",
    data: {
        "name":"Titan",
        "imageId":"titan",
        "type":"moon",
        "description":"Titan is the largest moon of Saturn and the second-largest natural satellite in the Solar System. It is the only moon known to have a dense atmosphere, and the only known moon or planet other than Earth on which clear evidence of stable bodies of surface liquid has been found.",
        "diameter":"5,149 km",
        "planet":"Saturn"
    }
  },
  {
    name: "Phobos",
    symbol: "Pho",
    data: {
        "name":"Phobos",
        "imageId":"phobos",
        "type":"moon",
        "description":"Phobos is the innermost and larger of the two natural satellites of Mars, the other being Deimos. Both moons were discovered in 1877 by American astronomer Asaph Hall. Phobos is named after the Greek god Phobos, a son of Ares and Aphrodite and twin brother of Deimos.",
        "diameter":"22.533 km",
        "planet":"Mars"
    }
  }
]

const price = "1000000000000000000"
//Configuration -----------------------------------------------------------

const main = async () => {

    const marketplace = await hre.ethers.getContractAt("MoonMarketplace", marketplaceAddress);

    for(let i = 0; i < data.length; i++){
      let item = data[i]
      //string memory name, string memory symbol, address marketplaceAddress, string memory data, uint price
      const MoonNFT = await hre.ethers.getContractFactory(contractName);
      const moonNFT = await MoonNFT.deploy(item.name, item.symbol, marketplaceAddress, JSON.stringify(item.data), "1000000000000000000");
      await moonNFT.deployed();

      console.log(item.name + " deployed to: " + moonNFT.address)
      
      await marketplace.functions.createNew(moonNFT.address)
    }
    console.log("moons deployed ----------------------------------------------")
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
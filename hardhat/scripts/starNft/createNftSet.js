const { getCreate2Address } = require("ethers/lib/utils");
const hre = require("hardhat");
const addresses = require('../../contractAddresses')

//Configuration -----------------------------------------------------------
const contractName = "StarNFT"
const marketplaceAddress = addresses.marketPlaces.Star

const data = [
  {
    name: "Arcturus",
    symbol: "ARC",
    data: {
        "name":"Arcturus",
        "imageId":"arcturus",
        "type":"star",
        "description":"Arcturus is a red giant star in the Northern Hemisphere of Earth's sky and the brightest star in the constellation Boötes (the herdsman). Arcturus is also among the brightest stars that can be seen from Earth. Astronomers say Arcturus will end up as a white dwarf at the end of its life",
        "size":"17.6 million Km",
        "temperature":"4290 K",
        "distance": "36.66 light years"
    }
  },
  {
    name: "Formalhaut",
    symbol: "FORM",
    data: {
        "name":"Formalhaut",
        "imageId":"formalhaut",
        "type":"star",
        "description":"Fomalhaut, also called Alpha Piscis Austrini, the 18th star (excluding the Sun) in order of apparent brightness. It is used in navigation because of its conspicuous place in a sky region otherwise lacking in bright stars. It lies in the southern constellation Piscis Austrinus, 25 light-years from Earth.",
        "size":"",
        "temperature":"8590",
        "distance": "25.11 light yeras"
    }
  },
  {
    name: "Betelgeuse",
    symbol: "BET",
    data: {
        "name":"Betelgeuse",
        "imageId":"betelgeuse",
        "type":"star",
        "description":"Betelgeuse, a red supergiant in the constellation of Orion, abruptly darkened in late 2019, early 2020. The behaviour led many to speculate that it might be about to explode. But a team using the Very Large Telescope (VLT) in Chile says the cause was almost certainly a giant dust cloud between us and the star.",
        "size":"617.1 million Km",
        "temperature":"3500k",
        "distance":"642.5 light years"
    }
  }
]

const price = "1000000000000000000"
//Configuration -----------------------------------------------------------


const formatter = () => {
    console.log("")
    console.log("---------------------------------------------------------")
    console.log("")
}

const main = async () => {

    const marketplace = await hre.ethers.getContractAt("StarMarketplace", marketplaceAddress);

    for(let i = 0; i < data.length; i++){
      let item = data[i]
      //string memory name, string memory symbol, address marketplaceAddress, string memory data, uint price
      const StarNFT = await hre.ethers.getContractFactory(contractName);
      const starNFT = await StarNFT.deploy(item.name, item.symbol, marketplaceAddress, JSON.stringify(item.data), "1000000000000000000");
      await starNFT.deployed();

      console.log(item.name + " deployed to: " + starNFT.address)

      formatter()
      
      await marketplace.functions.createNew(starNFT.address)
    }
    console.log("stars deployed")
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
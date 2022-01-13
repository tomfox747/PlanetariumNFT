const { getCreate2Address } = require("ethers/lib/utils");
const hre = require("hardhat");
const addresses = require('../../contractAddresses')

//Configuration -----------------------------------------------------------
const contractName = "GalaxyNFT"
const marketplaceAddress = addresses.marketPlaces.Galaxy

const data = [
  {
    name: "Messier 83",
    symbol: "MESS",
    data: {
        "name":"Messier 83",
        "imageId":"messier83",
        "type":"galaxy",
        "description":"Messier 83 is a large, photogenic spiral galaxy with a bar-shaped center, similar to the Milky Way. It sits 15 million light-years away in the constellation Hydra. Messier 83 is weird in a couple ways. First, it appears to have a double nucleus at its center — perhaps the mark of two supermassive black holes holding the galaxy together, or perhaps the effect of a lopsided disk of stars orbiting a single, central black hole. Second, Messier 83 is a supernova supersite. Astronomers have directly observed six of these stellar explosions in the galaxy, along with remnants of 300 more. This puts Messier 83 in second place for supernovas, as only the galaxy NGC 6946 has produced more observable supernovas, with nine). ",
        "size":"4444"
    }
  },
  {
    name: "Andromeda",
    symbol: "AND",
    data: {
        "name":"Andromeda",
        "imageId":"andromeda",
        "type":"galaxy",
        "description":"Andromeda, also known as Messier 31 (M31), is a spiral galaxy located about 2.5 million light years away. It is thought that the Milky Way and Andromeda will collide several billion years from now. The black holes located in both galaxies will then reside in the large, elliptical galaxy that results from this merger.",
        "size":"3333"
    }
  },
  {
    name: "Milky way",
    symbol: "MLKY",
    data: {
        "name":"Milky Way",
        "imageId":"milkyway",
        "type":"galaxy",
        "description":"The Milky Way is a large barred spiral galaxy. All the stars we see in the night sky are in our own Milky Way Galaxy. Our galaxy is called the Milky Way because it appears as a milky band of light in the sky when you see it in a really dark area.",
        "size":"2222"
    }
  }
]

const price = "1000000000000000000"
//Configuration -----------------------------------------------------------

const main = async () => {

    const marketplace = await hre.ethers.getContractAt("GalaxyMarketplace", marketplaceAddress);

    for(let i = 0; i < data.length; i++){
      let item = data[i]
      //string memory name, string memory symbol, address marketplaceAddress, string memory data, uint price
      const GalaxyNFT = await hre.ethers.getContractFactory(contractName);
      const galaxyNft = await GalaxyNFT.deploy(item.name, item.symbol, marketplaceAddress, JSON.stringify(item.data), "1000000000000000000");
      await galaxyNft.deployed();

      console.log(item.name + " deployed to: " + galaxyNft.address)

      await marketplace.functions.createNew(galaxyNft.address)
    }
    console.log("galaxies deployed --------------------------------------------")
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
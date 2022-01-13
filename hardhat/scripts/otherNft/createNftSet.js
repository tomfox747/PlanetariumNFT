const { getCreate2Address } = require("ethers/lib/utils");
const hre = require("hardhat");
const addresses = require('../../contractAddresses')

//Configuration -----------------------------------------------------------
const contractName = "OtherNFT"
const marketplaceAddress = addresses.marketPlaces.Other

const data = [
  {
    name: "Oumuamua",
    symbol: "OMU",
    data: {
        "name":"Oumuamua",
        "imageId":"oumuamua",
        "type":"other",
        "description":"Oumuamua is the first known interstellar object detected passing through the Solar System. Formally designated 1I/2017 U1, it was discovered by Robert Weryk using the Pan-STARRS telescope at Haleakalā Observatory, Hawaii, on 19 October 2017, approximately 40 days after it passed its closest point to the Sun on 9 September. When it was first observed, it was about 33 million km (21 million mi; 0.22 AU) from Earth (about 85 times as far away as the Moon), and already heading away from the Sun.",
    }
  },
  {
    name: "Halleys comet",
    symbol: "HSC",
    data: {
        "name":"Halleys comet",
        "imageId":"halleyscomet",
        "type":"other",
        "description":"Halley’s Comet is the most famous of all comets. British astronomer Edmund Halley was the first to realise that comets are periodic, after observing it in 1682 and tallying it to records of two previous comet appearances. He correctly predicted it would return in 1757. The comet is also though to be depicted in the 1066 Bayeux Tapestry."
    }
  },
  {
    name: "Holmberg 15A",
    symbol: "HOLM",
    data: {
        "name":"Holmberg 15A",
        "imageId":"holmberg15a",
        "type":"other",
        "description":"Holmberg 15A is a supergiant elliptical galaxy and the central dominant galaxy of the Abell 85 galaxy cluster in the constellation Cetus, about 700 million light-years from Earth.[1] It was discovered c. 1937 by Erik Holmberg.[2] It briefly shot to fame when it was reported to have the largest core ever observed in a galaxy, spanning some 15,000 light years, however this was subsequently refuted."
    }
  }
]

const price = "1000000000000000000"
//Configuration -----------------------------------------------------------

const main = async () => {

    const marketplace = await hre.ethers.getContractAt("OtherMarketplace", marketplaceAddress);

    for(let i = 0; i < data.length; i++){
      let item = data[i]
      //string memory name, string memory symbol, address marketplaceAddress, string memory data, uint price
      const OtherNFT = await hre.ethers.getContractFactory(contractName);
      const otherNFT = await OtherNFT.deploy(item.name, item.symbol, marketplaceAddress, JSON.stringify(item.data), "1000000000000000000");
      await otherNFT.deployed();

      console.log(item.name + " deployed to: " + otherNFT.address)
      
      await marketplace.functions.createNew(otherNFT.address)
    }
    console.log("others deployed ----------------------------------------------")
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
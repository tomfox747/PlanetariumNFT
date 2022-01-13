pragma solidity ^0.8.4;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

interface IPlanetNFT {
   function getNumberForSale() external view returns(uint);
}

contract PlanetMarketplace is ReentrancyGuard {
    
    address owner;
    uint totalGalaxies;

    struct PlanetItem {
        uint id;
        address nftAddress;
        IPlanetNFT NFT;
    }

    struct PlanetUI {
        address nftAddress;
        uint totalForSale;
    }

    mapping(uint => PlanetItem) galaxies;
    
    constructor(){
        owner = msg.sender;
        totalGalaxies = 0;
    }

    // MANAGE GALAXIES
    function createNew (address nftAddress) public onlyOwner{
        IPlanetNFT nft = IPlanetNFT(nftAddress);
        galaxies[totalGalaxies] = PlanetItem(totalGalaxies, nftAddress, nft);
        totalGalaxies += 1;
    }

    // GETTERS
    function getAll() public view returns (PlanetUI[] memory){
        PlanetUI[] memory data = new PlanetUI[](totalGalaxies);
        for (uint i = 0; i < totalGalaxies; i++) {
            PlanetUI memory itm;
            itm.nftAddress = galaxies[i].nftAddress;
            itm.totalForSale = galaxies[i].NFT.getNumberForSale();
            data[i] = itm;
        }
        return data;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
}
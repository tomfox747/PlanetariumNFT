pragma solidity ^0.8.4;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

interface IGalaxyNFT {
   function getNumberForSale() external view returns(uint);
}

contract GalaxyMarketplace is ReentrancyGuard {
    
    address owner;
    uint totalGalaxies;

    struct GalaxyItem {
        uint id;
        address nftAddress;
        IGalaxyNFT NFT;
    }

    struct GalaxyUI {
        address nftAddress;
        uint totalForSale;
    }

    mapping(uint => GalaxyItem) galaxies;
    
    constructor(){
        owner = msg.sender;
        totalGalaxies = 0;
    }

    // MANAGE GALAXIES
    function createNewGalaxy (address nftAddress) public onlyOwner{
        IGalaxyNFT nft = IGalaxyNFT(nftAddress);
        galaxies[totalGalaxies] = GalaxyItem(totalGalaxies, nftAddress, nft);
        totalGalaxies += 1;
    }

    // GETTERS
    function getGalaxies() public view returns (GalaxyUI[] memory){
        GalaxyUI[] memory data = new GalaxyUI[](totalGalaxies);
        for (uint i = 0; i < totalGalaxies; i++) {
            GalaxyUI memory itm;
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
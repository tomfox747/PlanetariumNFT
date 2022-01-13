pragma solidity ^0.8.4;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

interface IConstellationNFT {
   function getNumberForSale() external view returns(uint);
}

contract ConstellationMarketplace is ReentrancyGuard {
    
    address owner;
    uint totalGalaxies;

    struct ConstellationItem {
        uint id;
        address nftAddress;
        IConstellationNFT NFT;
    }

    struct ConstellationUI {
        address nftAddress;
        uint totalForSale;
    }

    mapping(uint => ConstellationItem) galaxies;
    
    constructor(){
        owner = msg.sender;
        totalGalaxies = 0;
    }

    // MANAGE GALAXIES
    function createNew (address nftAddress) public onlyOwner{
        IConstellationNFT nft = IConstellationNFT(nftAddress);
        galaxies[totalGalaxies] = ConstellationItem(totalGalaxies, nftAddress, nft);
        totalGalaxies += 1;
    }

    // GETTERS
    function getAll() public view returns (ConstellationUI[] memory){
        ConstellationUI[] memory data = new ConstellationUI[](totalGalaxies);
        for (uint i = 0; i < totalGalaxies; i++) {
            ConstellationUI memory itm;
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
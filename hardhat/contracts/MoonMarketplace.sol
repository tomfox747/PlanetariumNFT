pragma solidity ^0.8.4;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

interface IMoonNFT {
   function getNumberForSale() external view returns(uint);
}

contract MoonMarketplace is ReentrancyGuard {
    
    address owner;
    uint totalGalaxies;

    struct MoonItem {
        uint id;
        address nftAddress;
        IMoonNFT NFT;
    }

    struct MoonUI {
        address nftAddress;
        uint totalForSale;
    }

    mapping(uint => MoonItem) galaxies;
    
    constructor(){
        owner = msg.sender;
        totalGalaxies = 0;
    }

    // MANAGE GALAXIES
    function createNew (address nftAddress) public onlyOwner{
        IMoonNFT nft = IMoonNFT(nftAddress);
        galaxies[totalGalaxies] = MoonItem(totalGalaxies, nftAddress, nft);
        totalGalaxies += 1;
    }

    // GETTERS
    function getAll() public view returns (MoonUI[] memory){
        MoonUI[] memory data = new MoonUI[](totalGalaxies);
        for (uint i = 0; i < totalGalaxies; i++) {
            MoonUI memory itm;
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
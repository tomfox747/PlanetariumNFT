pragma solidity ^0.8.4;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

interface IOtherNFT {
   function getNumberForSale() external view returns(uint);
}

contract OtherMarketplace is ReentrancyGuard {
    
    address owner;
    uint totalGalaxies;

    struct OtherItem {
        uint id;
        address nftAddress;
        IOtherNFT NFT;
    }

    struct OtherUI {
        address nftAddress;
        uint totalForSale;
    }

    mapping(uint => OtherItem) galaxies;
    
    constructor(){
        owner = msg.sender;
        totalGalaxies = 0;
    }

    // MANAGE GALAXIES
    function createNew (address nftAddress) public onlyOwner{
        IOtherNFT nft = IOtherNFT(nftAddress);
        galaxies[totalGalaxies] = OtherItem(totalGalaxies, nftAddress, nft);
        totalGalaxies += 1;
    }

    // GETTERS
    function getAll() public view returns (OtherUI[] memory){
        OtherUI[] memory data = new OtherUI[](totalGalaxies);
        for (uint i = 0; i < totalGalaxies; i++) {
            OtherUI memory itm;
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
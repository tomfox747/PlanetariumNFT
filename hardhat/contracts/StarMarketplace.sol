pragma solidity ^0.8.4;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

interface IStarNFT {
   function getNumberForSale() external view returns(uint);
}

contract StarMarketplace is ReentrancyGuard {
    
    address owner;
    uint totalStars;

    struct StarItem {
        uint id;
        address nftAddress;
        IStarNFT NFT;
    }

    struct StarUI {
        address nftAddress;
        uint totalForSale;
    }

    mapping(uint => StarItem) Stars;
    
    constructor(){
        owner = msg.sender;
        totalStars = 0;
    }

    // MANAGE Stars
    function createNew (address nftAddress) public onlyOwner{
        IStarNFT nft = IStarNFT(nftAddress);
        Stars[totalStars] = StarItem(totalStars, nftAddress, nft);
        totalStars += 1;
    }

    // GETTERS
    function getAll() public view returns (StarUI[] memory){
        StarUI[] memory data = new StarUI[](totalStars);
        for (uint i = 0; i < totalStars; i++) {
            StarUI memory itm;
            itm.nftAddress = Stars[i].nftAddress;
            itm.totalForSale = Stars[i].NFT.getNumberForSale();
            data[i] = itm;
        }
        return data;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
}
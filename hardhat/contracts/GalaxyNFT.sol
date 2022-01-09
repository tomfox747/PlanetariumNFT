pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract GalaxyNFT is ERC721URIStorage {

    uint private _tokenCounter;
    uint maxSupply = 100;
    address marketPlace;
    address creator;
    string metaData;
    uint initialPrice;

    struct tokenState {uint id; address owner; bool forSale; uint price; uint pricePaid; uint purchaseDate;}

    mapping(uint => tokenState) tokenStates;

    constructor(string memory name, string memory symbol, address marketplaceAddress, string memory data, uint price) ERC721(name, symbol) {
        marketPlace = marketplaceAddress;
        metaData = data;
        initialPrice = price;
        _tokenCounter = 0;
        creator = msg.sender;

        // mint a single token to the creator
        tokenStates[_tokenCounter] = tokenState(_tokenCounter, msg.sender, false, initialPrice, initialPrice, block.timestamp);
        _mint(msg.sender, _tokenCounter);
        setApprovalForAll(marketPlace, true);
        _tokenCounter += 1;

        setApprovalForAll(marketPlace, true);
    }

    // TOKEN MANAGEMENT ----------------------------------------------------------------------

    function createToken() public payable returns (uint) {
        require(_tokenCounter < maxSupply, "The NFT has already reached maximum supply");
        require(msg.value == initialPrice, "Not enough Eth was passed");

        payable(creator).transfer(msg.value);
        uint newItemId = _tokenCounter;
        tokenStates[newItemId] = tokenState(_tokenCounter, msg.sender, false, initialPrice, initialPrice, block.timestamp);
        _mint(msg.sender, _tokenCounter);
        setApprovalForAll(marketPlace, true);
        
        _tokenCounter += 1;
        return newItemId;
    }

    function setTokenSaleState (uint tokenId, bool saleState) public onlyTokenOwner(tokenId) {tokenStates[tokenId].forSale = saleState;}
    function setTokenPrice(uint tokenId, uint newPrice) public onlyTokenOwner(tokenId) {
        require(newPrice >= 100,"price set too low");
        tokenStates[tokenId].price = newPrice;
    }

    function purchaseToken (uint tokenId) public payable isForSale(tokenId) {
        
        require(msg.value == tokenStates[tokenId].price,"wrong value sent");

        address tokenOwner = ownerOf(tokenId);
        uint totalValue = msg.value;
        uint transferFee = (msg.value / 100) * 7;

        payable(creator).transfer(transferFee);
        payable(tokenOwner).transfer(totalValue - transferFee);

        _transfer(payable(tokenOwner), msg.sender, tokenId);
        tokenStates[tokenId] = tokenState(tokenId, msg.sender, false, totalValue, totalValue, block.timestamp);
    }

    // allows meta data URI to be added or udpated at a later date by the creator
    function addTokenUri(uint id, string memory tokenURI) public onlyCreator {_setTokenURI(id, tokenURI);}
    function setMetaData(string memory data) public onlyCreator {metaData = data;}

    // GETTERS -------------------------------------------------------------------------------

    function getMetaData() public view returns(string memory) {return metaData;}
    function getTokenState(uint tokenId) public view returns(tokenState memory){return tokenStates[tokenId];}
    function getMaxSupply() public view returns(uint){return maxSupply;}
    function getTokenCount() public view returns(uint){return _tokenCounter;}
    function getInitialPrice() public view returns(uint){return initialPrice;}

    function getNumberForSale() public view returns(uint){
        uint result = 0;
        for(uint i = 0; i < _tokenCounter; i++){
            if(tokenStates[i].forSale == true) result += 1;
        }
        return result;
    }

    function getAllTokens() public view returns(tokenState[] memory){
        tokenState[] memory data = new tokenState[](_tokenCounter);
        for(uint i = 0; i < _tokenCounter; i++){
            tokenState memory itm;
            itm.id = tokenStates[i].id;
            itm.owner = tokenStates[i].owner;
            itm.forSale = tokenStates[i].forSale;
            itm.price = tokenStates[i].price;
            itm.pricePaid = tokenStates[i].pricePaid;
            itm.purchaseDate = tokenStates[i].purchaseDate;
            data[i] = itm;
        }
        return data;
    }

    function getSenderTokens() public view returns(tokenState[] memory) {
        tokenState[] memory data = new tokenState[](_tokenCounter);
        for(uint i = 0; i < _tokenCounter; i++){
            if(tokenStates[i].owner == msg.sender){
                tokenState memory itm;
                itm.id = tokenStates[i].id;
                itm.owner = tokenStates[i].owner;
                itm.forSale = tokenStates[i].forSale;
                itm.price = tokenStates[i].price;
                itm.pricePaid = tokenStates[i].pricePaid;
                itm.purchaseDate = tokenStates[i].purchaseDate;
                data[i] = itm;
            }
        }
        return data;
    }

    // MODIFIERS -----------------------------------------------------------------------------

    modifier onlyCreator {require(msg.sender == creator, "only the creator can perform this action");_;}
    modifier onlyTokenOwner (uint tokenId) {require(msg.sender == ownerOf(tokenId), "Only the token owner can perform this action");_;}
    modifier isForSale (uint tokenId) {require(tokenStates[tokenId].forSale == true, "This token is not for sale");_;}
}
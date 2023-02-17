pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./Base64.sol";

contract TicketNFT is ERC721URIStorage, Ownable{
    uint256 public maxAmount;
    uint256 public totalAmount;
    uint256 public price;
    bool public isAvailable;
    address public creator;
    string public name_;
    string public symbol_;
    mapping(address=>uint256) userTickets;
    mapping(uint256=>address) ticketOwner;

    constructor(string memory name, string memory symbol, uint256 _maxAmount, uint256 _price, address _owner) ERC721(name, symbol){
        symbol_=symbol;
        name_=name;
        maxAmount=_maxAmount;
        price = _price;
        creator = _owner;
        isAvailable=true;
    }
    function setMaxAmount(uint256 max)external onlyOwner{
        maxAmount=max;
    }

    function toggleIsAvailable() external {
        require(creator==msg.sender);
        isAvailable=!isAvailable;
    }

    function buyTicket() external payable returns(uint256){
        require(isAvailable, 'Purchase is not available');
        require(totalAmount<maxAmount, 'Sold out, sry m8');
        require(msg.value>=price, 'Incorrect amount');
        require(userTickets[msg.sender]<1, 'You already have a ticket, m8');
        totalAmount++;
        uint256 ticketId=totalAmount;
        _safeMint(msg.sender, ticketId);
        userTickets[msg.sender]=ticketId;
        ticketOwner[ticketId]=msg.sender;
        if (totalAmount==maxAmount) {
            isAvailable=!isAvailable;
        }
         return ticketId;

    }
    function getTokenById(uint256 id)public view returns(address){
        require(id<=totalAmount, 'Incorrect ammount');
        return ticketOwner[id];
    }
    function getTokenIdByOwner(address addy)public view returns(uint256){
        return userTickets[addy];
    }
    function confirmOwnership(address addy) public view returns (bool) {
        return userTickets[addy] > 0;
    }

}

contract ticketCreator{
    mapping (uint256=>TicketNFT) public allEvents;
    uint256 public indexOfDb=0;
    function viewIndex() public view returns(uint256){
        return indexOfDb;
    }
    function createTicket(string memory _name, string memory _symbol, uint256 _maxAmount, uint256 _price) 
    public
    returns(TicketNFT tokenAddress){
        TicketNFT nft = new TicketNFT(_name, _symbol,_maxAmount,_price, msg.sender);
        allEvents[indexOfDb]=nft;
        indexOfDb++;
        return  nft;
    }
}
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TicketNFT is ERC721, Ownable{
    uint256 public maxAmount;
    uint256 public totalAmount;
    uint256 public price;
    bool public isAvailable;
    address public creator;
    mapping(address=>uint256) userTickets;

    constructor(string memory name, string memory symbol, uint256 _maxAmount, uint256 _price, address _owner) ERC721(name, symbol){
        maxAmount=_maxAmount;
        price = _price;
        creator = _owner;
    }
    function setMaxAmount(uint256 max)external onlyOwner{
        maxAmount=max;
    }

    function toggleIsAvailable() external {
        require(creator==msg.sender);
        isAvailable=!isAvailable;
    }

    function buyTicket() external payable{
        require(isAvailable, 'Purchase is not available');
        require(totalAmount<maxAmount, 'Sold out, sry m8');
        require(msg.value==price, 'Incorrect amount');
        require(userTickets[msg.sender]<1, 'You already have a ticket, m8');
        userTickets[msg.sender]++;
        totalAmount++;
        uint256 ticketId=totalAmount;
        _safeMint(msg.sender, ticketId);

    }

}

contract ticketCreator{
    
    function createTicket(string memory _name, string memory _symbol, uint256 _maxAmount, uint256 _price) 
    public
    returns(TicketNFT tokenAddress){
        return new TicketNFT(_name, _symbol,_maxAmount,_price, msg.sender);
    }
}
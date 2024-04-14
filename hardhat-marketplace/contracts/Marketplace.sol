// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Marketplace {
    // Structure to hold details of the item
    struct Item {
        uint price;
        address owner;
        bool isForSale;
    }

    // Mapping from item ID to item details
    mapping(uint => Item) public items;

    // Event declarations
    event ItemPriceSet(uint indexed itemId, uint price, address indexed owner);
    event ItemPurchased(uint indexed itemId, address indexed buyer, address indexed seller, uint price);
    event OwnershipTransferred(uint indexed itemId, address indexed previousOwner, address indexed newOwner);

    // Function to set the price of an item
    function setItemPrice(uint itemId, uint price) public {
        // Ensure the caller is the owner of the item or the item is not yet created
        require(items[itemId].owner == msg.sender || items[itemId].owner == address(0), "Only the item owner can set the price.");

        // Update the item's price and owner information
        if(items[itemId].owner == address(0)) {
            items[itemId].owner = msg.sender; // Set owner if new item
        }
        items[itemId].price = price;
        items[itemId].isForSale = true;

        // Emit the price set event
        emit ItemPriceSet(itemId, price, msg.sender);
    }

    // Function to buy an item
    function buyItem(uint itemId) public payable {
        // Check if the item is for sale
        require(items[itemId].isForSale, "This item is not for sale.");
        // Check if enough funds were sent
        require(msg.value >= items[itemId].price, "Insufficient funds sent.");

        // Get the seller's address before changing it
        address seller = items[itemId].owner;

        // Transfer ownership to the buyer
        items[itemId].owner = msg.sender;
        items[itemId].isForSale = false; // Item is no longer for sale after purchase

        // Pay the seller the item's price
        payable(seller).transfer(items[itemId].price);

        // If any excess funds were sent, refund them to the buyer
        if (msg.value > items[itemId].price) {
            payable(msg.sender).transfer(msg.value - items[itemId].price);
        }

        // Emit the purchase and ownership transferred events
        emit ItemPurchased(itemId, msg.sender, seller, items[itemId].price);
        emit OwnershipTransferred(itemId, seller, msg.sender);
    }


}

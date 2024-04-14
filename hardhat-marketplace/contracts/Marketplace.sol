// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Marketplace {
    struct Item {
        uint price;
        address owner;
        bool isForSale;
    }

    mapping(uint => Item) public items;
    uint public totalItems;  // Counter for the total number of items

    // Event declarations
    event ItemListed(uint indexed itemId, uint price, address indexed owner);
    event ItemPriceSet(uint indexed itemId, uint price, address indexed owner);
    event ItemPurchased(uint indexed itemId, address indexed buyer, address indexed seller, uint price);
    event OwnershipTransferred(uint indexed itemId, address indexed previousOwner, address indexed newOwner);

    // Function to list a new item
    function listItem(uint price) public {
        uint itemId = totalItems++;  // Increment and use totalItems as the new item ID
        items[itemId] = Item({
            price: price,
            owner: msg.sender,
            isForSale: true
        });

        emit ItemListed(itemId, price, msg.sender);
    }

    // Function to set the price of an item
    function setItemPrice(uint itemId, uint price) public {
        require(items[itemId].owner == msg.sender, "Only the item owner can set the price.");
        items[itemId].price = price;
        items[itemId].isForSale = true;
        emit ItemPriceSet(itemId, price, msg.sender);
    }

    // Function to buy an item
    function buyItem(uint itemId) public payable {
        require(items[itemId].isForSale, "This item is not for sale.");
        require(msg.value >= items[itemId].price, "Insufficient funds sent.");

        address seller = items[itemId].owner;
        items[itemId].owner = msg.sender;
        items[itemId].isForSale = false;

        payable(seller).transfer(items[itemId].price);
        if (msg.value > items[itemId].price) {
            payable(msg.sender).transfer(msg.value - items[itemId].price);
        }

        emit ItemPurchased(itemId, msg.sender, seller, items[itemId].price);
        emit OwnershipTransferred(itemId, seller, msg.sender);
    }
}

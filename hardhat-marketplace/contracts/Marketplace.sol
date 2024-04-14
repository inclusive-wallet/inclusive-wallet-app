import React, { useState, useEffect } from 'react';
import { ethers, providers, utils } from 'ethers';

const Marketplace = () => {
  const [itemId, setItemId] = useState('');
  const [price, setPrice] = useState('');
  const [items, setItems] = useState([]);

  const contractAddress = '0x6D4815798326bFfe3B140E1E468c3f13C086Cb00';
  const contractABI = [
    'event ItemListed(uint indexed itemId, uint price, address indexed owner)',
    'event ItemPriceSet(uint indexed itemId, uint price, address indexed owner)',
    'event ItemPurchased(uint indexed itemId, address indexed buyer, address indexed seller, uint price)',
    'event OwnershipTransferred(uint indexed itemId, address indexed previousOwner, address indexed newOwner)',
    'function listItem(uint price) public',
    'function setItemPrice(uint itemId, uint price) public',
    'function buyItem(uint itemId) public payable',
    'function items(uint) public view returns (uint price, address owner, bool isForSale)',
    'function totalItems() public view returns (uint)',
  ];

  const provider = new providers.Web3Provider(window.ethereum);

  useEffect(() => {
    const fetchItems = async () => {
      const contract = new ethers.Contract(contractAddress, contractABI, provider);
      const totalItems = await contract.totalItems();
      const itemsArray = [];
      for (let id = 0; id < totalItems; id++) {
        const item = await contract.items(id);
        itemsArray.push({
          id,
          price: utils.formatEther(item.price),
          owner: item.owner,
          isForSale: item.isForSale,
        });
      }
      setItems(itemsArray);
    };
    fetchItems();
  }, []);

  async function listItem() {
    if (!window.ethereum) {
      alert('Please install MetaMask!');
      return;
    }

    try {
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const marketplaceContract = new ethers.Contract(contractAddress, contractABI, signer);
      const transaction = await marketplaceContract.listItem(utils.parseEther(price));
      await transaction.wait();
      alert('Item listed successfully!');
    } catch (error) {
      console.error('Listing failed:', error);
      alert('Listing failed!');
    }
  }

  async function setItemPrice(itemId, newPrice) {
    if (!window.ethereum) {
      alert('Please install MetaMask!');
      return;
    }

    try {
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const marketplaceContract = new ethers.Contract(contractAddress, contractABI, signer);
      const transaction = await marketplaceContract.setItemPrice(itemId, utils.parseEther(newPrice));
      await transaction.wait();
      alert('Item price updated successfully!');
    } catch (error) {
      console.error('Price update failed:', error);
      alert('Price update failed!');
    }
  }

  async function buyItem(itemId, price) {
    if (!window.ethereum) {
      alert('Please install MetaMask!');
      return;
    }

    try {
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const marketplaceContract = new ethers.Contract(contractAddress, contractABI, signer);
      const transaction = await marketplaceContract.buyItem(itemId, { value: utils.parseEther(price) });
      await transaction.wait();
      alert('Purchase successful!');
    } catch (error) {
      console.error('Purchase failed:', error);
      alert('Purchase failed!');
    }
  }

  return (
    <div>
      <h1>Marketplace</h1>
      <div>
        <input type="text" value={itemId} onChange={(e) => setItemId(e.target.value)} placeholder="Enter Item ID for operations" />
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter Price (in ETH) for listing or setting" />
        <button onClick={() => listItem()}>List Item</button>
        <button onClick={() => setItemPrice(itemId, price)}>Set Item Price</button>
        <button onClick={() => buyItem(itemId, price)}>Buy Item</button>
      </div>
      <div>
        <h2>Items for Sale</h2>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              Item ID: {item.id}, Price: {item.price} ETH, Owned by: {item.owner}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Marketplace;
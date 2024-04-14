import React, { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';

const Marketplace = () => {
    const [itemId, setItemId] = useState('');
    const [price, setPrice] = useState('');
    const [items, setItems] = useState([]);
    const contractAddress = '0x6D4815798326bFfe3B140E1E468c3f13C086Cb00';
    const contractABI = [
        "function buyItem(uint itemId) payable",
        "function setItemPrice(uint itemId, uint price) public",
        "function getItem(uint itemId) public view returns (uint price, address owner, bool isForSale)"
    ];

    // Creating a provider from the global window.ethereum object
    const provider = new Web3Provider(window.ethereum);

    useEffect(() => {   
        const fetchItems = async () => {
            const contract = new ethers.Contract(contractAddress, contractABI, provider);
            const itemsArray = []; // Placeholder: Fetch or simulate an array of item IDs
            for (let id of itemsArray) {
                const item = await contract.getItem(id);
                if (!itemsArray) return; // Check if component is still mounted
                setItems(prevItems => [...prevItems, {
                    id,
                    price: ethers.formatEther(item.price),
                    owner: item.owner,
                    isForSale: item.isForSale
                }]);
            }
        };

        fetchItems();
    }, [provider]);

    

    const handleAccounts = useCallback(async () => {
        if (!window.ethereum) {
            alert('Please install MetaMask!');
            return false;
        }
        await provider.send("eth_requestAccounts", []);
        return true;
    }, [provider]);

    const setItemPrice = useCallback(async () => {
        const hasAccounts = await handleAccounts();
        if (!hasAccounts) return;

        const signer = provider.getSigner();
        const marketplaceContract = new ethers.Contract(contractAddress, contractABI, signer);
        
        try {
            const transaction = await marketplaceContract.setItemPrice(itemId, ethers.parseEther(price));
            await transaction.wait();
            alert('Price set successfully!');
        } catch (error) {
            console.error('Setting price failed:', error);
            alert('Setting price failed!');
        }
    }, [itemId, price, provider]);

    const buyItem = useCallback(async () => {
        const hasAccounts = await handleAccounts();
        if (!hasAccounts) return;

        const signer = provider.getSigner();
        const marketplaceContract = new ethers.Contract(contractAddress, contractABI, signer);
        
        try {
            const transaction = await marketplaceContract.buyItem(itemId, {
                value: ethers.parseEther(price)
            });
            await transaction.wait();
            alert('Purchase successful!');
        } catch (error) {
            console.error('Purchase failed:', error);
            alert('Purchase failed!');
        }
    }, [itemId, price, provider]);

    return (
        <div>
            <h1>Marketplace</h1>
            <div>
                <input
                    type="text"
                    value={itemId}
                    onChange={(e) => setItemId(e.target.value)}
                    placeholder="Enter Item ID for operations"
                />
                <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter Price (in ETH)"
                />
                <button onClick={setItemPrice}>Set Item Price</button>
                <button onClick={buyItem}>Buy Item</button>
            </div>
            <div>
                <h2>Items for Sale</h2>
                <ul>
                    {items.map(item => (
                        <li key={item.id}>
                            Item ID: {item.id}, Price: {ethers.formatEther(item.price)} ETH, Owned by: {item.owner}, For Sale: {item.isForSale ? 'Yes' : 'No'}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Marketplace;

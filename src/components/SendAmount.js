import React, { useState } from 'react';

function SendAmount() {
    const [amount, setAmount] = useState('');

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleSendAmount = async () => {
        // Placeholder for proof generation logic
        const proof = {
            // Example static proof data, replace with dynamic data after generating proof
            proofData: {},
            publicSignals: [amount]
        };

        try {
            const response = await fetch('http://localhost:3001/verify-transaction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ proof, publicSignals: [amount] })
            });
            const responseData = await response.json();

            if (response.ok) {
                alert('Transaction verified and sent successfully!');
            } else {
                alert(`Failed to verify transaction: ${responseData.message}`);
            }
        } catch (error) {
            console.error('Error sending transaction:', error);
            alert('Error sending transaction.');
        }
    };

    return (
        <div>
            <h1>Send Amount</h1>
            <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                placeholder="Enter amount to send"
            />
            <button onClick={handleSendAmount}>Send Amount</button>
        </div>
    );
}

export default SendAmount;

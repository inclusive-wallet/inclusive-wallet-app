import React, { useState } from 'react';

function RequestLoan() {
    const [loanAmount, setLoanAmount] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the form from reloading the page
        console.log('Submitting loan request:', { loanAmount, description });

        // Here you would typically send the data to a backend or blockchain
        // For now, we'll just log it to the console
        // In a real application, replace this with an API call or blockchain transaction
    };

    return (
        <div>
            <h2>Request a Loan</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Loan Amount:
                    <input
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Submit Loan Request</button>
            </form>
        </div>
    );
}

export default RequestLoan;

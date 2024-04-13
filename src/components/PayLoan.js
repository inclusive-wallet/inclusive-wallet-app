import React, { useState } from 'react';
import { generateProof } from '../lib/zkp-utils'; // Utility functions for ZKP

function PayLoan() {
  const [amount, setAmount] = useState('');
  const [proof, setProof] = useState(null);

  const handlePayLoan = async () => {
    if (!amount) return;

    const newProof = await generateProof({
      type: 'payLoan',
      data: { amount }
    });
    setProof(newProof);
  };

  return (
    <div>
      <h2>Pay Loan</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount to Pay"
      />
      <button onClick={handlePayLoan}>Pay Loan</button>
      {proof && (
        <div>
          <h3>Proof of Payment:</h3>
          <pre>{JSON.stringify(proof, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default PayLoan;

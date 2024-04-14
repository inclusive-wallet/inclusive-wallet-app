const express = require('express');
const snarkjs = require('snarkjs');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json()); // middleware to parse JSON request bodies

app.post('/verify-transaction', async (req, res) => {
    //   const { loanAmount } = req.body;

    //   // Assume we have a predefined ZKP circuit and keys already set up
    //   // For simplicity, let's pretend we're verifying that loanAmount is non-negative
    //   const input = {
    //     loanAmount: loanAmount,
    //   };

    //   try {
    //     const { proof, publicSignals } = await snarkjs.groth16.fullProve(input, "Balancecheck.wasm", "BalanceCheck.zkey");

    //     console.log("Proof: ", proof);
    //     console.log("Public signals: ", publicSignals);

    //     res.json({ proof, publicSignals });
    //   } catch (error) {
    //     console.error("Error generating proof: ", error);
    //     res.status(500).send("Failed to generate proof.");
    //   }

    // Simulating a hardcoded proof and public signals response
    const proof = {
        pi_a: ['0x12345', '0x67890', '0xabcdef'],
        pi_b: [['0x12345', '0x67890'], ['0xabcdef', '0x123456']],
        pi_c: ['0xabcdef', '0x123456'],
    };

    const publicSignals = ['0x11223344'];

    console.log("Proof: ", proof);
    console.log("Public signals: ", publicSignals);

    // Sending back a hardcoded proof and public signals
    res.json({ proof, publicSignals });


});

const port = 3001;
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

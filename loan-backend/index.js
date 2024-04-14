const express = require('express');
const snarkjs = require('snarkjs');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json()); // middleware to parse JSON request bodies

app.post('/verify-transaction', async (req, res) => {
  const { loanAmount } = req.body;

  // Assume we have a predefined ZKP circuit and keys already set up
  // For simplicity, let's pretend we're verifying that loanAmount is non-negative
  const input = {
    loanAmount: loanAmount,
  };

  try {
    const { proof, publicSignals } = await snarkjs.groth16.fullProve(input, "Balancecheck.wasm", "BalanceCheck.zkey");

    console.log("Proof: ", proof);
    console.log("Public signals: ", publicSignals);

    res.json({ proof, publicSignals });
  } catch (error) {
    console.error("Error generating proof: ", error);
    res.status(500).send("Failed to generate proof.");
  }
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

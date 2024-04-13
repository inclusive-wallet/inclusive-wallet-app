import { groth16 } from 'snarkjs';

export async function generateProof(inputData) {
    const wasmBuffer = await fetch('/square.wasm').then(response => response.arrayBuffer());
    const zkeyBuffer = await fetch('/square_0001.zkey').then(response => response.arrayBuffer());
    const { proof, publicSignals } = await groth16.fullProve({ "a": inputData }, wasmBuffer, zkeyBuffer);

    return { proof, publicSignals };
}

export async function verifyProof(proof, publicSignals) {
    const vKey = await fetch('/verification_key.json').then(response => response.json());
    const res = await groth16.verify(vKey, publicSignals, proof);

    return res; // true if valid proof, false otherwise
}

template TestCircuit() {
    signal input a;
    signal output b;
    b <== a + 1;
}

component main = TestCircuit();

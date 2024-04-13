import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import SendAmount from './components/SendAmount';
import PayLoan from './components/PayLoan';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/send-amount" element={<SendAmount />} />
        <Route path="/pay-loan" element={<PayLoan />} />
      </Routes>
    </Router>
  );
}

export default App;

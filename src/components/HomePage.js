import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.webp'; // Update the path accordingly

function HomePage() {
  return (
    <div style={styles.homeContainer}>
      <img src={logo} alt="CryptoLending Logo" style={styles.logo} />
      <h1 style={styles.header}>Welcome</h1>
      <p style={styles.introText}>
        Your trusted partner in decentralized finance. Unlock the potential of your financial freedom with
        our secure and innovative wallet solutions.
      </p>
      <div style={styles.buttonContainer}>
        <Link to="/market-place" style={{ ...styles.button, ...styles.viewButton }}> Market place</Link>
      </div>

    </div>
  );
}

const styles = {
  homeContainer: {
    textAlign: 'center',
    padding: '50px',
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    color: '#333',
    backgroundColor: '#f4f4f9',
    minHeight: '100vh',
  },
  logo: {
    width: '150px', // Adjust size as necessary
    marginTop: '20px',
  },
  header: {
    color: '#2A265F',
    marginBottom: '20px',
  },
  introText: {
    fontSize: '18px',
    color: '#555',
    maxWidth: '600px',
    margin: 'auto',
    lineHeight: '1.6',
  },
  featuredImage: {
    maxWidth: '100%',
    height: 'auto',
    padding: '20px 0',
  },
  buttonContainer: {
    marginTop: '30px',
  },
  button: {
    padding: '12px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none',
    fontWeight: 'bold',
    margin: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    display: 'inline-block',
  },
  // ... other styles remain the same
};

export default HomePage;

import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import axios from 'axios';

// Popup Component
const Popup = ({ visible, content, closePopup }) => {
  return visible ? (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl text-center w-80">
        <p className="text-lg mb-4">{content}</p>
        <button
          onClick={closePopup}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  ) : null;
};

function App() {
  const [account, setAccount] = useState('');
  const [did, setDid] = useState('');
  const [kycStatus, setKycStatus] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [monitoringStatus, setMonitoringStatus] = useState('');
  const [popupData, setPopupData] = useState({ visible: false, content: '' });

  // Initialize Web3 and connect to MetaMask
  useEffect(() => {
    async function loadBlockchainData() {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      } else {
        alert('Please install MetaMask!');
      }
    }
    loadBlockchainData();
  }, []);

  // Pop-up handler
  const showPopup = (content) => {
    setPopupData({ visible: true, content });
  };

  const closePopup = () => {
    setPopupData({ visible: false, content: '' });
  };

  // DID Generation
  const generateDID = () => {
    const didDocument = {
      '@context': 'https://www.w3.org/ns/did/v1',
      id: `did:example:${account}`,
      verificationMethod: [
        {
          id: `did:example:${account}#key-1`,
          type: 'EcdsaSecp256k1VerificationKey2019',
          controller: `did:example:${account}`,
          publicKeyHex: account,
        },
      ],
    };
    setDid(JSON.stringify(didDocument, null, 2));
    showPopup('DID generated successfully for your account.');
  };

  // KYC Process Simulation
  const performKYC = async () => {
    const userData = { account };
    const response = await axios.post('https://api.example.com/kyc', userData);
    if (response.data.success) {
      setKycStatus(true);
      showPopup('KYC verification successful.');
    } else {
      setKycStatus(false);
      showPopup('KYC verification failed.');
    }
  };

  // Transaction Tracking (Simple Mockup)
  const trackTransactions = async () => {
    const response = await axios.get('https://api.example.com/transactions');
    setTransactions(response.data);
    showPopup('Transactions tracked successfully.');
  };

  // Real-Time Monitoring
  const monitorActivity = async () => {
    const monitoringResponse = await axios.get('https://api.example.com/monitor');
    setMonitoringStatus(monitoringResponse.data.status);
    showPopup('Real-time monitoring activated.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 text-white">
      <div className="container mx-auto p-6">
        <h1 className="text-5xl font-bold text-center mb-8">Crypto Compliance System</h1>
        
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-4">Account: <span className="text-blue-400">{account}</span></h2>
        </div>

        {/* DID Generation Section */}
        <div className="text-center mb-10">
          <h3 className="text-xl font-semibold mb-4">Decentralized Identity (DID)</h3>
          <button
            onClick={generateDID}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Generate DID
          </button>
          {did && (
            <div className="mt-4 bg-gray-700 p-4 rounded-lg">
              <h4 className="text-lg font-semibold mb-2">Your DID Document:</h4>
              <pre className="bg-gray-900 p-2 rounded-lg">{did}</pre>
            </div>
          )}
        </div>

        {/* KYC Section */}
        <div className="text-center mb-10">
          <h3 className="text-xl font-semibold mb-4">KYC Process</h3>
          <button
            onClick={performKYC}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Perform KYC
          </button>
          {kycStatus ? <p className="mt-4 text-green-400">KYC Status: Verified</p> : <p className="mt-4 text-red-400">KYC Status: Not Verified</p>}
        </div>

        {/* Transaction Tracking Section */}
        <div className="text-center mb-10">
          <h3 className="text-xl font-semibold mb-4">Transaction Tracking</h3>
          <button
            onClick={trackTransactions}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Track Transactions
          </button>
          {transactions.length > 0 && (
            <div className="mt-4 bg-gray-700 p-4 rounded-lg">
              <h4 className="text-lg font-semibold mb-2">Tracked Transactions:</h4>
              <ul className="list-disc list-inside">
                {transactions.map((tx, index) => (
                  <li key={index}>
                    {tx.id}: {tx.amount} ETH
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Real-Time Monitoring Section */}
        <div className="text-center mb-10">
          <h3 className="text-xl font-semibold mb-4">Real-Time Monitoring</h3>
          <button
            onClick={monitorActivity}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Monitor Activity
          </button>
          {monitoringStatus && <p className="mt-4 text-blue-400">Monitoring Status: {monitoringStatus}</p>}
        </div>

        {/* Popup for actions */}
        <Popup visible={popupData.visible} content={popupData.content} closePopup={closePopup} />
      </div>
    </div>
  );
}

export default App;

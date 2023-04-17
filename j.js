import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

function Transfer() {
  const [web3, setWeb3] = useState(null);
  const [recipientAddress, setRecipientAddress] = useState('0xe845f8786533E0d380E6b5e3f3BA56fcC599D9Bd');


  useEffect(() => {
    async function loadWeb3() {
      // Check if Web3 has been injected by the browser (Metamask)
      if (window.ethereum) {
        // Create a new Web3 instance using the injected provider
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        try {
          // Request account access if needed
          await window.ethereum.enable();

          // Get the current account from Metamask
          const accounts = await web3Instance.eth.getAccounts();
          setCurrentAccount(accounts[0]);
        } catch (error) {
          console.error('Failed to connect to Metamask:', error);
        }
      } else {
        console.error('Metamask not detected');
      }
    }

    loadWeb3();
  }, []);

  async function handleTransfer() {
    // Convert the amount to transfer from Ether to Wei
    const amountToSend = web3.utils.toWei(receiver.symval, 'ether');

    // Create the transaction object
    const txObject = {
      from: currentAccount,
      to: recipientAddress,
      value: amountToSend
    };

    try {
      // Sign and send the transaction
      const txHash = await web3.eth.sendTransaction(txObject);
      console.log('Transaction hash:', txHash);
    } catch (error) {
      console.error('Transaction error:', error);
    }
  }

  return (
    <div>
      <h1>Transfer Ether</h1>
      {currentAccount ? (
        <>
          <p>Current account: {currentAccount}</p>
          <label>
            Recipient address:
            <input type="text" value={recipientAddress} onChange={(e) => setRecipientAddress(e.target.value)} />
          </label>
          <br />
          <label>
            Amount (ETH):
            <input type="number" step="0.01" value={receiver.symval} onChange={(e) => setAmount(e.target.value)} />
          </label>
          <br />
          <button onClick={handleTransfer}>Transfer</button>
        </>
      ) : (
        <p>Connect your Metamask wallet to transfer Ether</p>
      )}
    </div>
  );
}

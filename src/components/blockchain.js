import React, { useEffect, useState } from 'react';

function Blockchain() {
  const [blockchain, setBlockchain] = useState([]);
  const [loading, setLoading] = useState(true);
  const [transaction, setTransaction] = useState({ sender: '', receiver: '', amount: 0 });

  useEffect(() => {
    fetch("http://localhost:8080/api/blockchain")
      .then((response) => response.json())
      .then((data) => {
        setBlockchain(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blockchain:", error);
        setLoading(false);
      });
  }, []);

  const renderTransactions = (transactions) => {
    if (!transactions || transactions.length === 0) {
      return <span>No transactions</span>; // Change to span instead of p
    }
    return (
      <ul>
        {transactions.map((tx, index) => (
          <li key={index}>{tx}</li> // Use list items instead of paragraphs
        ))}
      </ul>
    );
  };

  const renderBlockchain = () => {
    return blockchain.map((block, index) => (
      <div key={index}>
        <h3>Block {block.index}</h3>
        <p><strong>Timestamp:</strong> {block.timestamp}</p>
        <p><strong>Transactions:</strong> {renderTransactions(block.transactions)}</p>
        <p><strong>Proof:</strong> {block.proof}</p>
        <p><strong>Previous Hash:</strong> {block.previous_hash}</p>
        <hr />
      </div>
    ));
  };

  const handleTransactionChange = (e) => {
    const { name, value } = e.target;
    setTransaction((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitTransaction = (e) => {
    e.preventDefault();
    // Ensure 'amount' is a number (integer) before sending
    const transactionToSend = {
      ...transaction,
      amount: parseInt(transaction.amount, 10), // Convert amount to an integer
    };
  
    console.log('Transaction data:', transactionToSend);
  
    fetch('http://localhost:8080/api/transaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transactionToSend),
    })
      .then((response) => response.text())
      .then((data) => {
        alert(data); // Notify the user that the transaction has been added
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  

  return (
    <div>
      <h1>Blockchain Data</h1>
      {loading ? <p>Loading...</p> : renderBlockchain()}

      <h2>Add a Transaction</h2>
      <form onSubmit={handleSubmitTransaction}>
        <label>
          Sender:
          <input type="text" name="sender" value={transaction.sender} onChange={handleTransactionChange} required />
        </label>
        <br />
        <label>
          Receiver:
          <input type="text" name="receiver" value={transaction.receiver} onChange={handleTransactionChange} required />
        </label>
        <br />
        <label>
          Amount:
          <input type="number" name="amount" value={transaction.amount} onChange={handleTransactionChange} required />
        </label>
        <br />
        <button type="submit">Submit Transaction</button>
      </form>
    </div>
  );
}

export default Blockchain;

import React, { useState, useEffect } from "react";

export default function Wallet() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const wallet = JSON.parse(localStorage.getItem("wallet"));
    if (wallet) setBalance(wallet.balance);
  }, []);

  const fundWallet = () => {
    const newBalance = balance + 10000;
    localStorage.setItem("wallet", JSON.stringify({ balance: newBalance }));
    setBalance(newBalance);
  };

  return (
    <div>
      <h2>My Wallet</h2>
      <p>Balance: ₦{balance}</p>
      <button onClick={fundWallet}>Add ₦10,000</button>
    </div>
  );
}

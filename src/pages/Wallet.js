import { useState } from "react";
import NoRecentTransaction from "../assets/norecenttransaction.png";

export default function Wallet() {
  const [showBalance, setShowBalance] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [copied, setCopied] = useState(null);
  const [amount, setAmount] = useState(""); // For input amount
  const [submitting, setSubmitting] = useState(false); // For submission loading
  const [activePage, setActivePage] = useState("dashboard");
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [transactions, setTransactions] = useState([]);




const [cardForm, setCardForm] = useState({
  cardNumber: "",
  expiry: "",
  cvc: "",
  fullName: "",
  country: "Nigeria",
  city: "",
  address: "",
  state: "",
  postal: "",
});
const [cardErrors, setCardErrors] = useState({});





  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 1500);
  };

    const handleCardChange = (e) => {
  const { name, value } = e.target;
  setCardForm((prev) => ({ ...prev, [name]: value }));
};

const handleAddCard = () => {
  const errors = {};

  if (!cardForm.cardNumber) errors.cardNumber = "Card number is required";
  if (!cardForm.expiry) errors.expiry = "Expiry date is required";
  if (!cardForm.cvc) errors.cvc = "CVC is required";
  if (!cardForm.fullName) errors.fullName = "Full name is required";
  if (!cardForm.city) errors.city = "City is required";
  if (!cardForm.address) errors.address = "Address is required";
  if (!cardForm.state) errors.state = "State is required";
  if (!cardForm.postal) errors.postal = "Postal Code is required";

  setCardErrors(errors);
  if (Object.keys(errors).length > 0) return;

  alert("Card added successfully ✅");
  setShowAddCardModal(false);
};

  const handlePayment = () => {
    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    setSubmitting(true);

  
    // Simulate request submission
    setTimeout(() => {
      setSubmitting(false);
      alert(`Payment request for ₦${numAmount.toFixed(2)} submitted`);
      setShowBankModal(false);
      setAmount(""); // Reset input
    }, 2000);
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; font-family: Arial, sans-serif; }

        .wallet-wrapper { display: flex; min-height: 100vh; background: #f5f6f8; }

        /* SIDEBAR */
        .sidebar { width: 230px; background: #fff; padding: 20px; border-right: 1px solid #e5e7eb; }
        .logo { font-weight: bold; font-size: 18px; margin-bottom: 30px; }
        .menu-item { padding: 12px 14px; border-radius: 8px; margin-bottom: 8px; cursor: pointer; color: #374151; }
        .menu-item.active { background: #111827; color: #fff; }

        /* MAIN */
        .main { flex: 1; padding: 30px; }
        .greeting h2 { margin: 0; font-size: 22px; }

        /* WALLET CARD */
        .wallet-card {
          margin-top: 30px;
          background: linear-gradient(135deg, orange, #1e293b);
          color: #fff;
          border-radius: 20px;
          padding: 64px;
          position: relative;
        }

        .add-funds {
          position: absolute;
          right: 20px;
          top: 20px;
          background: #e5f9f0;
          color: #047857;
          border: none;
          border-radius: 20px;
          padding: 8px 14px;
          cursor: pointer;
        }

        .balance-label { margin-top: 20px; font-size: 20px; font-weight: bold; }
        .balance-row { display: flex; align-items: center; gap: 10px; }
        .balance { font-size: 40px; font-weight: bold; }
        .eye { cursor: pointer; font-size: 14px; opacity: 0.7; }

        /* EMPTY */
        .empty-transactions {
          margin-top: 40px;
          background: #fff;
          border-radius: 20px;
          padding: 40px 20px;
          text-align: center;
        }
        .empty-title { font-size: 18px; font-weight: 600; }
        .empty-text { font-size: 14px; color: #6b7280; }

        /* MODALS */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal, .bank-modal { background: #fff; border-radius: 18px; padding: 24px; }
        .modal { width: 380px; }
        .bank-modal { width: 420px; }

        .modal-header {
          display: flex;
          justify-content: space-between;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .close { cursor: pointer; color: #6b7280; }

        .modal-icon {
          width: 80px;
          height: 80px;
          background: #e0e7ff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          font-size: 32px;
        }

        .modal-title { text-align: center; margin-bottom: 24px; }

        .option {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 14px;
          cursor: pointer;
        }

        .option-left { display: flex; align-items: center; gap: 12px; }
        .option-icon {
          width: 40px;
          height: 40px;
          background: #eef2ff;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .badge { background: #d1fae5; color: #047857; padding: 4px 8px; border-radius: 12px; font-size: 11px; }

        /* BANK TRANSFER */
        .bank-input {
          background: #eef2ff;
          border-radius: 12px;
          padding: 14px;
          display: flex;
          gap: 10px;
          font-size: 18px;
          margin-bottom: 20px;
        }
        .bank-input input { border: none; background: transparent; outline: none; width: 100%; font-size: 18px; }

        .confirm-btn {
          width: 100%;
          background: linear-gradient(135deg, #065f46, #047857);
          color: #fff;
          border: none;
          border-radius: 999px;
          padding: 14px;
          cursor: pointer;
          margin-bottom: 24px;
        }
        .confirm-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .account-box { background: #f8fafc; border-radius: 14px; padding: 16px; font-size: 14px; }
        .bank-section { margin-bottom: 20px; }
        .bank-name { font-weight: 600; margin-bottom: 10px; }
        .detail { display: flex; justify-content: space-between; margin-bottom: 6px; }
        .copy-icon { margin-left: 8px; cursor: pointer; font-size: 14px; }
        .copied { color: #16a34a; font-size: 12px; margin-left: 6px; }

        .payment-methods-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
}

.payment-card {
  text-align: center;
}

.wallet-icon {
  width: 70px;
  height: 70px;
  background: #e5f9f0;
  color: #047857;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  margin: 0 auto 20px;
}

.payment-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 6px;
}

.payment-subtitle {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 20px;
}

.add-payment-btn {
  background: #374151;
  color: #fff;
  border: none;
  padding: 12px 18px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 14px;
}

.add-payment-modal {
  width: 420px;
  background: #fff;
  border-radius: 22px;
  padding: 20px;
}

.add-payment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 20px;
}

.payment-option {
  background: #f9fafb;
  border-radius: 16px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.payment-option-left {
  display: flex;
  align-items: center;
  gap: 14px;
}

.payment-icon {
  width: 42px;
  height: 42px;
  background: #eef2ff;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.arrow {
  font-size: 20px;
  color: #9ca3af;
}

.add-card-modal {
  width: 420px;
  max-height: 70vh;      /* 👈 ADD THIS LINE */
  overflow-y: auto;     /* 👈 ADD THIS LINE */
  background: #fff;
  border-radius: 22px;
  padding: 20px;
}


.add-card-header {
  display: grid;
  grid-template-columns: 30px 1fr 30px;
  align-items: center;
  font-weight: 600;
  margin-bottom: 20px;
}

.add-card-header .back,
.add-card-header .close {
  cursor: pointer;
  color: #6b7280;
  font-size: 18px;
}

.input-group {
  margin-bottom: 14px;
}

.input-group label {
  font-size: 12px;
  color: #6b7280;
  display: block;
  margin-bottom: 6px;
}

.input-group input,
.input-group select {
  width: 100%;
  padding: 14px;
  border-radius: 14px;
  border: 1px solid #e5e7eb;
  outline: none;
  font-size: 14px;
  background: #f9fafb;
}

.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.add-card-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.cancel-btn {
  background: transparent;
  border: none;
  font-size: 14px;
  color: #6b7280;
  cursor: pointer;
}

.add-card-btn {
  background: #374151;
  color: #fff;
  border: none;
  padding: 12px 20px;
  border-radius: 14px;
  cursor: pointer;
}

.add-card-modal input {
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  margin-bottom: 10px;
}

.error {
  color: #dc2626;
  font-size: 12px;
  display: block;
  margin-bottom: 6px;
}



      `}</style>

      <div className="wallet-wrapper">
        <div className="sidebar">
  <div className="logo">Hook Food</div>

  <div
    className={`menu-item ${activePage === "dashboard" ? "active" : ""}`}
    onClick={() => setActivePage("dashboard")}
  >
    Dashboard
  </div>

  <div
  className={`menu-item ${activePage === "settings" ? "active" : ""}`}
  onClick={() => setActivePage("settings")}
>
  Add Card Payment
</div>


  <div
    className={`menu-item ${activePage === "transactions" ? "active" : ""}`}
    onClick={() => setActivePage("transactions")}
  >
    Transactions
  </div>
</div>


        <div className="main">
  <div className="greeting">
    <h2>Good Evening, Jeffrey 👋</h2>
  </div>

  {/* DASHBOARD */}
  {activePage === "dashboard" && (
    <>
      <div className="wallet-card">
        <button className="add-funds" onClick={() => setShowModal(true)}>
          + Add Funds
        </button>

        <div className="balance-label">Available Balance</div>

        <div className="balance-row">
          <div className="balance">
            {showBalance ? "₦0.00 NGN" : "••••••"}
          </div>
          <div className="eye" onClick={() => setShowBalance(!showBalance)}>
            {showBalance ? "Hide" : "Show"}
          </div>
        </div>
      </div>

      <div className="empty-transactions">
        <img src={NoRecentTransaction} width="120" alt="" />
        <div className="empty-title">No Recent Transactions</div>
        <div className="empty-text">
          We couldn't find any transactions to this account
        </div>
      </div>
    </>
  )}

  {/* TRANSACTIONS */}
{/* TRANSACTIONS */}
{activePage === "transactions" && (
  <div
    style={{
      background: "#fff",
      borderRadius: "16px",
      padding: "20px",
    }}
  >
    {/* Header */}
    <div
      style={{
        borderBottom: "1px solid #e5e7eb",
        marginBottom: "20px",
        paddingBottom: "10px",
        fontWeight: 600,
      }}
    >
      All Transactions
    </div>

    {/* Table */}
    <table width="100%" style={{ borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ textAlign: "left", color: "#6b7280", fontSize: "13px" }}>
          <th>Date</th>
          <th>Amount</th>
          <th>Type</th>
          <th>Reference</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {transactions.length === 0 ? (
          <tr>
            <td colSpan="5" style={{ padding: "40px 0", textAlign: "center" }}>
              <img
                src={NoRecentTransaction}
                alt="No transactions"
                width="120"
              />
              <div style={{ marginTop: "10px", fontWeight: 600 }}>
                No Transactions
              </div>
              <div style={{ fontSize: "14px", color: "#6b7280" }}>
                You have not made any transactions yet
              </div>
            </td>
          </tr>
        ) : (
          transactions.map((tx) => (
            <tr key={tx.id} style={{ borderTop: "1px solid #e5e7eb" }}>
              <td>{tx.date}</td>
              <td>{tx.amount}</td>
              <td>{tx.type}</td>
              <td>{tx.reference}</td>
              <td
                style={{
                  color: tx.status === "Failed" ? "#dc2626" : "#16a34a",
                  fontWeight: 500,
                }}
              >
                {tx.status}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
)}



  {/* SETTINGS */}
  {activePage === "settings" && (
  <div className="payment-methods-page">
    <div className="payment-card">
      <div className="wallet-icon">💳</div>

      <h3 className="payment-title">Payment methods</h3>

      <p className="payment-subtitle">
        Add your favorite cards or bank account.
      </p>

      <button
  className="add-payment-btn"
  onClick={() => setShowAddPaymentModal(true)}
>
  Add payment method
</button>

    </div>
  </div>
)}

</div>

      </div>

      {/* ADD FUNDS MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <span>Top up</span>
              <span className="close" onClick={() => setShowModal(false)}>✕</span>
            </div>

            <div className="modal-icon">⇅</div>
            <div className="modal-title">Add funds to account</div>

            <div
              className="option"
              onClick={() => {
                setShowModal(false);
                setShowBankModal(true);
              }}
            >
              <div className="option-left">
                <div className="option-icon">🏦</div>
                <div>
                  <div>Bank Deposit</div>
                  <small>No transfer fee</small>
                </div>
              </div>
              <div className="badge">No fee</div>
            </div>
          </div>
        </div>
      )}

      {/* BANK TRANSFER MODAL */}
      {showBankModal && (
        <div className="modal-overlay">
          <div className="bank-modal">
            <div className="modal-header">
              <span>Bank Transfer</span>
              <span className="close" onClick={() => setShowBankModal(false)}>✕</span>
            </div>

            <div className="bank-input">
              ₦ 
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              /> 
              🇳🇬
            </div>

            <button
              className="confirm-btn"
              onClick={handlePayment}
              disabled={submitting}
            >
              {submitting ? "Submitting request..." : "I have made payment"}
            </button>

            <div className="account-box">
              <div className="bank-section">
                <div className="bank-name">9PSB Bank</div>
                <div className="detail">
                  <span>Account Name</span>
                  <span>Hook Food Ltd</span>
                </div>
                <div className="detail">
                  <span>Account Number</span>
                  <span>
                    5300166276
                    {copied === "5300166276" ? (
                      <span className="copied">Copied ✓</span>
                    ) : (
                      <span className="copy-icon" onClick={() => copyToClipboard("5300166276")}>📋</span>
                    )}
                  </span>
                </div>
              </div>

              <div className="bank-section">
                <div className="bank-name">PalmPay Bank</div>
                <div className="detail">
                  <span>Account Name</span>
                  <span>Hook Food Ltd</span>
                </div>
                <div className="detail">
                  <span>Account Number</span>
                  <span>
                    8880644991
                    {copied === "8880644991" ? (
                      <span className="copied">Copied ✓</span>
                    ) : (
                      <span className="copy-icon" onClick={() => copyToClipboard("8880644991")}>📋</span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
  

        </div>
      )}

              {showAddPaymentModal && (
  <div className="modal-overlay">
    <div className="add-payment-modal">
      <div className="add-payment-header">
        <span>Add payment method</span>
        <span
          className="close"
          onClick={() => setShowAddPaymentModal(false)}
        >
          ✕
        </span>
      </div>

<div
  className="payment-option"
  onClick={() => {
    setShowAddPaymentModal(false);
    setShowAddCardModal(true);
  }}
>

        <div className="payment-option-left">
          <div className="payment-icon">💳</div>
          <span>Card</span>
        </div>
        <span className="arrow">›</span>
      </div>
    </div>
  </div>
)}


{showAddCardModal && (
  <div className="modal-overlay">
    <div className="add-card-modal">
      <div className="add-payment-header">
        <span>Add card</span>
        <span
          className="close"
          onClick={() => setShowAddCardModal(false)}
        >
          ✕
        </span>
      </div>

      {/* Card Number */}
      <input
        name="cardNumber"
        placeholder="Card number"
        value={cardForm.cardNumber}
        onChange={handleCardChange}
      />
      {cardErrors.cardNumber && (
        <small className="error">{cardErrors.cardNumber}</small>
      )}

      {/* Expiry & CVC */}
      <div style={{ display: "flex", gap: "10px" }}>
        <div style={{ flex: 1 }}>
          <input
            name="expiry"
            placeholder="MM/YY"
            value={cardForm.expiry}
            onChange={handleCardChange}
          />
          {cardErrors.expiry && (
            <small className="error">{cardErrors.expiry}</small>
          )}
        </div>

        <div style={{ flex: 1 }}>
          <input
            name="cvc"
            placeholder="CVC"
            value={cardForm.cvc}
            onChange={handleCardChange}
          />
          {cardErrors.cvc && (
            <small className="error">{cardErrors.cvc}</small>
          )}
        </div>
      </div>

      {/* Full Name */}
      <input
        name="fullName"
        placeholder="Full name"
        value={cardForm.fullName}
        onChange={handleCardChange}
      />
      {cardErrors.fullName && (
        <small className="error">{cardErrors.fullName}</small>
      )}

      {/* Country */}
      <input value={cardForm.country} disabled />

      {/* City */}
      <input
        name="city"
        placeholder="City"
        value={cardForm.city}
        onChange={handleCardChange}
      />
      {cardErrors.city && (
        <small className="error">{cardErrors.city}</small>
      )}

      {/* Address */}
      <input
        name="address"
        placeholder="Address"
        value={cardForm.address}
        onChange={handleCardChange}
      />
      {cardErrors.address && (
        <small className="error">{cardErrors.address}</small>
      )}

      {/* State */}
      <input
        name="state"
        placeholder="State"
        value={cardForm.state}
        onChange={handleCardChange}
      />
      {cardErrors.state && (
        <small className="error">{cardErrors.state}</small>
      )}

      {/* Postal Code */}
      <input
        name="postal"
        placeholder="Postal Code"
        value={cardForm.postal}
        onChange={handleCardChange}
      />
      {cardErrors.postal && (
        <small className="error">{cardErrors.postal}</small>
      )}

      {/* Footer */}
      <div className="add-card-footer">
        <button
          className="cancel-btn"
          onClick={() => setShowAddCardModal(false)}
        >
          Cancel
        </button>

        <button
          className="add-card-btn"
          onClick={handleAddCard}
        >
          Add card
        </button>
      </div>
    </div>
  </div>
)}




    </>
  );
}

import React, { useState } from "react";
import "../App.css";

function Dashboard() {
  // Initial transactions
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      name: "Grocery Shopping",
      category: "Food",
      date: "2026-11-07",
      amount: -1500,
    },
    {
      id: 2,
      name: "Monthly Salary",
      category: "Income",
      date: "2026-11-06",
      amount: 25000,
    },
    {
      id: 3,
      name: "Restaurant",
      category: "Food",
      date: "2026-11-05",
      amount: -850,
    },
    {
      id: 4,
      name: "Transportation",
      category: "Travel",
      date: "2026-11-04",
      amount: -500,
    },
  ]);

  // Summary states
  // Calculate Total Income
const income = transactions
  .filter((item) => item.amount > 0)
  .reduce((total, item) => total + item.amount, 0);

// Calculate Total Expenses
const expenses = transactions
  .filter((item) => item.amount < 0)
  .reduce((total, item) => total + Math.abs(item.amount), 0);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "Food",
    date: new Date().toISOString().split("T")[0],
  });

  // Search state
  const [search, setSearch] = useState("");

  // Format currency
  const formatCurrency = (amount) => {
    return "₹" + amount.toLocaleString("en-IN");
  };

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add new transaction
  const handleSubmit = (e) => {
    e.preventDefault();

    const amount = Number(formData.amount);

    if (!formData.title.trim() || amount <= 0 || !formData.date) {
      return;
    }

    const finalAmount =
      formData.type === "income" ? amount : -amount;

    const newTransaction = {
      id: Date.now(),
      name: formData.title,
      category: formData.category,
      date: formData.date,
      amount: finalAmount,
    };

    // setTransactions((prev) => [newTransaction, ...prev]);

    // if (formData.type === "income") {
    //   setIncome((prev) => prev + amount);
    // } else {
    //   setExpenses((prev) => prev + amount);
    // }

    setFormData({
      title: "",
      amount: "",
      type: "expense",
      category: "Food",
      date: new Date().toISOString().split("T")[0],
    });

    setIsModalOpen(false);
  };

  // Filter transactions
  const filteredTransactions = transactions.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Monthly chart data
  const chartData = [
    { month: "Jan", amount: 11000 },
    { month: "Feb", amount: 18000 },
    { month: "Mar", amount: 13000 },
    { month: "Apr", amount: 24000 },
    { month: "May", amount: 18000 },
    { month: "Jun", amount: 28000 },
  ];

  return (
    <div className="dashboard-container">

      {/* Sidebar */}
      <aside className="sidebar">

        <h2 className="logo">
          X<span>panse.</span>
        </h2>

        <p className="menu-heading">MENU</p>

        <nav className="sidebar-menu">

          <a href="#dashboard" className="menu-item active">
            <span>▦</span> Dashboard
          </a>

          <a href="#transactions" className="menu-item">
            <span>⇄</span> Transactions
          </a>

          <a href="#budgets" className="menu-item">
            <span>◈</span> Budgets
          </a>

          <a href="#analytics" className="menu-item">
            <span>▥</span> Analytics
          </a>

          <a href="#settings" className="menu-item">
            <span>⚙</span> Settings
          </a>

        </nav>

        <div className="sidebar-bottom">
          <div className="profile-avatar">N</div>
          <div>
            <h4>Nikita</h4>
            <p>Personal Account</p>
          </div>
        </div>

      </aside>

      {/* Main Content */}
      <main className="main-content" id="dashboard">

        {/* Header */}
        <header className="dashboard-header">

          <div>
            <h1>Dashboard</h1>
            <p>Welcome back! Here's your financial overview.</p>
          </div>

          <div className="header-actions">

            <input
              type="search"
              className="search-input"
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button className="icon-button" title="Notifications">
              ♧
            </button>

            <button
              className="add-button"
              onClick={() => setIsModalOpen(true)}
            >
              + Add Transaction
            </button>

          </div>

        </header>

        {/* Summary Cards */}
        <section className="summary-cards">

          <div className="summary-card balance-card">
            <div className="card-top">
              <p>Total Balance</p>
              <span>◈</span>
            </div>

            <h2>{formatCurrency(income - expenses)}</h2>
            <p className="card-description">Your available balance</p>
          </div>

          <div className="summary-card">
            <div className="card-top">
              <p>Total Income</p>
              <span className="income-icon">↗</span>
            </div>

            <h2>{formatCurrency(income)}</h2>
            <p className="card-description">Income received</p>
          </div>

          <div className="summary-card">
            <div className="card-top">
              <p>Total Expenses</p>
              <span className="expense-icon">↘</span>
            </div>

            <h2>{formatCurrency(expenses)}</h2>
            <p className="card-description">Expenses recorded</p>
          </div>

        </section>

        {/* Expense Chart */}
        <section className="chart-section" id="analytics">

          <div className="section-heading">
            <div>
              <h2>Expense Overview</h2>
              <p>Your monthly spending activity</p>
            </div>

            <select className="period-select">
              <option>Last 6 months</option>
              <option>Last 3 months</option>
            </select>
          </div>

          <div className="chart">

            <div className="chart-y-axis">
              <span>₹30000</span>
              <span>₹20000</span>
              <span>₹10000</span>
              <span>₹0</span>
            </div>

            <div className="chart-bars">
              {chartData.map((item) => (
                <div className="bar-item" key={item.month}>

                  <div className="bar-wrapper">
                    <div
                      className="bar"
                      style={{
                        height: `${(item.amount / 30000) * 100}%`,
                      }}
                      title={formatCurrency(item.amount)}
                    ></div>
                  </div>

                  <span>{item.month}</span>

                </div>
              ))}
            </div>

          </div>

        </section>

        {/* Recent Transactions */}
        <section className="transactions-section" id="transactions">

          <div className="section-heading">
            <div>
              <h2>Recent Transactions</h2>
              <p>Keep track of your latest activity</p>
            </div>

            <button
              className="view-all"
              onClick={() => setSearch("")}
            >
              Clear Search
            </button>
          </div>

          <div className="transaction-list">

            {filteredTransactions.length > 0 ? (

              filteredTransactions.map((item) => (

                <div className="transaction-item" key={item.id}>

                  <div className="transaction-icon">
                    {item.category === "Food" ? "🍔" :
                     item.category === "Travel" ? "🚕" :
                     item.category === "Shopping" ? "🛍️" :
                     item.category === "Income" ? "💰" : "💳"}
                  </div>

                  <div className="transaction-info">
                    <h4>{item.name}</h4>
                    <p>
                      {item.category} • {item.date}
                    </p>
                  </div>

                  <h4
                    className={
                      item.amount > 0
                        ? "amount-positive"
                        : "amount-negative"
                    }
                  >
                    {item.amount > 0 ? "+" : "-"}
                    {formatCurrency(Math.abs(item.amount))}
                  </h4>

                </div>

              ))

            ) : (

              <p className="empty-message">
                No transactions found.
              </p>

            )}

          </div>

        </section>

      </main>

      {/* Add Transaction Modal */}
      {isModalOpen && (

        <div
          className="modal-overlay"
          onClick={() => setIsModalOpen(false)}
        >

          <div
            className="transaction-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="modal-header">

              <div>
                <h2>Add Transaction</h2>
                <p>Record your income or expense.</p>
              </div>

              <button
                className="close-button"
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              <label>Transaction Title</label>

              <input
                type="text"
                name="title"
                placeholder="e.g. Grocery Shopping"
                value={formData.title}
                onChange={handleChange}
                required
              />

              <label>Amount (₹)</label>

              <input
                type="number"
                name="amount"
                placeholder="Enter amount"
                min="0.01"
                step="0.01"
                value={formData.amount}
                onChange={handleChange}
                required
              />

              <label>Transaction Type</label>

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>

              <label>Category</label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Food">Food</option>
                <option value="Shopping">Shopping</option>
                <option value="Travel">Travel</option>
                <option value="Bills">Bills</option>
                <option value="Education">Education</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Income">Income</option>
                <option value="Other">Other</option>
              </select>

              <label>Date</label>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />

              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="save-button">
                  Save Transaction
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Dashboard;
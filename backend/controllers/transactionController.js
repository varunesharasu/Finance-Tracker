const Transaction = require('../models/Transaction');

// Create transaction
const createTransaction = async (req, res) => {
  try {
    const { type, category, amount, description, date } = req.body;

    if (!type || !category || !amount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const transaction = new Transaction({
      userId: req.userId,
      type,
      category,
      amount,
      description,
      date: date || new Date(),
    });

    await transaction.save();
    res.status(201).json({
      message: 'Transaction created successfully',
      transaction,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all transactions for user
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.userId }).sort({
      date: -1,
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get transaction by ID
const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update transaction
const updateTransaction = async (req, res) => {
  try {
    const { type, category, amount, description, date } = req.body;

    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { type, category, amount, description, date, updatedAt: new Date() },
      { new: true }
    );

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json({
      message: 'Transaction updated successfully',
      transaction,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete transaction
const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get transaction summary
const getTransactionSummary = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.userId });

    const summary = {
      totalIncome: 0,
      totalExpense: 0,
      balance: 0,
      byCategory: {},
    };

    transactions.forEach((transaction) => {
      if (transaction.type === 'income') {
        summary.totalIncome += transaction.amount;
      } else {
        summary.totalExpense += transaction.amount;
      }

      if (!summary.byCategory[transaction.category]) {
        summary.byCategory[transaction.category] = 0;
      }
      summary.byCategory[transaction.category] += transaction.amount;
    });

    summary.balance = summary.totalIncome - summary.totalExpense;

    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getTransactionSummary,
};

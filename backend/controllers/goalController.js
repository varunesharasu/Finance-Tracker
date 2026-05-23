const Goal = require('../models/Goal');

// Create goal
const createGoal = async (req, res) => {
  try {
    const { goalName, targetAmount, deadline, category } = req.body;

    if (!goalName || !targetAmount || !deadline) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const goal = new Goal({
      userId: req.userId,
      goalName,
      targetAmount,
      deadline,
      category,
    });

    await goal.save();
    res.status(201).json({
      message: 'Goal created successfully',
      goal,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all goals for user
const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.userId }).sort({
      deadline: 1,
    });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get goal by ID
const getGoalById = async (req, res) => {
  try {
    const goal = await Goal.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    res.json(goal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update goal
const updateGoal = async (req, res) => {
  try {
    const { goalName, targetAmount, currentAmount, deadline, category } = req.body;

    const goal = await Goal.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { goalName, targetAmount, currentAmount, deadline, category, updatedAt: new Date() },
      { new: true }
    );

    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    res.json({
      message: 'Goal updated successfully',
      goal,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete goal
const deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    res.json({ message: 'Goal deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createGoal,
  getGoals,
  getGoalById,
  updateGoal,
  deleteGoal,
};

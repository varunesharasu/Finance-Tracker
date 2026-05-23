# 💰 Savings & Accounts Guide

## 📊 How Savings Are Working

**Savings Overview** automatically calculates your savings from your transactions:

```
Total Savings = Total Income - Total Expenses
```

Then distributes it into 4 categories:
- **Emergency Fund**: 30% of savings
- **Vacation Fund**: 15% of savings  
- **House Down Payment**: 35% of savings
- **Retirement**: 20% of savings

**Example:**
- Total Income: $5,000
- Total Expenses: $3,000
- **Total Savings**: $2,000

Distribution:
- Emergency Fund: $2,000 × 30% = **$600**
- Vacation Fund: $2,000 × 15% = **$300**
- House Down Payment: $2,000 × 35% = **$700**
- Retirement: $2,000 × 20% = **$400**

---

## 🏦 How Account Summary Works

Your accounts are automatically calculated based on your balance:

```
Main Checking = 70% of (Income - Expenses)
Savings Account = 30% of (Income - Expenses)
Credit Card Debt = 20% of Total Expenses
```

**Example:**
- Net Balance (Income - Expenses): $2,000
- **Main Checking**: $2,000 × 70% = **$1,400**
- **Savings Account**: $2,000 × 30% = **$600**

Credit Card:
- Total Expenses: $3,000
- **Credit Card Balance**: $3,000 × 20% = **$600** (out of $1,500 limit)

---

## ✅ How to Add Money to Main Checking & Savings

### **Method 1: Add Income Transaction** (Recommended)
This is the proper way to add money:

1. Go to **Dashboard** → Click **"Add Transaction"** button
2. Select **Type**: `Income`
3. Enter **Amount**: e.g., $500
4. Select **Category**: Salary, Bonus, Gift, etc.
5. Add **Description**: "Salary deposit" or "Bonus"
6. Click **Save**

**Result:**
- Checking account increases by: $500 × 70% = **$350**
- Savings account increases by: $500 × 30% = **$150**
- All savings goals automatically increase proportionally

### **Method 2: Use Financial Goals** (For Specific Savings)
If you want to allocate money to specific goals:

1. Go to **Goals** tab
2. Click **"Add Goal"** (e.g., "Vacation Fund" or "House Down Payment")
3. Click **"Add Funds"** to allocate money to that goal
4. Money is deducted from available balance

**Note:** This is useful when you want to earmark specific amounts for specific purposes.

---

## 🔄 How Everything Works Together

```
1. Add Income Transaction
   ↓
2. Total Balance Increases
   ↓
3. All Accounts Auto-Update:
   - Main Checking (70%)
   - Savings Account (30%)
   ↓
4. All Savings Goals Auto-Update:
   - Emergency Fund (30%)
   - Vacation (15%)
   - House Down Payment (35%)
   - Retirement (20%)
```

---

## 📝 Example Workflow

**Starting State:**
- No transactions
- All balances: $0

**Step 1: Add $5,000 Income**
- Click "Add Transaction"
- Type: Income
- Amount: $5,000
- Category: Salary

**Result:**
- Total Balance: **$5,000**
- Main Checking: **$3,500** (70%)
- Savings Account: **$1,500** (30%)
- Emergency Fund: **$1,500** (30%)
- Vacation Fund: **$750** (15%)
- House Down Payment: **$1,750** (35%)
- Retirement: **$1,000** (20%)

**Step 2: Add $1,000 Expense**
- Click "Add Transaction"
- Type: Expense
- Amount: $1,000
- Category: Food

**Result:**
- Total Balance: **$4,000** (now $5,000 - $1,000)
- Main Checking: **$2,800** (70% of $4,000)
- Savings Account: **$1,200** (30% of $4,000)
- All savings goals reduce proportionally

---

## 🎯 Summary

| Action | How to Do It | What Happens |
|--------|-------------|--------------|
| Add money to checking | Add **Income** transaction | Checking increases 70%, Savings 30% |
| Add money to savings | Add **Income** transaction | All accounts & goals auto-calculate |
| Allocate to specific goal | Use **Goals** → "Add Funds" | Money reserved in that goal |
| Add expense | Add **Expense** transaction | Balances decrease, all accounts update |

---

## ⚠️ Important Notes

1. **Accounts are READ-ONLY** - They automatically calculate from transactions
2. **Cannot manually edit** Main Checking or Savings Account balances
3. **To change balances**, you must add/remove transactions
4. **Goals are SEPARATE** - They deduct from available balance
5. **Total Balance** = Income - Expenses - Money in Goals

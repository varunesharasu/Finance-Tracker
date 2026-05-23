'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CreditCard, Landmark, Wallet, AlertCircle } from "lucide-react"
import { useMemo } from "react"

export function AccountSummary({ transactions = [] }: any) {
  const accounts = useMemo(() => {
    // Calculate summary from transactions
    let totalIncome = 0
    let totalExpenses = 0
    let savingsAmount = 0

    transactions.forEach((transaction: any) => {
      if (transaction.type === 'income') {
        totalIncome += transaction.amount
      } else {
        totalExpenses += transaction.amount
      }
    })

    savingsAmount = totalIncome - totalExpenses

    // Generate accounts based on calculations
    return [
      {
        id: "1",
        name: "Main Checking",
        type: "checking",
        balance: Math.max(0, savingsAmount * 0.7), // 70% of savings as checking
        institution: "Your Bank",
        lastUpdated: "Today",
        icon: Landmark,
      },
      {
        id: "2",
        name: "Savings Account",
        type: "savings",
        balance: Math.max(0, savingsAmount * 0.3), // 30% of savings as savings
        institution: "Your Bank",
        lastUpdated: "Today",
        icon: Wallet,
      },
      {
        id: "3",
        name: "Credit Card",
        type: "credit",
        balance: totalExpenses * 0.2, // 20% of expenses as credit card debt
        limit: totalExpenses * 0.5, // Limit is 50% of total expenses
        institution: "Credit Card",
        lastUpdated: "Today",
        icon: CreditCard,
      },
    ]
  }, [transactions])

  if (!transactions || transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <AlertCircle className="h-12 w-12 text-muted-foreground mb-3" />
        <p className="text-lg font-medium">No Account Data Yet</p>
        <p className="text-sm text-muted-foreground">Add transactions to see account summaries</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {accounts.map((account) => (
        <Card key={account.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center space-x-2">
              <account.icon className="h-5 w-5 text-muted-foreground" />
              <CardTitle className="text-lg font-medium">{account.name}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {account.type === "credit" ? "-" : ""}${Math.abs(account.balance).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              {account.institution} • Updated {account.lastUpdated}
            </p>

            {account.type === "credit" && account.limit && account.limit > 0 && (
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Credit Used</span>
                  <span>{Math.round((account.balance / account.limit) * 100)}%</span>
                </div>
                <Progress 
                  value={Math.min((account.balance / account.limit) * 100, 100)} 
                  className="h-2" 
                />
                <p className="text-xs text-muted-foreground mt-1">
                  ${account.balance.toFixed(2)} of ${account.limit.toFixed(2)} limit
                </p>
              </div>
            )}

            {account.type !== "credit" && (
              <p className="text-xs text-muted-foreground mt-3">
                Available Balance
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}


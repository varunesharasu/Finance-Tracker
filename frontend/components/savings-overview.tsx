'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { AlertCircle, Briefcase, Home, Plane, Umbrella } from "lucide-react"
import { useMemo } from "react"

export function SavingsOverview({ transactions = [] }: any) {
  const savingsAccounts = useMemo(() => {
    // Calculate totals from transactions
    let totalIncome = 0
    let totalExpenses = 0

    transactions.forEach((t: any) => {
      if (t.type === 'income') {
        totalIncome += t.amount
      } else {
        totalExpenses += t.amount
      }
    })

    const totalSavings = totalIncome - totalExpenses
    const monthlyAverage = transactions.length > 0 
      ? Math.round(totalSavings / Math.ceil(transactions.length / 5))
      : 0

    return [
      {
        id: "1",
        name: "Emergency Fund",
        currentAmount: totalSavings * 0.3,
        targetAmount: totalSavings * 0.5,
        monthlyContribution: Math.max(50, monthlyAverage * 0.3),
        icon: Umbrella,
      },
      {
        id: "2",
        name: "Vacation Fund",
        currentAmount: totalSavings * 0.15,
        targetAmount: totalSavings * 0.25,
        monthlyContribution: Math.max(30, monthlyAverage * 0.15),
        targetDate: "Dec 2025",
        icon: Plane,
      },
      {
        id: "3",
        name: "House Down Payment",
        currentAmount: totalSavings * 0.35,
        targetAmount: totalSavings * 0.75,
        monthlyContribution: Math.max(100, monthlyAverage * 0.35),
        targetDate: "Jun 2026",
        icon: Home,
      },
      {
        id: "4",
        name: "Retirement",
        currentAmount: totalSavings * 0.2,
        monthlyContribution: Math.max(50, monthlyAverage * 0.2),
        icon: Briefcase,
      },
    ]
  }, [transactions])

  if (!transactions || transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <AlertCircle className="h-12 w-12 text-muted-foreground mb-3" />
        <p className="text-lg font-medium">No Savings Data</p>
        <p className="text-sm text-muted-foreground">Add transactions to calculate your savings</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
      {savingsAccounts.map((account) => (
        <Card key={account.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center space-x-2">
              <account.icon className="h-5 w-5 text-muted-foreground" />
              <CardTitle className="text-lg font-medium">{account.name}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${account.currentAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">${account.monthlyContribution.toFixed(2)}/month contribution</p>

            {account.targetAmount && (
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{Math.round((account.currentAmount / account.targetAmount) * 100)}%</span>
                </div>
                <Progress value={Math.min((account.currentAmount / account.targetAmount) * 100, 100)} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  ${account.currentAmount.toFixed(2)} of ${account.targetAmount.toFixed(2)} goal
                  {account.targetDate && ` • Target: ${account.targetDate}`}
                </p>
              </div>
            )}

            <div className="mt-4">
              <Button size="sm" className="w-full">
                Add Funds
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}


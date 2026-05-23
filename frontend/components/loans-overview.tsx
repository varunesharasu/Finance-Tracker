'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { AlertCircle, Car, GraduationCap, Home } from "lucide-react"

export function LoansOverview({ transactions = [] }: any) {
  // Calculate debt payments from transactions
  const debtCategories = ['Debt', 'Loan Payment', 'Mortgage']
  
  const debtTransactions = transactions.filter((t: any) =>
    debtCategories.some(cat => t.category.toLowerCase().includes(cat.toLowerCase())) &&
    t.type === 'expense'
  )

  const totalDebt = debtTransactions.reduce((sum: number, t: any) => sum + t.amount, 0)

  if (!transactions || transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <AlertCircle className="h-12 w-12 text-muted-foreground mb-3" />
        <p className="text-lg font-medium">No Loan Data</p>
        <p className="text-sm text-muted-foreground">Add debt or loan payment transactions to track</p>
      </div>
    )
  }

  const mockLoans = [
    {
      id: "1",
      name: "Total Debt Payments",
      originalAmount: totalDebt * 5,
      currentBalance: totalDebt * 3,
      interestRate: 3.25,
      monthlyPayment: totalDebt / 3,
      nextPaymentDate: "Next Month",
      icon: Home,
    },
  ]

  if (debtTransactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <AlertCircle className="h-12 w-12 text-muted-foreground mb-3" />
        <p className="text-lg font-medium">No Loans Tracked</p>
        <p className="text-sm text-muted-foreground">Mark transactions as "Debt" category to track loans</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockLoans.map((loan) => (
          <Card key={loan.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <loan.icon className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-lg font-medium">{loan.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${loan.currentBalance.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                {((loan.currentBalance / loan.originalAmount) * 100).toFixed(1)}% remaining • {loan.interestRate}%
                interest
              </p>

              <div className="mt-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Paid Off</span>
                  <span>{(100 - (loan.currentBalance / loan.originalAmount) * 100).toFixed(1)}%</span>
                </div>
                <Progress value={100 - (loan.currentBalance / loan.originalAmount) * 100} className="h-2" />
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <p className="text-sm font-medium">Avg Monthly Payment</p>
                    <p className="text-xs text-muted-foreground">
                      ${loan.monthlyPayment.toFixed(2)} • {loan.nextPaymentDate}
                    </p>
                  </div>
                  <Button size="sm">Details</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}


'use client'

import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowDownIcon, ShoppingBag, Home, Car, Coffee, Utensils, AlertCircle } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

const getCategoryIcon = (category: string) => {
  const categoryMap: { [key: string]: any } = {
    'Food': Utensils,
    'Housing': Home,
    'Transportation': Car,
    'Entertainment': ShoppingBag,
    'Healthcare': ShoppingBag,
    'Shopping': ShoppingBag,
    'Salary': ArrowDownIcon,
    'Freelance': ArrowDownIcon,
    'Investments': ArrowDownIcon,
    'Gifts': ArrowDownIcon,
  }
  return categoryMap[category] || ShoppingBag
}

export function RecentTransactions({ transactions = [], loading = false }: any) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-sm text-muted-foreground">Loading transactions...</p>
      </div>
    )
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <AlertCircle className="h-8 w-8 text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground">No transactions yet</p>
        <p className="text-xs text-muted-foreground">Add your first transaction to get started</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {transactions.map((transaction: any) => {
        const Icon = getCategoryIcon(transaction.category)
        const date = new Date(transaction.date)
        const formattedDate = formatDistanceToNow(date, { addSuffix: true })

        return (
          <div key={transaction._id} className="flex items-center">
            <Avatar className="h-9 w-9 border bg-blue-100">
              <Icon className="h-4 w-4 text-blue-600" />
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {transaction.description || transaction.category}
              </p>
              <p className="text-sm text-muted-foreground">{formattedDate}</p>
            </div>
            <div className="ml-auto font-medium">
              <span className={transaction.type === 'income' ? "text-green-600" : "text-red-600"}>
                {transaction.type === 'income' ? "+" : "-"}${Math.abs(transaction.amount).toFixed(2)}
              </span>
            </div>
            <Badge variant="outline" className="ml-2">
              {transaction.category}
            </Badge>
          </div>
        )
      })}
    </div>
  )
}


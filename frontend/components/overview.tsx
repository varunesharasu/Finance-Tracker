"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useMemo } from "react"
import { format, startOfMonth, endOfMonth, isWithinInterval } from "date-fns"

export function Overview({ transactions = [] }: any) {
  const data = useMemo(() => {
    // Get last 6 months
    const months = []
    for (let i = 5; i >= 0; i--) {
      const date = new Date()
      date.setMonth(date.getMonth() - i)
      months.push({
        date,
        name: format(date, 'MMM'),
        start: startOfMonth(date),
        end: endOfMonth(date),
      })
    }

    // Process transactions for each month
    return months.map((month) => {
      let income = 0
      let expenses = 0

      transactions.forEach((transaction: any) => {
        const transDate = new Date(transaction.date)
        if (isWithinInterval(transDate, { start: month.start, end: month.end })) {
          if (transaction.type === 'income') {
            income += transaction.amount
          } else {
            expenses += transaction.amount
          }
        }
      })

      const savings = income - expenses

      return {
        name: month.name,
        Income: Math.round(income * 100) / 100,
        Expenses: Math.round(expenses * 100) / 100,
        Savings: Math.round(savings * 100) / 100,
      }
    })
  }, [transactions])

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[350px]">
        <p className="text-sm text-muted-foreground">No data available yet</p>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Income" fill="#22c55e" />
        <Bar dataKey="Expenses" fill="#ef4444" />
        <Bar dataKey="Savings" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  )
}


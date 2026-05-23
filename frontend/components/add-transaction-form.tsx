"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { transactionAPI } from "@/lib/api"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface AddTransactionFormProps {
  onComplete: () => void
}

export function AddTransactionForm({ onComplete }: AddTransactionFormProps) {
  const [date, setDate] = useState<Date>(new Date())
  const [transactionType, setTransactionType] = useState("expense")
  const [category, setCategory] = useState("")
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation
    if (!amount || !category) {
      setError("Please fill in all required fields")
      return
    }

    setLoading(true)

    try {
      await transactionAPI.createTransaction({
        type: transactionType,
        category,
        amount: parseFloat(amount),
        description,
        date: date.toISOString(),
      })
      
      // Reset form
      setAmount("")
      setDescription("")
      setCategory("")
      setDate(new Date())
      setTransactionType("expense")
      
      onComplete()
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || "Failed to create transaction"
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="transaction-type">Transaction Type</Label>
          <RadioGroup id="transaction-type" value={transactionType} className="flex" onValueChange={setTransactionType}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="expense" id="expense" />
              <Label htmlFor="expense" className="cursor-pointer">
                Expense
              </Label>
            </div>
            <div className="flex items-center space-x-2 ml-4">
              <RadioGroupItem value="income" id="income" />
              <Label htmlFor="income" className="cursor-pointer">
                Income
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Amount *</Label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
            <Input 
              id="amount" 
              type="number" 
              step="0.01" 
              placeholder="0.00" 
              className="pl-7"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                disabled={loading}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select value={category} onValueChange={setCategory} disabled={loading}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {transactionType === "expense" ? (
                <>
                  <SelectItem value="Food">Food & Dining</SelectItem>
                  <SelectItem value="Housing">Housing</SelectItem>
                  <SelectItem value="Transportation">Transportation</SelectItem>
                  <SelectItem value="Utilities">Utilities</SelectItem>
                  <SelectItem value="Entertainment">Entertainment</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Shopping">Shopping</SelectItem>
                  <SelectItem value="Personal">Personal Care</SelectItem>
                  <SelectItem value="Debt">Debt Payments</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </>
              ) : (
                <>
                  <SelectItem value="Salary">Salary</SelectItem>
                  <SelectItem value="Freelance">Freelance</SelectItem>
                  <SelectItem value="Investments">Investments</SelectItem>
                  <SelectItem value="Gifts">Gifts</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description" 
          placeholder="Enter transaction details..." 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onComplete} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Transaction"}
        </Button>
      </div>
    </form>
  )
}


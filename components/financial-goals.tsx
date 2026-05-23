"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Briefcase, Car, Home, Plus, Trash2, AlertCircle } from "lucide-react"
import { goalAPI } from "@/lib/api"
import { Alert, AlertDescription } from "@/components/ui/alert"

const getCategoryIcon = (category: string) => {
  const categoryMap: { [key: string]: any } = {
    'housing': Home,
    'transportation': Car,
    'education': Briefcase,
    'retirement': Briefcase,
    'travel': Home,
  }
  return categoryMap[category] || Home
}

export function FinancialGoals({ totalBalance = 0, onFundsChanged }: any) {
  const [goals, setGoals] = useState([])
  const [showAddGoal, setShowAddGoal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null)
  const [addFundsAmount, setAddFundsAmount] = useState("")
  const [updateAmount, setUpdateAmount] = useState("")
  const [newGoal, setNewGoal] = useState({
    goalName: "",
    targetAmount: "",
    deadline: "",
    category: "",
  })

  // Calculate total funds in all goals
  const totalGoalFunds = goals.reduce((sum: number, goal: any) => sum + (goal.currentAmount || 0), 0)
  
  // Calculate available balance (total balance minus funds already in goals)
  const availableBalance = totalBalance - totalGoalFunds

  // Fetch goals on mount
  useEffect(() => {
    fetchGoals()
  }, [])

  const fetchGoals = async () => {
    try {
      setLoading(true)
      const response = await goalAPI.getGoals()
      setGoals(response.data || [])
      setError("")
    } catch (err) {
      setError("Failed to load goals")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddGoal = async () => {
    if (!newGoal.goalName || !newGoal.targetAmount || !newGoal.deadline || !newGoal.category) {
      setError("All fields are required")
      return
    }

    try {
      await goalAPI.createGoal({
        goalName: newGoal.goalName,
        targetAmount: parseFloat(newGoal.targetAmount),
        deadline: new Date(newGoal.deadline).toISOString(),
        category: newGoal.category,
      })

      setNewGoal({ goalName: "", targetAmount: "", deadline: "", category: "" })
      setShowAddGoal(false)
      setError("")
      fetchGoals()
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to create goal")
    }
  }

  const handleDeleteGoal = async (id: string) => {
    try {
      await goalAPI.deleteGoal(id)
      fetchGoals()
    } catch (err) {
      setError("Failed to delete goal")
    }
  }

  const handleAddFunds = async (goalId: string) => {
    if (!addFundsAmount || parseFloat(addFundsAmount) <= 0) {
      setError("Please enter a valid amount")
      return
    }

    const fundsToAdd = parseFloat(addFundsAmount)
    
    if (fundsToAdd > availableBalance) {
      setError(`Insufficient balance. Available: $${availableBalance.toFixed(2)}`)
      return
    }

    try {
      const goal = goals.find((g: any) => g._id === goalId)
      const newAmount = goal.currentAmount + fundsToAdd
      
      await goalAPI.updateGoal(goalId, { currentAmount: newAmount })
      setAddFundsAmount("")
      setEditingGoalId(null)
      setError("")
      fetchGoals()
      if (onFundsChanged) onFundsChanged()
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to add funds")
    }
  }

  const handleUpdateGoal = async (goalId: string) => {
    if (!updateAmount || parseFloat(updateAmount) < 0) {
      setError("Please enter a valid amount")
      return
    }

    const newAmount = parseFloat(updateAmount)
    const goal = goals.find((g: any) => g._id === goalId)
    const currentAmount = goal.currentAmount
    const difference = newAmount - currentAmount

    // If increasing the goal, check if we have enough balance
    if (difference > 0 && difference > availableBalance) {
      setError(`Insufficient balance. Available: $${availableBalance.toFixed(2)}`)
      return
    }

    try {
      await goalAPI.updateGoal(goalId, { currentAmount: newAmount })
      setUpdateAmount("")
      setEditingGoalId(null)
      setError("")
      fetchGoals()
      if (onFundsChanged) onFundsChanged()
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to update goal")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">Loading goals...</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Financial Goals</h2>
          <p className="text-sm text-muted-foreground">
            Available to allocate: <span className="font-semibold text-green-600">${availableBalance.toFixed(2)}</span> 
            {totalGoalFunds > 0 && <span className="text-xs ml-2">(${totalGoalFunds.toFixed(2)} in goals)</span>}
          </p>
        </div>
        <Button onClick={() => setShowAddGoal(!showAddGoal)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Goal
        </Button>
      </div>

      {showAddGoal && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Goal</CardTitle>
            <CardDescription>Set a new financial goal to track your progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="goal-name">Goal Name</Label>
                <Input
                  id="goal-name"
                  placeholder="e.g., Buy a House"
                  value={newGoal.goalName}
                  onChange={(e) => setNewGoal({ ...newGoal, goalName: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="target-amount">Target Amount ($)</Label>
                <Input
                  id="target-amount"
                  type="number"
                  placeholder="50000"
                  value={newGoal.targetAmount}
                  onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="target-date">Target Date</Label>
                <Input
                  id="target-date"
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select value={newGoal.category} onValueChange={(value) => setNewGoal({ ...newGoal, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="housing">Housing</SelectItem>
                    <SelectItem value="transportation">Transportation</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="retirement">Retirement</SelectItem>
                    <SelectItem value="travel">Travel</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleAddGoal}>Create Goal</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {goals.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="h-12 w-12 text-muted-foreground mb-3" />
          <p className="text-lg font-medium">No Goals Yet</p>
          <p className="text-sm text-muted-foreground">Create your first financial goal to get started</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal: any) => {
            const Icon = getCategoryIcon(goal.category)
            const progress = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100)
            const daysLeft = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 3600 * 24))

            return (
              <Card key={goal._id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center space-x-2">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                    <CardTitle className="text-lg font-medium">{goal.goalName}</CardTitle>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleDeleteGoal(goal._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${goal.currentAmount.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">
                    of ${goal.targetAmount.toFixed(2)} goal • {daysLeft > 0 ? `${daysLeft} days left` : 'Overdue'}
                  </p>

                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Dialog open={editingGoalId === goal._id && updateAmount !== ""} onOpenChange={(open) => {
                      if (!open) {
                        setEditingGoalId(null)
                        setUpdateAmount("")
                      }
                    }}>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setEditingGoalId(goal._id)
                            setUpdateAmount(goal.currentAmount.toString())
                          }}
                        >
                          Update
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Update {goal.goalName}</DialogTitle>
                          <DialogDescription>Set the current progress amount for this goal</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="update-amount">Current Amount ($)</Label>
                            <Input
                              id="update-amount"
                              type="number"
                              placeholder="Enter amount"
                              value={updateAmount}
                              onChange={(e) => setUpdateAmount(e.target.value)}
                            />
                            <p className="text-xs text-muted-foreground">
                              Current: ${goal.currentAmount.toFixed(2)} / Target: ${goal.targetAmount.toFixed(2)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Available Balance: ${availableBalance.toFixed(2)}
                            </p>
                            {updateAmount && parseFloat(updateAmount) > goal.currentAmount && 
                              parseFloat(updateAmount) - goal.currentAmount > availableBalance && (
                              <p className="text-xs text-red-600">
                                ❌ Not enough balance to increase goal by ${(parseFloat(updateAmount) - goal.currentAmount).toFixed(2)}
                              </p>
                            )}
                            {updateAmount && parseFloat(updateAmount) < goal.currentAmount && (
                              <p className="text-xs text-green-600">
                                ✓ Will release ${(goal.currentAmount - parseFloat(updateAmount)).toFixed(2)} back to balance
                              </p>
                            )}
                          </div>
                        </div>
                        <Button 
                          onClick={() => handleUpdateGoal(goal._id)}
                          disabled={!updateAmount || (
                            parseFloat(updateAmount) > goal.currentAmount && 
                            parseFloat(updateAmount) - goal.currentAmount > availableBalance
                          )}
                        >
                          Save Changes
                        </Button>
                      </DialogContent>
                    </Dialog>

                    <Dialog open={editingGoalId === `${goal._id}-funds`} onOpenChange={(open) => {
                      if (!open) {
                        setEditingGoalId(null)
                        setAddFundsAmount("")
                      }
                    }}>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm"
                          onClick={() => {
                            setEditingGoalId(`${goal._id}-funds`)
                            setAddFundsAmount("")
                          }}
                        >
                          Add Funds
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Funds to {goal.goalName}</DialogTitle>
                          <DialogDescription>Add money to your goal savings</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="add-funds-amount">Amount to Add ($)</Label>
                            <Input
                              id="add-funds-amount"
                              type="number"
                              placeholder="Enter amount"
                              value={addFundsAmount}
                              onChange={(e) => setAddFundsAmount(e.target.value)}
                            />
                            <p className="text-xs text-muted-foreground">
                              Goal: ${goal.currentAmount.toFixed(2)} → ${(goal.currentAmount + (parseFloat(addFundsAmount) || 0)).toFixed(2)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Available Balance: ${availableBalance.toFixed(2)}
                            </p>
                            {addFundsAmount && parseFloat(addFundsAmount) > availableBalance && (
                              <p className="text-xs text-red-600">
                                ❌ Cannot add more than available balance
                              </p>
                            )}
                          </div>
                        </div>
                        <Button 
                          onClick={() => handleAddFunds(goal._id)}
                          disabled={!addFundsAmount || parseFloat(addFundsAmount) > availableBalance}
                        >
                          Add Funds
                        </Button>
                      </DialogContent>
                    </Dialog>
                  </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}


import axios, { AxiosResponse } from "axios"
import { authOptions, endPoints } from ".."

export interface ExpenseRegistry {
  id: number,
  accountingId: number,
  expenseTypeId: number,
  description: string,
  time?: string,
  amount: number
}

export type CreateExpenseRegistry = Omit<ExpenseRegistry, 'id' | 'time'>

export const createExpense = async (expenseDto: CreateExpenseRegistry): Promise<ExpenseRegistry> => {
  const { data }: AxiosResponse<ExpenseRegistry> = await axios.post(endPoints.expenses.createExpense, expenseDto, authOptions()) 

  return data
}

export const getExpenses = async (accountingId: number) => {
  const { data } : AxiosResponse<ExpenseRegistry[]> = await axios.get(endPoints.expenses.getExpenses(accountingId), authOptions())

  return data
}
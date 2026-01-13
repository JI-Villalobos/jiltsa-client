import axios, { AxiosResponse } from "axios"
import Cookies from "js-cookie"
import { endPoints } from ".."

export interface ExpenseRegistry {
  id: number,
  accountingId: number,
  expenseTypeId: number,
  description: string,
  time?: string,
  amount: number
}

export type CreateExpenseRegistry = Omit<ExpenseRegistry, 'id' | 'time'>

const token: string = Cookies.get('token')!

const options = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
}

export const createExpense = async (expenseDto: CreateExpenseRegistry): Promise<ExpenseRegistry> => {
  const { data }: AxiosResponse<ExpenseRegistry> = await axios.post(endPoints.expenses.createExpense, expenseDto, options) 

  return data
}

export const getExpenses = async (accountingId: number) => {
  const { data } : AxiosResponse<ExpenseRegistry[]> = await axios.get(endPoints.expenses.getExpenses(accountingId), options)

  return data
}
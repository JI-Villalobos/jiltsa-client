import axios from "axios"
import { authOptions, endPoints } from ".."

export const OPERATIVE_EXPENSE_CATEGORIES = [
  'PROVEEDORES DE MEDICAMENTO',
  'PROVEEDORES EXTERNOS'
] as const

export interface OperativeExpense {
  id?: number
  branchId: number
  invoice?: string
  expenseDate: string
  providerId?: number
  amount: number
  concept: string
  category: string
}

export type CreateOperativeExpense = Omit<OperativeExpense, 'id'>

export const saveOperativeExpense = async (expense: CreateOperativeExpense) => {
  const { data } = await axios.post<OperativeExpense>(endPoints.operativeExpenses.mutate, expense, authOptions())

  return data
}

export const deleteOperativeExpense = async (expense: OperativeExpense) => {
  await axios.delete(endPoints.operativeExpenses.mutate, { ...authOptions(), data: expense })
}

export const getOperativeExpenses = async (branchId: number, date: string) => {
  const { data } = await axios.get<OperativeExpense[]>(endPoints.operativeExpenses.getExpenses(branchId, date), authOptions())

  return data
}

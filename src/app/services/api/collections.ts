import axios, { AxiosResponse } from "axios"
import { authOptions, endPoints } from ".."

export interface ExpenseType {
  id: number,
  type: string
}

export interface IncomeType {
  id: number,
  type: string
}

export type ExpenseTypeDto = Omit<ExpenseType, 'id'>

export type IncomeTypeDto = Omit<IncomeType, 'id'>

export const getExpenseTypes = async (): Promise<ExpenseType[]> => {
  const { data }: AxiosResponse<ExpenseType[]> = await axios.get(endPoints.collections.expenseTypes, authOptions())

  return data
}

export const createExpenseType = async (expense: ExpenseTypeDto): Promise<ExpenseType> => {
  const { data }: AxiosResponse<ExpenseType> = await axios.post(endPoints.collections.expenseTypes, expense, authOptions())

  return data
}

export const getIncomeTypes = async (): Promise<IncomeType[]> => {
  const { data }: AxiosResponse<IncomeType[]> = await axios.get(endPoints.collections.incomeTypes, authOptions())

  return data
}

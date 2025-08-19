import axios, { AxiosResponse } from "axios"
import Cookies from "js-cookie"
import { endPoints } from ".."

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

const token: string = Cookies.get('token')!

const options = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
}

export const getExpenseTypes = async (): Promise<ExpenseType[]> => {
  const { data }: AxiosResponse<ExpenseType[]> = await axios.get(endPoints.collections.expenseTypes, options)

  return data
}

export const createExpenseType = async (expense: ExpenseTypeDto): Promise<ExpenseType> => {
  const { data }: AxiosResponse<ExpenseType> = await axios.post(endPoints.collections.expenseTypes, expense, options)

  return data
}

export const getIncomeTypes = async (): Promise<IncomeType[]> => {
  const { data }: AxiosResponse<IncomeType[]> = await axios.get(endPoints.collections.incomeTypes, options)

  return data
}

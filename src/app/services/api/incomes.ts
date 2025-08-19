import axios, { AxiosResponse } from "axios"
import Cookies from "js-cookie"
import { endPoints } from ".."

export interface IncomeRegistry {
  id: number,
  accountingId: number,
  incomeTypeId: number,
  tag: string,
  time?: string,
  amount: number
}

export type CreateIncomeRegistry = Omit<IncomeRegistry, 'id' | 'time'>

const token: string = Cookies.get('token')!

const options = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
}

export const createIncome = async (incomeDto: CreateIncomeRegistry) => {
  const { data }: AxiosResponse<IncomeRegistry> = await axios.post(endPoints.incomes.createIncome, incomeDto, options)

  return data
}

export const createIncomes = async (incomes: CreateIncomeRegistry[]) => {
  const { data }: AxiosResponse<IncomeRegistry[]> = await axios.post(endPoints.incomes.createIncomes, incomes, options)
  
  return data;
}
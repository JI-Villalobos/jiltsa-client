import axios, { AxiosResponse } from "axios"
import { authOptions, endPoints } from ".."

export interface IncomeRegistry {
  id: number,
  accountingId: number,
  incomeTypeId: number,
  tag: string,
  time?: string,
  amount: number
}

export type CreateIncomeRegistry = Omit<IncomeRegistry, 'id' | 'time'>

export const createIncome = async (incomeDto: CreateIncomeRegistry) => {
  const { data }: AxiosResponse<IncomeRegistry> = await axios.post(endPoints.incomes.createIncome, incomeDto, authOptions())

  return data
}

export const createIncomes = async (incomes: CreateIncomeRegistry[]) => {
  const { data }: AxiosResponse<IncomeRegistry[]> = await axios.post(endPoints.incomes.createIncomes, incomes, authOptions())
  
  return data
}

export const getIncomes = async (accountingId: number) => {
  const { data }: AxiosResponse<IncomeRegistry[]> = await axios.get(endPoints.incomes.getByAccounting(accountingId), authOptions())

  return data

}
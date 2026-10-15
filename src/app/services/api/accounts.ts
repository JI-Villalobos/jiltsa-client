import axios, { AxiosResponse } from "axios"
import { authOptions, endPoints } from ".."
import { ExpenseRegistry } from "./expenses"
import { IncomeRegistry } from "./incomes"
import { Page } from "./pagination"

export interface Accounting {
  id: number,
  sellerId: number,
  branchId: number,
  date: string,
  expenseRegistries: ExpenseRegistry[],
  incomeRegistries: IncomeRegistry[]
}

export type CreatedAccounting = Omit<Accounting, 'expenseRegistries' | 'incomeRegistries'>
export type CreateAccounting = Pick<Accounting, 'sellerId' | 'branchId' | 'date'>
export type PageAccounting = {
  content: Accounting[]
} & Page

export type CustomAccounting = Omit<Accounting, 'expenseRegistries' | 'incomeRegistries' | 'id'>

export const getLatestRegistries = async (branchId: number): Promise<Accounting[]> => {
  //I don't remember why i did this
  const accountings: Accounting[] = []
  await axios.get<Accounting[]>(endPoints.accountings.getLastRegistries(branchId), authOptions()).then(({ data }) => {
    data.forEach(account => accountings.push(account))
  })

  return accountings
}

export const getByDate = async (initial: string, end: string, branchId: number, page: number = 0): Promise<PageAccounting> => {
  const { data }: AxiosResponse<PageAccounting> = await axios.get(endPoints.accountings.getByDate(initial, end, branchId, page), authOptions())

  return data
}

export const getAccounting = async (accountingId: number): Promise<Accounting> => {
  const { data }: AxiosResponse<Accounting> = await axios.get<Accounting>(endPoints.accountings.getAccounting(accountingId), authOptions())

  return data
}

export const newAccounting = async (accounting: CreateAccounting): Promise<CreatedAccounting> => {
  const { data }: AxiosResponse<CreatedAccounting> = await axios.post(endPoints.accountings.createAccounting, accounting, authOptions()) 

  return data
}

export const newCustomAccounting =  async (accounting: CustomAccounting): Promise<CreatedAccounting> => {
  const { data }: AxiosResponse<CreatedAccounting> = await axios.post(endPoints.accountings.createOutOfDateAccounting, accounting, authOptions())

  return data
}
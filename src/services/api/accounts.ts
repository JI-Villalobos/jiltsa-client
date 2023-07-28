import axios, { AxiosResponse } from "axios"
import Cookies from "js-cookie"
import { endPoints } from ".."
import { ExpenseRegistry } from "./expenses"
import { IncomeRegistry } from "./incomes"

export interface Accounting {
  id: number,
  sellerId: number,
  branchId: number,
  date?: string,
  expenseRegistries: ExpenseRegistry[],
  incomeRegistries: IncomeRegistry[]
}

export type CreateAccounting = Pick<Accounting, 'sellerId' | 'branchId'>
export type CustomAccounting = Omit<Accounting, 'expenseRegistries' | 'incomeRegistries' | 'id'>

const token: string = Cookies.get('token')!

const options = {
  headers: {
    'Content-Type': 'application/json',
  }
}

export const getLatestRegistries = async (branchId: number): Promise<Accounting[]> => {
  //I don't remember why i did this
  const accountings: Accounting[] = []
  axios.defaults.headers.Authorization = `Bearer ${token}`;
  await axios.get<Accounting[]>(endPoints.accountings.getLastRegistries(branchId)).then(({ data }) => {
    data.forEach(account => accountings.push(account))
  })

  return accountings
}

export const getByDate = async (initial: string, end: string, branchId: number): Promise<Accounting[]> => {
  axios.defaults.headers.Authorization = `Bearer ${token}`;
  const { data }: AxiosResponse<Accounting[]> = await axios.get(endPoints.accountings.getByDate(initial, end, branchId), options)

  return data
}

export const getAccounting = async (accountingId: number): Promise<Accounting> => {
  axios.defaults.headers.Authorization = `Bearer ${token}`;
  const { data }: AxiosResponse<Accounting> = await axios.get<Accounting>(endPoints.accountings.getAccounting(accountingId), options)

  return data
}

export const newAccounting = async (accounting: CreateAccounting): Promise<Accounting> => {
  axios.defaults.headers.Authorization = `Bearer ${token}`;
  const { data }: AxiosResponse<Accounting> = await axios.post(endPoints.accountings.createAccounting, accounting, options) 

  return data
}

export const newCustomAccounting =  async (accounting: CustomAccounting): Promise<Accounting> => {
  axios.defaults.headers.Authorization = `Bearer ${token}`;
  const { data }: AxiosResponse<Accounting> = await axios.post(endPoints.accountings.createOutOfDateAccounting, accounting, options)

  return data
}
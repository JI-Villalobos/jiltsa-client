import axios, { AxiosResponse } from "axios"
import Cookies from "js-cookie"
import { endPoints } from ".."
import { Page } from "./pagination"

const token: string = Cookies.get('token')!

const options = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
}

export interface CashWithdrawal {
  id: number,
  date?: string,
  amount: number,
  concept: string,
  sellerName: string,
  branch: string
}

export type PageCashWithdrawal = {
  content: CashWithdrawal[]
} & Page

export type CreateCashWithdrawalDto = Omit<CashWithdrawal, 'id' | 'date'>

export const createCashRegistry = async (cashRegistry: CreateCashWithdrawalDto): Promise<CashWithdrawal> => {
  const { data }: AxiosResponse<CashWithdrawal> = await axios.post(endPoints.cash.withdrawals,  cashRegistry, options)

  return data
}

export const getCashRegistries = async (branch: string): Promise<CashWithdrawal[]> => {
  const { data }: AxiosResponse<CashWithdrawal[]> = await axios.get(endPoints.cash.getCashRegistries(branch), options)

  return data
}

export const getLatestCashRegistries = async (branch: string, page: number): Promise<PageCashWithdrawal> => {
  const { data }: AxiosResponse<PageCashWithdrawal> = await axios.get(endPoints.cash.getLastMonthCashwithrawalRegistries(branch, page), options)

  return data
}

export const getCurrentCashRegistries = async (branch: string): Promise<CashWithdrawal[]> => {
  const { data }: AxiosResponse<CashWithdrawal[]> = await axios.get(endPoints.cash.getCurrentCashwithdrawalRegistries(branch), options)

  return data
}
import axios, { AxiosResponse } from "axios"
import { authOptions, endPoints } from ".."
import { Page } from "./pagination"

export interface CashWithdrawal {
  id: number,
  date?: string,
  amount: number,
  concept: string,
  sellerName: string,
  branchId: number,
  branch: string
}

export type PageCashWithdrawal = {
  content: CashWithdrawal[]
} & Page

export type CreateCashWithdrawalDto = Omit<CashWithdrawal, 'id' | 'date'>
export type CreatedCashWithdrawal = Omit<CashWithdrawal, 'date'>

export const createCashRegistry = async (cashRegistry: CreateCashWithdrawalDto): Promise<CreatedCashWithdrawal> => {
  const { data }: AxiosResponse<CreatedCashWithdrawal> = await axios.post(endPoints.cash.withdrawals, cashRegistry, authOptions())

  return data
}

export const getCashRegistries = async (branchId: number): Promise<CashWithdrawal[]> => {
  const { data }: AxiosResponse<CashWithdrawal[]> = await axios.get(endPoints.cash.getCashRegistries(branchId), authOptions())

  return data
}

export const getLatestCashRegistries = async (branchId: number, page: number): Promise<PageCashWithdrawal> => {
  const { data }: AxiosResponse<PageCashWithdrawal> = await axios.get(endPoints.cash.getLastMonthCashwithrawalRegistries(branchId, page), authOptions())

  return data
}

export const getCurrentCashRegistries = async (branchId: number): Promise<CashWithdrawal[]> => {
  const { data }: AxiosResponse<CashWithdrawal[]> = await axios.get(endPoints.cash.getCurrentCashwithdrawalRegistries(branchId), authOptions())

  return data
}
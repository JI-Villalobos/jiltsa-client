import axios, { AxiosResponse } from "axios"
import Cookies from "js-cookie"
import { endPoints } from ".."

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

export type CreateCashWithdrawalDto = Omit<CashWithdrawal, 'id' | 'date'>

export const createCashRegistry = async (cashRegistry: CreateCashWithdrawalDto): Promise<CashWithdrawal> => {
  const { data }: AxiosResponse<CashWithdrawal> = await axios.post(endPoints.cash.withdrawals,  cashRegistry, options)

  return data
}

export const getCashRegistries = async (branch: string): Promise<CashWithdrawal[]> => {
  const { data }: AxiosResponse<CashWithdrawal[]> = await axios.get(endPoints.cash.getCashRegistries(branch), options)

  return data
}
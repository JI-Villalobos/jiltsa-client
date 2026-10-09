import axios from "axios"
import { authOptions, endPoints } from ".."

export interface CashSorting {
  id?: number,
  branchId: number,
  accountingId: number,
  cashDate: string,
  bt1000: number,
  bt500: number,
  bt200: number,
  bt100: number,
  bt50: number,
  bt20: number,
  md20: number,
  md10: number,
  md5: number,
  md2: number,
  md1: number,
  md005: number,
  bls10: number,
  bls5: number,
  bls2: number,
  bls1: number
}

export const saveCashSorting = async (cashSorting: CashSorting) => {
  const { data } = await axios.post(endPoints.cashSorting.mutate, cashSorting, authOptions())

  return data
}

export const getCashSorting = async (accountingId: number) => {
  const { data } = await axios.get(endPoints.cashSorting.getCashSorting(accountingId), authOptions())

  return data
}
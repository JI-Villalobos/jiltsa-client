import axios, { AxiosResponse } from "axios"
import { authOptions, endPoints } from ".."
import { Page } from "./pagination"

export interface Bill {
  id: number
  date: string
  invoice: string
  branch: string
  branchId: number
  amount: number
  limitPaymentDate: string
  isPaid: boolean
  paymentTicket: string
  providerId: number
  isActive: boolean
  receptionDate: string
}

export type CreateBill = Omit<Bill, 'id' | 'limitPaymentDate' | 'isPaid' | 'paymentTicket' |'isActive' | 'receptionDate'>

export type PageBill = {
  content: Bill[]
} & Page

export const getBills = async (page: number): Promise<PageBill> => {
  const { data }: AxiosResponse<PageBill> = await axios.get(endPoints.billing.all(page), authOptions())

  return data
}

export const getPendingBills = async (page: number): Promise<PageBill> => {
  const { data }: AxiosResponse<PageBill> = await axios.get(endPoints.billing.pending(page), authOptions())

  return data
}

export const getBillById = async (id: number): Promise<Bill> => {
  const { data }: AxiosResponse<Bill> = await axios.get(endPoints.billing.getById(id), authOptions())

  return data
}

export const createNewBill = async (bill: CreateBill): Promise<Bill> => {
  const { data }: AxiosResponse<Bill> = await axios.post(endPoints.billing.bills, bill, authOptions())

  return data
}

export const updateBills = async (bills: Bill[]): Promise<Bill[]> => {
  const { data }: AxiosResponse<Bill[]> = await axios.put(endPoints.billing.bills, bills, authOptions())

  return data
}
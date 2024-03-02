import Cookies from "js-cookie"
import axios, { AxiosResponse } from "axios"
import { endPoints } from ".."
import { Page } from "./pagination"

export interface Bill {
  id: number
  date: string
  invoice: string
  branch: string
  branchId: string
  amount: number
  limitPaymentDate: string
  isPaid: boolean
  paymentTicket: string
  providerId: number
  isActive: boolean
}

export type CreateBill = Omit<Bill, 'id' | 'limitPaymentDate' | 'isPaid' | 'paymentTicket' |'isActive' >

export type PageBill = {
  content: Bill[]
} & Page

const token: string  = Cookies.get('token')!

const options = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
}

export const getBills = async (page: number): Promise<PageBill> => {
  const { data }: AxiosResponse<PageBill> = await axios.get(endPoints.billing.all(page), options)

  return data
}

export const getPendingBills = async (page: number): Promise<PageBill> => {
  const { data }: AxiosResponse<PageBill> = await axios.get(endPoints.billing.pending(page), options)

  return data
}

export const getBillById = async (id: number): Promise<Bill> => {
  const { data }: AxiosResponse<Bill> = await axios.get(endPoints.billing.getById(id), options)

  return data
}
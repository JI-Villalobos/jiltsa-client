import axios, { Axios, AxiosResponse } from "axios"
import Cookies from "js-cookie"
import { endPoints } from ".."

const token: string = Cookies.get('token')!

const options = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
}

export interface Payment {
  id: number
  date: string
  amount: number
  ticket: string
}

export type CreatePayment = Omit<Payment, 'id'>

export const createPaymnet = async (payment: CreatePayment): Promise<Payment> => {
  const { data }: AxiosResponse<Payment> = await axios.post(endPoints.payment.payment, payment, options)
  
  return data
}

export const getPaymentTicker = async (): Promise<String> => {
  const { data } = await axios.get(endPoints.payment.getTicket, options)
  
  return data
}
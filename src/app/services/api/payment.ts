import axios, { Axios, AxiosResponse } from "axios"
import { authOptions, endPoints } from ".."

export interface Payment {
  id: number
  date: string
  amount: number
  ticket: string
}

export type CreatePayment = Omit<Payment, 'id'>

export const createPayment = async (payment: CreatePayment): Promise<Payment> => {
  const { data }: AxiosResponse<Payment> = await axios.post(endPoints.payment.payment, payment, authOptions())
  
  return data
}

export const getPaymentTicket = async (): Promise<string> => {
  const { data }: AxiosResponse<string> = await axios.get(endPoints.payment.getTicket, authOptions())
  
  return data
}
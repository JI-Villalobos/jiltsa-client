import axios, { AxiosResponse } from "axios"
import Cookies from "js-cookie"
import { endPoints } from ".."

export interface CreditSale {
    id: number
    concept: string
    date: string
    amount: number
    branchId: number
    isPaid: boolean
    partials: Partial[]
}

export interface Partial{
    id: number
    creditSaleId: number
    paymentDate: string
    amount: number
}

export type CreateCreditSale = Omit<CreditSale, 'id' | 'isPaid' | 'partials'>
export type UpdateCreditSale = Omit<CreditSale, 'partials'>
export type CreatePartial = Omit<Partial, 'id'>

const token: string  = Cookies.get('token')!

const options = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
}

export const getCreditSales = async (branchId: number): Promise<CreditSale[]> => {
    const { data }: AxiosResponse<CreditSale[]> = await axios.get(endPoints.creditSales.getAll(branchId), options)

    return data
}

export const getCreditSale = async (creditSaleId: number): Promise<CreditSale> => {
    const { data }: AxiosResponse<CreditSale> = await axios.get(endPoints.creditSales.getById(creditSaleId), options)

    return data;
}

export const getCreditSaleByStatus = async (branchId: number, isPaid: boolean): Promise<CreditSale[]> => {
    const { data }: AxiosResponse<CreditSale[]> = await axios.get(endPoints.creditSales.getByPaymentStatus(branchId, isPaid), options)

    return data
}

export const createCreditSale = async (creditSale: CreateCreditSale): Promise<CreditSale> => {
    const { data }: AxiosResponse<CreditSale> = await axios.post(endPoints.creditSales.mutate, creditSale, options)

    return data
}

export const updateCreditSale = async (creditSale: UpdateCreditSale): Promise<CreditSale> => {
    const { data }: AxiosResponse<CreditSale> = await axios.put(endPoints.creditSales.mutate, creditSale, options)

    return data
}

export const getPartial = async (partialId: number): Promise<Partial> => {
    const { data }: AxiosResponse<Partial> = await axios.get(endPoints.partialPayments.getById(partialId), options)

    return data
}

export const createPartial = async (partial: CreatePartial): Promise<Partial> => {
    const { data }: AxiosResponse<Partial> = await axios.post(endPoints.partialPayments.mutate, partial, options)

    return data
}


import axios, { AxiosResponse } from "axios"
import Cookies from "js-cookie"
import { endPoints } from ".."

export interface Seller {
  id: number,
  fullName: string,
  branchId: number,
  isActive: boolean
}

export type SellerDto = Omit<Seller, 'id'>

const token: string  = Cookies.get('token')!

const options = {
  headers: {
    'Content-Type': 'application/json',
  }
}

export const getSeller = async (sellerId: number): Promise<Seller> => {
  axios.defaults.headers.Authorization = `Bearer ${token}`;
  const result: AxiosResponse<Seller> = await axios.get<Seller>(endPoints.sellers.getSeller(sellerId), options)
  
  return result.data
}

export const getAllSellers = async (): Promise<Seller[]> => {
  axios.defaults.headers.Authorization = `Bearer ${token}`;
  const { data }: AxiosResponse<Seller[]> = await axios.get(endPoints.sellers.getSellers, options)

  return data
}

export const getSellerByBranch = async (branchId: number): Promise<Seller[]> => {
  axios.defaults.headers.Authorization = `Bearer ${token}`
  const result: AxiosResponse<Seller[]> = await axios.get<Seller[]>(endPoints.sellers.getSellersByBranch(branchId), options)

  return result.data
}

export const newSeller = async (seller: SellerDto): Promise<Seller> => {
  axios.defaults.headers.Authorization = `Bearer ${token}`
  const result: AxiosResponse = await axios.post(endPoints.sellers.newSeller, seller, options)

  return result.data
}

export const disableSeller = async (sellerId: number) => {
  axios.defaults.headers.Authorization = `Bearer ${token}`
  const { data }: AxiosResponse<Seller> = await axios.patch(endPoints.sellers.getSeller(sellerId), options)

  return data
}
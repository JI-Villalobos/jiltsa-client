import axios, { AxiosResponse } from "axios"
import { authOptions, endPoints } from ".."

export interface Seller {
  id: number,
  fullName: string,
  branchId: number,
  isActive: boolean
}

export type SellerDto = Omit<Seller, 'id'>

export const getSeller = async (sellerId: number): Promise<Seller> => {
  const result: AxiosResponse<Seller> = await axios.get<Seller>(endPoints.sellers.getSeller(sellerId), authOptions())
  
  return result.data
}

export const getAllSellers = async (): Promise<Seller[]> => {
  const { data }: AxiosResponse<Seller[]> = await axios.get(endPoints.sellers.getSellers, authOptions())

  return data
}

export const getSellerByBranch = async (branchId: number): Promise<Seller[]> => {
  const result: AxiosResponse<Seller[]> = await axios.get<Seller[]>(endPoints.sellers.getSellersByBranch(branchId), authOptions())

  return result.data
}

export const newSeller = async (seller: SellerDto): Promise<Seller> => {
  const result: AxiosResponse = await axios.post(endPoints.sellers.newSeller, seller, authOptions())

  return result.data
}

export const disableSeller = async (sellerId: number) => {
  const { data }: AxiosResponse<Seller> = await axios.patch(endPoints.sellers.getSeller(sellerId), null, authOptions())

  return data
}
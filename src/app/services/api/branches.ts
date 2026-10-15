import axios, { AxiosResponse } from "axios"
import { authOptions, endPoints } from ".."

export interface Branch {
  id: number,
  name: string,
  isActive: boolean
}

export interface TotalBalance {
  totals: number
}

export interface BranchConfig {
  id: number,
  branchId: number,
  initialBalance: number,
  canEditAccount: boolean,
  canOpenOutdatedAccount: boolean,
  profile: BranchProfile
}

export type BranchProfile = 'PHARMACY' | 'PURIFIED_WATER' | 'NURSERY'

export const getBranches = async (): Promise<Branch[]> => {
  const { data }: AxiosResponse<Branch[]> = await axios.get(endPoints.branches.branches, authOptions())

  return data
}

export const getBranchById = async (branchId: number): Promise<Branch> => {
  const { data }: AxiosResponse<Branch> = await axios.get(endPoints.branches.getById(branchId), authOptions())

  return data
} 

export const getBranchConfig = async (): Promise<BranchConfig[]> => {
  const { data }: AxiosResponse<BranchConfig[]> = await axios.get(endPoints.branches.getBranchConfig, authOptions())

  return data
}

export const updateBranchConfig = async (branchConfig: BranchConfig): Promise<BranchConfig> => {
  const { data }: AxiosResponse<BranchConfig> = await axios.put(endPoints.branches.updateBranchConfig, branchConfig, authOptions())

  return data
}

export const getTotalBalance = async (branchId: number): Promise<TotalBalance> => {
  const { data }: AxiosResponse<TotalBalance> = await axios.get(endPoints.branches.getTotalBalance(branchId), authOptions())

  return data
}
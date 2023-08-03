import axios, { AxiosResponse } from "axios"
import Cookies from "js-cookie"
import { endPoints } from ".."

export interface Branch {
  id: number,
  name: string,
  isActive: boolean
}

export interface BranchConfig {
  id: number,
  branchId: number,
  initialBalance: number
}


const token: string = Cookies.get('token')!

const options = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
}

export const getBranches = async (): Promise<Branch[]> => {
  const { data }: AxiosResponse<Branch[]> = await axios.get(endPoints.branches.branches, options)

  return data
}

export const getBranchById = async (branchId: number): Promise<Branch> => {
  const { data }: AxiosResponse<Branch> = await axios.get(endPoints.branches.getById(branchId), options)

  return data
} 

export const getBranchConfig = async (): Promise<BranchConfig[]> => {
  const { data }: AxiosResponse<BranchConfig[]> = await axios.get(endPoints.branches.getBranchConfig, options)

  return data
}

export const updateBranchConfig = async (branchConfigId: number, BranchConfig: BranchConfig): Promise<BranchConfig> => {
  const { data }: AxiosResponse<BranchConfig> = await axios.put(endPoints.branches.updateBranchConfig(branchConfigId), BranchConfig, options)

  return data
}
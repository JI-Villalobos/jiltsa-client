import axios, { AxiosResponse } from "axios"
import Cookies from "js-cookie"
import { endPoints } from ".."

export interface Branch {
  id: number,
  name: string,
  isActive: boolean
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
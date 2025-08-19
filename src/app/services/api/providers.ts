import axios, { AxiosResponse } from "axios"
import Cookies from "js-cookie"
import { endPoints } from ".."

export interface Provider {
  id: number,
  name: string,
  rfc: string
}

export type CreateProvider = Omit<Provider, 'id'>

const token: string = Cookies.get('token')!

const options = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
}

export const getProviders = async (): Promise<Provider[]> => {
  const { data }: AxiosResponse<Provider[]> = await axios.get(endPoints.providers.op, options)

  return data
}

export const CreateProvider = async (provider: CreateProvider): Promise<Provider> => {
  const { data }: AxiosResponse<Provider> = await axios.post(endPoints.providers.op, options)

  return data
}
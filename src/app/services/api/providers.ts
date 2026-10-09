import axios, { AxiosResponse } from "axios"
import { authOptions, endPoints } from ".."

export interface Provider {
  id: number,
  name: string,
  rfc: string
}

export type CreateProvider = Omit<Provider, 'id'>

export const getProviders = async (): Promise<Provider[]> => {
  const { data }: AxiosResponse<Provider[]> = await axios.get(endPoints.providers.op, authOptions())

  return data
}

export const CreateProvider = async (provider: CreateProvider): Promise<Provider> => {
  const { data }: AxiosResponse<Provider> = await axios.post(endPoints.providers.op, provider, authOptions())

  return data
}
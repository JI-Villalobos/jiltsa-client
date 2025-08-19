import axios, { AxiosResponse } from "axios"
import Cookies from "js-cookie"
import { endPoints } from ".."

export interface CheckList {
    checkType: string
    date: string
    cashBalance: number
    tranboxBalance: number
    cellphoneCharge: number
    cellphoneCondition: boolean
    cellphoneObservation: string
    furnitureCleanConditions: number
    installationState: boolean
    installationStateObservation: string
    sellerId: number
    accountingId: number
}

export type CreateCheckList = Omit<CheckList, 'id'>

const token: string  = Cookies.get('token')!

const options = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
}

export const getCheckListById = async (id: number): Promise<CheckList> => {
    const { data }: AxiosResponse<CheckList> = await axios.get(endPoints.checkList.getById(id), options)

    return data
}

export const createCheckList = async (checkList: CreateCheckList): Promise<CheckList> => {
    const { data }: AxiosResponse<CheckList> = await axios.post(endPoints.checkList.mutate, checkList, options)

    return data
}
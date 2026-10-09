import axios, { AxiosResponse } from "axios"
import { authOptions, endPoints } from ".."

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

export const getCheckListById = async (id: number): Promise<CheckList> => {
    const { data }: AxiosResponse<CheckList> = await axios.get(endPoints.checkList.getById(id), authOptions())

    return data
}

export const createCheckList = async (checkList: CreateCheckList): Promise<CheckList> => {
    const { data }: AxiosResponse<CheckList> = await axios.post(endPoints.checkList.mutate, checkList, authOptions())

    return data
}
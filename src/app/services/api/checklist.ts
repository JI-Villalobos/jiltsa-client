import axios, { AxiosResponse } from "axios"
import { authOptions, endPoints } from ".."

export type CheckType = 'CHECK_IN' | 'CHECK_OUT'

/**
 * The API declares this field as `string(byte)`: springdoc's rendering of a Java `byte`.
 * It is a small numeric code, not base64, so it travels as a number.
 */
export type FurnitureCleanCondition = 1 | 2 | 3

export interface CheckList {
    id: number
    checkType: CheckType
    date: string
    cashBalance: number
    tranboxBalance: number
    cellphoneCharge: number
    cellphoneCondition: boolean
    cellphoneObservation: string
    furnitureCleanConditions: FurnitureCleanCondition
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
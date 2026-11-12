import axios from "axios"
import { authOptions, endPoints } from ".."

/** Employee form of a seller. One profile per seller. */
export interface SellerProfile {
  id?: number
  sellerId: number
  fullName: string
  /** yyyy-MM-dd */
  birthDate: string
  phone: string
  rfc?: string
  curp?: string
  emergencyContactName: string
  emergencyContactPhone: string
  /** yyyy-MM-dd */
  hireDate: string
  position: string
  salary: number
  /** Must be true to create the profile. */
  privacyNoticeAccepted: boolean
  branchId?: number
  privacyNoticeAcceptedAt?: string
  registeredBy?: string
  createdAt?: string
  updatedAt?: string
}

export type CreateSellerProfile = Omit<SellerProfile, 'id' | 'branchId' | 'privacyNoticeAcceptedAt' | 'registeredBy' | 'createdAt' | 'updatedAt'>

/** Validation patterns declared by the API (its `(?i)` flag becomes JS's `i`). */
export const PHONE_PATTERN = /^\+?[0-9][0-9 ()-]{5,18}[0-9]$/
export const RFC_PATTERN = /^[A-ZÑ&]{3,4}[0-9]{6}[A-Z0-9]{3}$/i
export const CURP_PATTERN = /^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[A-Z0-9][0-9]$/i

/** Profile of a seller, or undefined when the seller has not filled the form (404). */
export const getProfileBySeller = async (sellerId: number): Promise<SellerProfile | undefined> => {
  try {
    const { data } = await axios.get<SellerProfile>(endPoints.sellerProfiles.getBySeller(sellerId), authOptions())
    return data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) return undefined
    throw error
  }
}

export const getProfile = async (profileId: number) => {
  const { data } = await axios.get<SellerProfile>(endPoints.sellerProfiles.byId(profileId), authOptions())

  return data
}

export const createProfile = async (profile: CreateSellerProfile) => {
  const { data } = await axios.post<SellerProfile>(endPoints.sellerProfiles.create, profile, authOptions())

  return data
}

export const updateProfile = async (profile: SellerProfile) => {
  const { data } = await axios.put<SellerProfile>(endPoints.sellerProfiles.byId(profile.id!), profile, authOptions())

  return data
}

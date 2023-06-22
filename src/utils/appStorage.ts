import { AuthResponse } from "@/services/api/auth";
import Cookies from "js-cookie";

export type CurrentAccounting = {
  accountingId: number,
  seller: string,
}

export const getCurrentAccounting = (): CurrentAccounting | undefined => {
  const accounting: string | undefined = Cookies.get('accountingId')
  const seller: string | undefined = Cookies.get('seller')

  if (typeof accounting === 'string' && typeof seller === 'string') {
    const accountingId: number = parseInt(accounting)
    return {
      accountingId,
      seller
    }
  }
}

export const setCurrentAccounting = (currentAccounting: CurrentAccounting): void => {
  Cookies.set('accountingId', currentAccounting.accountingId.toString(), {  expires: 1 })
  Cookies.set('seller', currentAccounting.seller, { expires: 1 })
}

export const deleteAccounting = (): void => {
  Cookies.remove('accountingId')
  Cookies.remove('seller')
}

export const getBranchId = (): number | undefined => {
  const branch: string | undefined = Cookies.get('branchId')
  if(typeof branch === 'string'){
    return parseInt(branch)
  }
}

export const setUserCredentials = (userAuth: AuthResponse): void => {
  Cookies.set('token', userAuth.token, { expires: 25 })
  Cookies.set('role', userAuth.role, { expires: 25 })
  Cookies.set('branchId', userAuth.branchId.toString(), { expires: 25 })
}

export const getUserCredentials = (): AuthResponse | undefined => {
  const token: string | undefined = Cookies.get('token');
  const role: string | undefined = Cookies.get('role');
  const branch: string | undefined = Cookies.get('branchId');

  if (typeof token === 'string' && typeof role === 'string' && typeof branch === 'string') {
    const branchId: number = parseInt(branch)

    return {
      token,
      role, 
      branchId
    }
  }
}

export const deleteUserCredentials = () => {
  Cookies.remove('token')
  Cookies.remove('role')
  Cookies.remove('branchId')
  Cookies.remove('accountingId')
  Cookies.remove('seller')
}
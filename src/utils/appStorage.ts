import { AuthResponse } from "@/services/api/auth";
import { Branch } from "@/services/api/branches";
import Cookies from "js-cookie";
import { Role } from "./variables";
import { Bill } from "@/services/api/billing";
import { ExpenseRegistry } from "@/services/api/expenses";

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

export const setLocalBranches = (branches: Branch[]): void => {
  Cookies.set('branches', JSON.stringify(branches))
}

export const setBranchName = (branch: string): void => {
  Cookies.set('branch-name', branch)
}

export const getBranchName = (): string | undefined => {
  const branch = Cookies.get('branch-name')

  return branch
}

export const getLocalBranches = (): Branch[] | undefined => {
  const branches: string | undefined = Cookies.get('branches')

  if(branches){
    return JSON.parse(branches)
  }
}

export const getLocalBranch = ( branchId: number): Branch | undefined => {
  const storedData: string | undefined = Cookies.get('branches')

  if(storedData){
    const branches: Branch[] = JSON.parse(storedData)
    return branches.find((branch) => branch.id === branchId)
  }
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

export const isAuth = (): boolean => {
  if (Cookies.get('token')) {
    return true;
  }

  return false;
}

export const setUserRole = (): void => {
  Cookies.set('role', Role.USER, { expires: 25 })
}

export const setAdminRole = (): void => {
  Cookies.set('role', Role.ADMIN, { expires: 25 })
}

export const setBills = (bills: Bill[]) => {
  Cookies.set('bills', JSON.stringify(bills))
}

export const getBills = (): Bill[] | undefined => {
  const bills: string | undefined = Cookies.get('bills')

  if(bills){
    return JSON.parse(bills)
  }
}

export const clearBillStorage = () => {
  Cookies.remove('bills')
}

export const deleteUserCredentials = () => {
  Cookies.remove('token')
  Cookies.remove('role')
  Cookies.remove('branchId')
  Cookies.remove('accountingId')
  Cookies.remove('seller')
}

export const initialExpenseRegistry: ExpenseRegistry = {
  id: 0,
  accountingId: 0,
  expenseTypeId: 0,
  description: '',
  amount: 0,
  time: ''
}

export const setStoredExpenseRegistry = (expense: ExpenseRegistry): void => {
  Cookies.set('expense', JSON.stringify(expense))
  console.log(expense);
  
}

export const getStoredExpenseRegistry = (): ExpenseRegistry => {
  const expense = Cookies.get('expense')

  if (expense) {
    return JSON.parse(expense)
  }

  return initialExpenseRegistry
}

export const setTagExpense = (tag: string): void => {
  Cookies.set('tag', tag)
}

export const getTag = (): string => {
  const tag = Cookies.get('tag')

  return tag ? tag : ''
}
export const setLocalMode = (mode: 'DEMO' | 'NORMAL'): void => {
  Cookies.set('mode', mode)
}

export const getMode = (): string => {
  const mode = Cookies.get('mode')

  return mode ? mode : 'NORMAL'
}

export const setIncomesRegistered = (tag: string): void => {
  const incomes = Cookies.get('incomes-reg')
  const list: string[] = [tag]

  if (!incomes) {
    Cookies.set('incomes-reg', JSON.stringify(list))
  } else {
    const registered: string[] = JSON.parse(incomes)
    registered.push(tag)
    Cookies.set('incomes-reg', JSON.stringify(registered))
  }
}

export const getIncomesRegistered = (): string[] => {
  const registered = Cookies.get('incomes-reg')
  if (registered) {
    return JSON.parse(registered)
  }

  return []
}

export const clearIncomesregistered = () => {
  Cookies.remove('incomes-reg')
}
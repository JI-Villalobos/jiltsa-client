import Cookies from "js-cookie";
import { Role } from "./variables";
import { Branch } from "@/app/services/api/branches";
import { AuthResponse } from "@/app/services/api/auth";
import { Bill } from "@/app/services/api/billing";
import { ExpenseRegistry } from "@/app/services/api/expenses";
import { IncomeRegistry } from "@/app/services/api/incomes";

export type CurrentAccounting = {
  accountingId: number,
  seller: string,
  date: string,
  sellerId: number
}

export const getCurrentAccounting = (): CurrentAccounting | undefined => {
 
  const currentAccounting = Cookies.get('current-accounting')

  if (currentAccounting) {
    return JSON.parse(currentAccounting);
  }
}

export const setCurrentAccounting = (currentAccounting: CurrentAccounting): void => {
  Cookies.set('current-accounting', JSON.stringify(currentAccounting), { expires: 1 })
}

export const deleteAccounting = (): void => {
  Cookies.remove('current-accounting')
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

export const setIncomesRegistered = (incomes: IncomeRegistry[]): void => {
  const incomeRegs = Cookies.get('incomes-reg')

  if (!incomeRegs) {
    Cookies.set('incomes-reg', JSON.stringify(incomes))
  } 
}

export const getIncomesRegistered = (): IncomeRegistry[] | undefined => {
  const registered = Cookies.get('incomes-reg')
  
  if (registered) {
    return JSON.parse(registered)
  }
}

export const clearIncomesregistered = () => {
  Cookies.remove('incomes-reg')
}

export const setCheckMode = (mode: string) => {
  Cookies.set('check-mode', mode)
}

export const getCheckMode = (): string => {
  const mode = Cookies.get('check-mode')

  if (mode) {
    if (mode === 'CHECK_IN') {
      return 'CHECK_OUT'
    } else {
      return 'CHECK_IN'
    }
  } 
  return 'CHECK_IN'
}
const API = process.env.NEXT_PUBLIC_API_BASE_URL;

export type RequestStatus = {
  onLoading: boolean,
  onError: boolean,
  onSuccess: boolean
}

export const endPoints ={
  auth: {
    registration: `${API}/auth/register`,
    authentication: `${API}/auth/authenticate`
  },
  accountings: {
    getLastRegistries: (branchId: number) => `${API}/accounts/${branchId}`,
    getByDate: (initial: string, end: string, branchId: number) => `${API}/accounts/${initial}/${end}/${branchId}`,
    getAccounting: (accountingId: number) => `${API}/accounts/account/${accountingId}`,
    createAccounting: `${API}/accounts`
  },
  sellers: {
    getSeller: (sellerId: number) => `${API}/sellers/${sellerId}`,
    getSellers:  `${API}/sellers`,
    getSellersByBranch: (branchId: number) => `${API}/sellers/branch/${branchId}`,
    newSeller: `${API}/sellers`,
  },
  collections: {
    expenseTypes: `${API}/expenses-types`,
    incomeTypes: `${API}/income-types`,
  },
  expenses: {
    createExpense: `${API}/expenses`
  },
  incomes: {
    createIncome: `${API}/incomes`
  },
  branches: {
    branches: `${API}/branches`,
    getById: (branchId: number) => `${API}/branches/${branchId}`
  },
  cash: {
    withdrawals: `${API}/withdrawals`,
    getCashRegistries: (branch: string) => `${API}/withdrawals/${branch}`
  }
}
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
    createAccounting: `${API}/accounts`,
    createOutOfDateAccounting: `${API}/accounts/out-of-date`
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
    getById: (branchId: number) => `${API}/branches/${branchId}`,
    getBranchConfig: `${API}/branch-configuration`,
    updateBranchConfig: (branchConfigId: number) => `${API}/branch-configuration/${branchConfigId}`,
    getTotalBalance: (branchId: number) => `${API}/branches/balance/${branchId}`
  },
  cash: {
    withdrawals: `${API}/withdrawals`,
    getCashRegistries: (branch: string) => `${API}/withdrawals/${branch}`
  },
  providers: {
    op: `${API}/providers`
  },
  billing: {
    bills: `${API}/bills/`,
    saveAll: `${API}/bills/save-all`,
    all: (page: number) => `${API}/bills?page=${page}`,
    pending: (page: number) => `${API}/bills/pending?page=${page}`,
    getById: (billId: number) => `${API}/bills/${billId}`,
  }
}
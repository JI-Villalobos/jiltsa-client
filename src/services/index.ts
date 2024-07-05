const API = process.env.NEXT_PUBLIC_API_BASE_URL;

export type RequestStatus = {
  onLoading: boolean,
  onError: boolean,
  onSuccess: boolean
}

export const pendingRequest: RequestStatus = {
  onLoading: true,
  onError: false,
  onSuccess: false
}

export const failedRequest: RequestStatus = {
  onLoading: false,
  onError: true,
  onSuccess: false
}

export const initialStatus: RequestStatus = {
  onLoading: false,
  onError: false,
  onSuccess: false
}

export const successfullRequest: RequestStatus = {
  onLoading: false,
  onError: false,
  onSuccess: true
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
    createIncome: `${API}/incomes`,
    createIncomes: `${API}/incomes/all`
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
    getCashRegistries: (branch: string) => `${API}/withdrawals/all/${branch}`,
    getLastMonthCashwithrawalRegistries: (branch: string, page: number) => `${API}/withdrawals/last-month/${branch}?page=${page}`,
    getCurrentCashwithdrawalRegistries: (branch: string) => `${API}/withdrawals/current/${branch}`,
    getCashwithdrawalRegistriesByTagAndDateAfter: (branch: string, date: string, tag: string, page: number) => `${API}/withdrawals/latest/${branch}/${date}/${tag}?page=${page}`,
    getCashwithdrawalRegistriesByDateAfer: (branch: string, date: string, page: number) => `${API}/withdrawals/${branch}/since/${date}?page=${page}`
  },
  providers: {
    op: `${API}/providers`
  },
  billing: {
    bills: `${API}/bills`,
    saveAll: `${API}/bills/save-all`,
    all: (page: number) => `${API}/bills?page=${page}`,
    pending: (page: number) => `${API}/bills/pending?page=${page}`,
    getById: (billId: number) => `${API}/bills/${billId}`,
  },
  payment: {
    payment: `${API}/payments`,
    getTicket: `${API}/payments/ticket`
  },
  creditSales: {
    getById:(creditSaleId: number) => `${API}/credit-sale/get/${creditSaleId}`,
    getAll: (branchId: number) => `${API}/credit-sale/get-all/${branchId}`,
    getByPaymentStatus: (branchId: number, isPaid: boolean) => `${API}/credit-sale/get-by-status/${branchId}/${isPaid}`,
    mutate: `${API}/credit-sale`
  },
  partialPayments: {
    getById: (partialId: number) => `${API}/partials/${partialId}`,
    mutate: `${API}/partials`
  }
}
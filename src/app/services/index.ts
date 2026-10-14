import Cookies from "js-cookie";

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Request options with the current session token, read at call time
 * so the header is never stale after a login/logout.
 */
export const authOptions = () => ({
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Cookies.get('token')}`
  }
})

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

export const endPoints = {
  auth: {
    registration: `${API}/auth/register`,
    authentication: `${API}/auth/authenticate`
  },
  accountings: {
    getLastRegistries: (branchId: number) => `${API}/accounts/${branchId}`,
    getByDate: (initial: string, end: string, branchId: number, page: number) => `${API}/accounts/range?initial=${encodeURIComponent(initial)}&end=${encodeURIComponent(end)}&branchId=${branchId}&page=${page}`,
    getAccounting: (accountingId: number) => `${API}/accounts/account/${accountingId}`,
    createAccounting: `${API}/accounts`,
    createOutOfDateAccounting: `${API}/accounts/out-of-date`
  },
  sellers: {
    getSeller: (sellerId: number) => `${API}/sellers/${sellerId}`,
    getSellers: `${API}/sellers`,
    getSellersByBranch: (branchId: number) => `${API}/sellers/branch/${branchId}`,
    newSeller: `${API}/sellers`,
  },
  collections: {
    expenseTypes: `${API}/expenses-types`,
    incomeTypes: `${API}/income-types`,
  },
  expenses: {
    createExpense: `${API}/expenses`,
    getExpenses: (accountingId: number) => `${API}/expenses/${accountingId}`
  },
  incomes: {
    createIncome: `${API}/incomes`,
    createIncomes: `${API}/incomes/all`,
    getByAccounting: (accountingId: number) => `${API}/incomes/${accountingId}`
  },
  branches: {
    branches: `${API}/branches`,
    getById: (branchId: number) => `${API}/branches/${branchId}`,
    getBranchConfig: `${API}/branch-configuration`,
    updateBranchConfig: `${API}/branch-configuration`,
    getTotalBalance: (branchId: number) => `${API}/branches/balance/${branchId}`
  },
  cash: {
    withdrawals: `${API}/withdrawals`,
    getCashRegistries: (branchId: number) => `${API}/withdrawals/all/${branchId}`,
    getLastMonthCashwithrawalRegistries: (branchId: number, page: number) => `${API}/withdrawals/last-month/${branchId}?page=${page}`,
    getCurrentCashwithdrawalRegistries: (branchId: number) => `${API}/withdrawals/current/${branchId}`,
    getCashwithdrawalRegistriesByTagAndDateRange: (branchId: number, start: string, finish: string, tag: string, page: number) => `${API}/withdrawals/latest/${branchId}/${start}/to/${finish}/${tag}?page=${page}`,
    getCashwithdrawalRegistriesByDateRange: (branchId: number, start: string, finish: string, page: number) => `${API}/withdrawals/${branchId}/since/${start}/to/${finish}?page=${page}`
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
    getById: (creditSaleId: number) => `${API}/credit-sale/get/${creditSaleId}`,
    getAll: (branchId: number) => `${API}/credit-sale/get-all/${branchId}`,
    getByPaymentStatus: (branchId: number, isPaid: boolean) => `${API}/credit-sale/get-by-status/${branchId}/${isPaid}`,
    mutate: `${API}/credit-sale`
  },
  partialPayments: {
    getById: (partialId: number) => `${API}/partials/${partialId}`,
    mutate: `${API}/partials`
  },
  checkList: {
    getById: (checkListId: number) => `${API}/check-list/${checkListId}`,
    mutate: `${API}/check-list`
  },
  cashSorting: {
    getCashSorting: (accountingId: number) => `${API}/cash-sorting/accounting/${accountingId}`,
    mutate: `${API}/cash-sorting`
  },
  orders: {
    mutate: `${API}/orders`,
    getById: (orderId: number) => `${API}/orders/${orderId}`,
    getOrders: (branchId: number) => `${API}/orders/by-branch/${branchId}`
  },
  orderItems: {
    base: `${API}/order-items`,
    saveAll: `${API}/order-items/save-all`
  },
  operativeExpenses: {
    mutate: `${API}/operative-expense`,
    getExpenses: (branchId: number, date: string) => `${API}/operative-expense/get-expenses?branchId=${branchId}&date=${encodeURIComponent(date)}`
  }
}
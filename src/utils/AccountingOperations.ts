import { Accounting } from "@/services/api/accounts"
import { ExpenseRegistry } from "@/services/api/expenses"
import { IncomeRegistry } from "@/services/api/incomes"
import { Income } from "./variables"

export type RowData = {
  otherIncomes: string
  incomes: string,
  total: string,
  expenses: string
}


const formatAmount = (amount: number): string => {
  const formatter = new Intl.NumberFormat('ex-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0
  })

  return formatter.format(amount)
}

 const getIncome = (incomes: IncomeRegistry[], tag: string): string => {
  const income = incomes.find(item => item.tag === tag)

  if(income){
    return formatAmount(income.amount)
  }else {
    return '-'
  }
}

 const calculateTotalIncomes = (incomes: IncomeRegistry[]): string => {
  if (incomes.length === 0) {
    return '-'
  }
  const totalIncomes: number = incomes.map(income => income.amount).reduce((result, value) => result + value)

  if(totalIncomes){
    return formatAmount(totalIncomes)
  } else {
    return '-'
  }
}

 const calculateTotalExpenses = (expenses: ExpenseRegistry[]): string => {
  if (expenses.length === 0) {
    return '-'
  }
  const totalExpenses: number = expenses.map(expense => expense.amount).reduce((result, value) => result + value)  

  if(totalExpenses){
    return formatAmount(totalExpenses)
  } else {
    return '-'
  }
}

export const formatRowData = (accounting: Accounting): RowData => {
  const incomes: IncomeRegistry[] = accounting.incomeRegistries
  const expenses: ExpenseRegistry[] = accounting.expenseRegistries
  const rowData: RowData =  {
    incomes: getIncome(accounting.incomeRegistries, Income.PRONTIPAGOS),
    otherIncomes: getIncome(accounting.incomeRegistries, Income.MEDICAMENTO),
    total: calculateTotalIncomes(incomes),
    expenses: calculateTotalExpenses(expenses),
  }
  
  return rowData
}


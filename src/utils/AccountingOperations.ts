import { Income } from "./variables"
import { formatAmount } from "./formatAmount"
import { IncomeRegistry } from "@/app/services/api/incomes"
import { ExpenseRegistry } from "@/app/services/api/expenses"
import { Accounting } from "@/app/services/api/accounts"

export type RowData = {
  otherIncomes: string
  incomes: string,
  total: string,
  expenses: string
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


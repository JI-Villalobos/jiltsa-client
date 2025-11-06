import { ExpenseStages } from "@/utils/variables"
import { CreateExpenseRegistry, ExpenseRegistry } from "../services/api/expenses"
import { create } from "zustand"

type State = {
  stage: ExpenseStages
  expense: CreateExpenseRegistry
}

type Action = {
  setStage: (stage: ExpenseStages) => void
  setExpense: (expense: ExpenseRegistry) => void
}

const defaultExpense: CreateExpenseRegistry = {
  amount: 0,
  accountingId: 0,
  description: '',
  expenseTypeId: 0
}

export const useExpenseRegistryStore = create<State & Action>((set) => ({
  stage: ExpenseStages.SELECT_EXPENSE_TYPE,
  expense: defaultExpense,
  setStage: (stage: ExpenseStages) => set(() => ({ stage: stage })),
  setExpense: (expense: ExpenseRegistry) => set(() => ({ expense: expense }))
}))




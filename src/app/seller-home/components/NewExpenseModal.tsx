'use client'

import { useExpenseRegistryStore } from "@/app/store/useExpenseRegistryStore"
import { ExpenseStages } from "@/utils/variables"
import { ExpenseTypeSelectionStage } from "./ExpenseTypeSelectionStage"
import { ProviderSelectionstage } from "./ProviderSelectionStage"

export const NewExpenseModal = () => {
  const { stage } = useExpenseRegistryStore()

  return (
    <>
      {stage === ExpenseStages.SELECT_EXPENSE_TYPE && <ExpenseTypeSelectionStage />}
      {stage === ExpenseStages.PROVIDER_SELECTION && <ProviderSelectionstage />}
    </>
  )
}
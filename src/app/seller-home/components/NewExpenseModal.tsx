'use client'

import { useExpenseRegistryStore } from "@/app/store/useExpenseRegistryStore"
import { ExpenseStages } from "@/utils/variables"
import { ExpenseTypeSelectionStage } from "./ExpenseTypeSelectionStage"
import { ProviderSelectionstage } from "./ProviderSelectionStage"
import { FinalizeExpenseRegistry } from "./FinalizeExpenseRegistry"

export const NewExpenseModal = () => {
  const { stage } = useExpenseRegistryStore()

  return (
    <>
      {stage === ExpenseStages.SELECT_EXPENSE_TYPE && <ExpenseTypeSelectionStage />}
      {stage === ExpenseStages.PROVIDER_SELECTION && <ProviderSelectionstage />}
      {stage === ExpenseStages.FINALIZE_EXPENSE_REGISTRY && <FinalizeExpenseRegistry />}
    </>
  )
}
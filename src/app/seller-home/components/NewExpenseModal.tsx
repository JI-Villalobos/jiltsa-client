'use client'

import { useExpenseRegistryStore } from "@/app/store/useExpenseRegistryStore"
import { ExpenseStages } from "@/utils/variables"
import { ExpenseTypeSelectionStage } from "./ExpenseTypeSelectionStage"
import { ProviderSelectionstage } from "./ProviderSelectionStage"
import { FinalizeExpenseRegistry } from "./FinalizeExpenseRegistry"
import { ServiceSelectionStage } from "./ServiceSelectionStage"
import { SalaryExpenseSelectionStage } from "./SalaryExpenseSelectionStage"
import { OtherExpenseRegistry } from "./OtherExpenseRegistry"

export const NewExpenseModal = () => {
  const { stage } = useExpenseRegistryStore()

  return (
    <>
      {stage === ExpenseStages.SELECT_EXPENSE_TYPE && <ExpenseTypeSelectionStage />}
      {stage === ExpenseStages.PROVIDER_SELECTION && <ProviderSelectionstage />}
      {stage === ExpenseStages.SERVICE_SELECTION && <ServiceSelectionStage />}
      {stage === ExpenseStages.SELLER_SELECTION && <SalaryExpenseSelectionStage />}
      {stage === ExpenseStages.OTHER_EXPENSE_REGSTRY && <OtherExpenseRegistry />}
      {stage === ExpenseStages.FINALIZE_EXPENSE_REGISTRY && <FinalizeExpenseRegistry />}
    </>
  )
}
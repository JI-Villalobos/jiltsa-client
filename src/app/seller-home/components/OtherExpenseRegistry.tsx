'use client'

import { failedRequest, initialStatus, pendingRequest, successfullRequest } from "@/app/services"
import { createExpense } from "@/app/services/api/expenses"
import { defaultExpense, useExpenseRegistryStore } from "@/app/store/useExpenseRegistryStore"
import { getCurrentAccounting } from "@/utils/appStorage"
import { formatAmount } from "@/utils/formatAmount"
import { ExpenseStages } from "@/utils/variables"
import { useEffect, useState } from "react"
import { LuArrowLeftFromLine, LuLoaderCircle } from "react-icons/lu"

export const OtherExpenseRegistry = () => {
  const [currentAccounting, setCurrentAccounting] = useState<number>()
  const [expenseRegistrystatus, setExpenseRegistrystatus] = useState(initialStatus)

  const { expense, setExpense, setStage, setUpdateFlag } = useExpenseRegistryStore()

  useEffect(() => {
    const accounting = getCurrentAccounting()
    if (accounting) {
      setCurrentAccounting(accounting.accountingId)
      setExpense({ ...expense, accountingId: accounting.accountingId })
    }

  }, [])

  const handleExpenseRegistry = async () => {
    if (expense.accountingId && expense.amount > 0 && expense.description.length > 0) {
      setExpenseRegistrystatus(pendingRequest)
      await createExpense(expense)
        .then(() => {
          setExpenseRegistrystatus(successfullRequest)
          setExpense(defaultExpense)
          setUpdateFlag()
          setTimeout(() => {
            setStage(ExpenseStages.SELECT_EXPENSE_TYPE)
          }, 2000)
          setExpenseRegistrystatus(pendingRequest)
        })
        .catch(() => {
          setExpenseRegistrystatus(failedRequest)
        })
    }
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="p-1 rounedd w-2/3 shadow flex flex-col items-center justify-center text-left">
        <p className="text-sm text-mp-dark">Corte: <span className="text-mp-blue">{currentAccounting}</span></p>
        <p className="text-sm text-mp-dark">Concepto: <span className="text-mp-blue">{expense.description}</span></p>
        <p className="text-sm text-mp-dark">Monto: <span className="text-mp-green">{formatAmount(expense.amount)}</span></p>
      </div>
      <div className="flex flex-col items-center justify-center mt-4 mb-4 w-full">
        <label htmlFor="" className="text-center text-sm text-mp-dark">Concepto</label>
        <input
          type="text"
          placeholder="Cocepto del gasto"
          className="p-2 rounded shadow w-1/3 text-mp-green text-center"
          onChange={(e) => setExpense({ ...expense, description: e.currentTarget.value })}
        />
        <label htmlFor="" className="text-center text-sm text-mp-dark">Monto</label>
        <input
          type="number"
          placeholder="0.00"
          className="p-2 rounded shadow w-1/3 text-mp-green text-center"
          onChange={(e) => setExpense({ ...expense, amount: parseFloat(e.currentTarget.value) })}
        />
        <button
          className="p-2 text-mp-white bg-gradient-to-r from-mp-green to-mp-blue mt-2 w-28 rounded shadow flex items-center justify-center"
          onClick={handleExpenseRegistry}
        >
          {expenseRegistrystatus.onLoading ? <LuLoaderCircle className="animate-spin" /> : 'Confirmar'}
        </button>
      </div>
      <div className="w-full mb-4 flex items-center justify-center">
        <button
          className="flex flex-row items-center justify-center p-2 rounded shadow hover:text-mp-green text-mp-dark"
          onClick={() => setStage(ExpenseStages.SELECT_EXPENSE_TYPE)}
        >
          <LuArrowLeftFromLine className="mr-2" />
          Regresar
        </button>
      </div>
    </div>
  )
}
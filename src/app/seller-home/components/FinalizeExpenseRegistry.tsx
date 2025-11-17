'use client'

import { useExpenseRegistryStore } from "@/app/store/useExpenseRegistryStore"
import { getCurrentAccounting } from "@/utils/appStorage"
import { formatAmount } from "@/utils/formatAmount"
import { useEffect, useState } from "react"

export const FinalizeExpenseRegistry = () => {
  const [currentAccounting, setCurrentAccounting] = useState<number>()
  const { expense, setExpense } = useExpenseRegistryStore()

  useEffect(() => {
    const accounting = getCurrentAccounting()
    if (accounting) {
      setCurrentAccounting(accounting.accountingId)
      setExpense({ ...expense, accountingId: accounting.accountingId })
    }

  }, [])

  const handleExpenseRegistry = async () => {
    await console.log(expense);
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="p-1 rounedd w-2/3 shadow flex flex-col items-center justify-center text-left">
        <p className="text-sm text-mp-dark">Corte: <span className="text-mp-blue">{currentAccounting}</span></p>
        <p className="text-sm text-mp-dark">Concepto: <span className="text-mp-blue">{expense.description}</span></p>
        <p className="text-sm text-mp-dark">Monto: <span className="text-mp-green">{formatAmount(expense.amount)}</span></p>
      </div>
      <div className="flex flex-col items-center justify-center mt-4 mb-4 w-full">
        <label htmlFor="" className="text-center text-sm text-mp-dark">Monto</label>
        <input
          type="number"
          placeholder="0.00"
          className="p-2 rounded shadow w-1/3 text-mp-green text-center"
          onChange={(e) => setExpense({ ...expense, amount: parseFloat(e.currentTarget.value) })}
        />
        <button
          className="p-2 text-mp-white bg-gradient-to-r from-mp-green to-mp-blue mt-2 w-28 rounded shadow"
          onClick={handleExpenseRegistry}
        >
          Confirmar
        </button>
      </div>
    </div>
  )
}
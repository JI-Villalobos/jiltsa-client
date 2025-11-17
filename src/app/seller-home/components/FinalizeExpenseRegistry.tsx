'use client'

import { getCurrentAccounting } from "@/utils/appStorage"
import { useEffect, useState } from "react"

export const FinalizeExpenseRegistry = () => {
  const [currentAccounting, setCurrentAccounting] = useState<number>()

  useEffect(() => {
    const accounting = getCurrentAccounting()
    if (accounting) {
      setCurrentAccounting(accounting.accountingId)
    }

  }, [])

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div>

      </div>
      <div className="flex flex-col items-center justify-center mt-4 mb-4 w-full">
        <label htmlFor="" className="text-center text-sm text-mp-dark">Monto</label>
        <input type="number" placeholder="0.00" className="p-2 rounded shadow w-1/3 text-mp-green" />
        <button
          className="p-2 text-mp-white bg-gradient-to-r from-mp-green to-mp-blue mt-2 w-28 rounded shadow"
        >
          Confirmar
        </button>
      </div>
    </div>
  )
}
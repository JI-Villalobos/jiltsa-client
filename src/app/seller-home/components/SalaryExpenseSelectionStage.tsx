'use client'

import { failedRequest, initialStatus, pendingRequest, successfullRequest } from "@/app/services"
import { CreateExpenseRegistry } from "@/app/services/api/expenses"
import { getSellerByBranch, Seller } from "@/app/services/api/sellers"
import { useExpenseRegistryStore } from "@/app/store/useExpenseRegistryStore"
import { ExpenseStages } from "@/utils/variables"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { LuArrowLeftFromLine, LuLoaderCircle, LuUserRound } from "react-icons/lu"

export const SalaryExpenseSelectionStage = () => {
  const [status, setStatus] = useState(initialStatus)
  const [sellers, setSellers] = useState<Seller[]>([])

  const { expense, setExpense, setStage } = useExpenseRegistryStore()

  useEffect(() => {
    const branch = Cookies.get('branchId')
    setStatus(pendingRequest)
    if (branch) {
      const branchId: number = parseInt(branch)
      getSellerByBranch(branchId).then((result: Seller[]) => {
        setSellers(result)
        setStatus(successfullRequest)
      }).catch(() => {
        setStatus(failedRequest)
      })
    }
  }, [])

  const handleStage = (seller: string) => {
    const salary = `SUELDO DE ${seller}`
    const updatedExpense: CreateExpenseRegistry = { ...expense, description: salary }
    setExpense(updatedExpense)
    setStage(ExpenseStages.FINALIZE_EXPENSE_REGISTRY)
  }

  return (
    <div className="mb-4 flex flex-col items-center justify-center">
      <p className="text-mp-green text-sm mb-4">A quien corresponse el pago de sueldo?</p>
      {
        status.onLoading ? <LuLoaderCircle className="animate-spin text-mp-green" size={30} />
          : sellers.map(seller => (
            <button
              className="w-full rounded-lg text-center align-middle 
                              text-xs font-medium text-mp-blue transition-all 
                              hover:bg-gradient-to-r from-mp-green to-mp-blue hover:text-mp-white p-2 flex flex-row items-center 
                              justify-center border border-opacity-60 mb-4"
              type="button"
              disabled={status.onLoading}
              onClick={() => handleStage(seller.fullName)}
              key={seller.id}
            >
              <LuUserRound />
              {seller.fullName}
            </button>
          ))
      }
      <div className="w-full mb-4 flex items-center justify-center">
        <button
          className="flex flex-row items-center justify-center p-2 rounded shadow hover:text-mp-green text-mp-dark"
          onClick={() => setStage(ExpenseStages.SELECT_EXPENSE_TYPE)}
        >
          <LuArrowLeftFromLine className="mr-2" />
          Regresar
        </button>
      </div>
    </div >
  )
}
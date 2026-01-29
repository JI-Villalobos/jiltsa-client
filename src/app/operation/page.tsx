'use client'

import SessionInfo from "@/app/components/SessionInfo";
import Layout from "@/app/layouts/Layout";
import { getCurrentAccounting } from "@/utils/appStorage";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { LuReceipt } from "react-icons/lu";
import { defaultExpense, useExpenseRegistryStore } from "../store/useExpenseRegistryStore";
import Modal from "../components/shared/Modal";
import { ExpenseStages } from "@/utils/variables";
import { NewExpenseModal } from "../seller-home/components/NewExpenseModal";
import { ExpenseRegistry, getExpenses } from "../services/api/expenses";
import { failedRequest, initialStatus, pendingRequest, successfullRequest } from "../services";
import Spinner from "../components/shared/Spinner";
import ErrorMessage from "../components/shared/ErrorMessage";
import { formatAmount } from "@/utils/formatAmount";

export default function Operation(): JSX.Element {
  const [expenses, setExpenses] = useState<ExpenseRegistry[]>([])
  const [loadExpensesStatus, setLoadExpensesStatus] = useState(initialStatus)
  const [showExpenseModal, setShowExpenseModal] = useState(false)

  const { setExpense, setStage, updateFlag } = useExpenseRegistryStore()

  const router = useRouter()

  useEffect(() => {
    const accounting = getCurrentAccounting()

    if (!accounting) {
      router.push('/seller-home')
    } else {
      setLoadExpensesStatus(pendingRequest)
      getExpenses(accounting.accountingId)
        .then((res) => {
          setExpenses(res)
          setLoadExpensesStatus(successfullRequest)
        })
        .catch(() => {
          setLoadExpensesStatus(failedRequest)
        })
    }
  }, [updateFlag])


  return (
    <Layout>
      <SessionInfo />
      <div className="w-full flex flex-row items-center justify-center gap-4 mb-2">
        <p className="text-sm text-mp-dark">Gastos registrados en el turno actual</p>
        <button
          className="rounded p-2 bg-mp-green text-mp-white text-sm flex flex-row items-center transition-all hover:bg-mp-light-green"
          onClick={() => setShowExpenseModal(true)}
        >
          <LuReceipt />
          Nuevo Gasto
        </button>
      </div>
      <div className="w-full flex flex-col items-center justify-center gap-2">
        {
          loadExpensesStatus.onLoading ? <Spinner bgBlank /> :
            loadExpensesStatus.onError ? <ErrorMessage title="Error" description="No fue posible cargar los gastos del periodo" /> :
              expenses.length === 0 ? <p className="text-sm text-mp-dark">No hay gastos registrados en este turno</p> :
                expenses.map((expense) => (
                  <div key={expense.id} className="w-11/12 md:w-3/4 lg:w-1/2 rounded border-s-4 border-mp-green bg-mp-white shadow-md gap-4 p-4 flex flex-row justify-between items-center">
                    <p className="text-mp-dark font-coda text-sm">Corte: <span className="text-mp-blue">{expense.accountingId}</span></p>
                    <p className="text-mp-dark font-coda text-sm">Descripción: <span className="text-mp-blue">{expense.description}</span></p>
                    <p className="text-mp-dark font-coda text-sm">Monto: <span className="text-mp-blue">{formatAmount(expense.amount)}</span></p>
                  </div>
                ))
        }
      </div>
      {
        showExpenseModal &&
        <Modal onClose={() => {
          setExpense(defaultExpense)
          setStage(ExpenseStages.SELECT_EXPENSE_TYPE)
          setShowExpenseModal(false)
        }}>
          <NewExpenseModal />
        </Modal>
      }
    </Layout>
  )
}
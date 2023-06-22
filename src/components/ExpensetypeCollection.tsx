import { RequestStatus } from "@/services"
import { ExpenseType, ExpenseTypeDto, createExpenseType, getExpenseTypes } from "@/services/api/collections"
import React, { useEffect, useState } from "react"
import Spinner from "./Spinner"
import { useRouter } from "next/router"

export default function ExpenseTypeCollection(): JSX.Element {
  const [status, setStatus] = useState<RequestStatus>({ onError: false, onLoading: false, onSuccess: false })
  const [expenses, setExpenses] = useState<ExpenseType[]>([])
  const [newExpense, setNewExpense] = useState<string>('')

  const router = useRouter()

  useEffect(() => {
    setStatus({...status, onLoading: true})
      getExpenseTypes()
        .then((result) => {
          setExpenses(result)
          setStatus({...status, onLoading: false})
        })
        .catch(() => {
          setStatus({...status, onError: true})
        })
  }, [])

  const handleNewExpenseType = async (e: React.FormEvent<HTMLButtonElement>) => {
    setStatus({...status, onLoading: true})
    e.preventDefault()

    await createExpenseType({type: newExpense})
      .then(() => {
        setStatus({...status, onLoading: false})
        router.reload()
      })
      .catch(() => {
        setStatus({...status, onError: true})
      })
  }

  return (
    <div className="flex flex-row items-start w-8/12 border-b-2 border-mp-strong-gray mt-4">
      {
        status.onLoading ? <Spinner bgBlank /> : (
          <div className="flex flex-col w-1/2 mb-6">
            <p className="font-coda text-xl font-medium text-mp-green mb-4">Tipos de Gasto</p>
            {
              expenses.map((expense) => (
                <input 
                  type="text" 
                  disabled 
                  value={expense.type} 
                  className="w-2/3 bg-mp-strong-gray mb-2 rounded text-center text-mp-dark" 
                  key={`expense-type-id-${expense.id}`}
                />
              ))
            }
          </div>
        )
      }
      <div className="flex flex-col w-1/2 items-center justify-center h-full mb-4
      6">
        <input 
          type="text" 
          placeholder="Nuevo Tipo de gasto" 
          className="w-2/3 bg-mp-strong-gray mb-2 rounded text-center text-mp-dark outline-none" 
          onChange={(e: React.FormEvent<HTMLInputElement>) => setNewExpense(e.currentTarget.value)}
        />
        <button 
          className="bg-mp-dark text-mp-gray-soft rounded w-16"
          onClick={handleNewExpenseType}
        >
          {
            status.onLoading ? <Spinner /> : 'Crear'
          }
        </button>
      </div>
    </div>
  )
}
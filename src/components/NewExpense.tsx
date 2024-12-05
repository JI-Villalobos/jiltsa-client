import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react"
import { ExpenseType, getExpenseTypes } from "@/services/api/collections"
import { RequestStatus, failedRequest, initialStatus, pendingRequest, successfullRequest } from "@/services"
import Spinner from "./Spinner"
import { CreateExpenseRegistry, createExpense } from "@/services/api/expenses"
import { CurrentAccounting, getCurrentAccounting, setStoredExpenseRegistry } from "@/utils/appStorage"
import { STAGES } from "./Expenses"

interface Props {
  setStage: Dispatch<SetStateAction<number>>
  accountingId?: number
}

export default function NewExpense({ setStage, accountingId }: Props): JSX.Element {
  const [selectedItem, setSelectedItem] = useState<ExpenseType>({ id: 0, type: '' })
  const [description, setDescription] = useState<string>(selectedItem.type)
  const [expenseTypes, setExpenseTypes] = useState<ExpenseType[]>([])
  const [status, setStatus] = useState<RequestStatus>(initialStatus)
  const [amount, setAmount] = useState<number>(0)
  const [currentAccount, setCurrentAccount] = useState<CurrentAccounting>({ accountingId: 0, seller: '', date: '', sellerId: 0 })

  useEffect(() => {
    const accounting = getCurrentAccounting()
    if (accounting) {
      setCurrentAccount(accounting)
    } else if (accountingId) {
      setCurrentAccount({...currentAccount, accountingId: accountingId})
    }
    getExpenseTypes()
      .then((result) => {
        setExpenseTypes(result)
        setStatus(successfullRequest)
      })
      .catch(() => {
        setStatus(failedRequest)
      })
  }, [])

  const handleNewExpense = async (e: React.FormEvent<HTMLButtonElement>) => {
    setStatus(pendingRequest)
    e.preventDefault()

    const expense: CreateExpenseRegistry = {
      accountingId: currentAccount.accountingId,
      amount: amount,
      expenseTypeId: selectedItem.id,
      description: description
    }

    if (amount > 0 && selectedItem.id > 0) {
      await createExpense(expense)
      .then((result) => {
        setStatus(successfullRequest)
        setTimeout(() => {
          setStage(STAGES.SUCCESS)
          setStoredExpenseRegistry(result)
        }, 2000)
        setStatus(pendingRequest)
      })
      .catch(() => {
        setStatus(failedRequest)
      })
    } else {
      setStatus(failedRequest)
    }
  }

  const handleSelectedExpenseType = (id: number) => {
    const expenseType = expenseTypes.find((type) => type.id == id)
    if (expenseType) {
      setSelectedItem(expenseType)
      setDescription(expenseType.type)
    }
  }

  return (
    <form action="#" className="mb-0 mt-2 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 flex flex-col items-center">
      <h1 className="text-center text-2xl font-bold text-mp-blue sm:text-3xl">Registrar Gasto</h1>

      <p className="mx-auto mt-4 max-w-md text-center text-mp-soft-dark">
        Recuerda indicar el tipo de gasto, por favor no combines más de un gasto en un mismo registro
      </p>

      <div className="w-full">
        <label htmlFor="text" className="text-mp-strong-gray">Tipo de gasto</label>
        <select
          name="expenseType"
          id="expenseType"
          className="w-full rounded-lg border border-mp-gray-soft p-4 text-gray-700 sm:text-sm"
          onChange={(e: ChangeEvent<HTMLSelectElement>) => handleSelectedExpenseType(parseInt(e.currentTarget.value))}
        >
          <option value="">Seleciona el tipo de gasto</option>
          {
            expenseTypes.map((expenseType) => <option value={expenseType.id} key={`ex-type-${expenseType.id}`}>{expenseType.type}</option>)
          }
        </select>
      </div>

      <div className="w-full">
        <label htmlFor="text" className="text-mp-strong-gray">Concepto</label>

        <div className="relative">
          <input
            type="text"
            className="w-full rounded-lg border border-mp-gray-soft p-4 pe-12 text-sm shadow-sm"
            placeholder="Concepto"
            defaultValue={selectedItem.type}
            onChange={(e: React.FormEvent<HTMLInputElement>) => setDescription(e.currentTarget.value)}
          />

          <span className="absolute inset-y-0 end-0 grid place-content-center px-4">

          </span>
        </div>
      </div>

      <div className="flex flex-row justify-center items-center">
        <p className="text-mp-green mr-2">Monto $</p>
        <div className="">
          <input
            type="number"
            className="rounded-lg border border-mp-gray-soft p-4 text-sm text-mp-green shadow-sm"
            placeholder="0.00"
            onChange={(e: React.FormEvent<HTMLInputElement>) => setAmount(parseFloat(e.currentTarget.value))}
          />
        </div>
      </div>

      <button
        type="submit"
        className="block w-1/2 rounded-lg bg-mp-dark px-3 py-4 text-mp-gray-soft text-sm font-medium text-white"
        onClick={handleNewExpense}
      >
        {
          status.onLoading
            ? <Spinner />
            : 'Registrar >>'
        }
      </button>
      {
        status.onError &&
        <p className="text-center text-sm text-mp-error p-1">
          Error al registrar el gasto: Revisa que los datos sean correctos
        </p>
      }
    </form>
  )
}
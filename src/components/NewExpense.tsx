import React, { ChangeEvent, useEffect, useState } from "react"
import ExpenseDetail from "./ExpenseDetail"
import ExpenseTicket from "./ExpenseTicket"
import { ExpenseType, getExpenseTypes } from "@/services/api/collections"
import { RequestStatus, failedRequest, initialStatus, pendingRequest, successfullRequest } from "@/services"
import Spinner from "./Spinner"
import ExpenseTypeItem from "./ExpenseTypeItem"
import { CreateExpenseRegistry, createExpense } from "@/services/api/expenses"
import { CurrentAccounting, getCurrentAccounting, setStoredExpenseRegistry, initialExpenseRegistry } from "@/utils/appStorage"
import { useRouter } from "next/router"

export default function NewExpense(): JSX.Element {
  const [selectedItem, setSelectedItem] = useState<ExpenseType>({id: 0, type: ''})
  const [description, setDescription] = useState<string>(selectedItem.type)
  const [expenseTypes, setExpenseTypes] = useState<ExpenseType[]>([])
  const [successTransition, setSuccessTransition] = useState<boolean>(false)
  const [status, setStatus] = useState<RequestStatus>(initialStatus)
  const [amount, setAmount] = useState<number>(0)
  const [currentAccount, setCurrentAccount] = useState<CurrentAccounting>({ accountingId: 0, seller: '' })

  useEffect(() => {
    const accounting = getCurrentAccounting()
    if (accounting) {
      setCurrentAccount(accounting)
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

    await createExpense(expense)
      .then((result) => {
        setStatus(successfullRequest)
        setTimeout(() => {
          setSuccessTransition(false)
        }, 2000)
        setSuccessTransition(true)
        setStoredExpenseRegistry(result)
      })
      .catch(() => {
        setStatus(failedRequest)
      })
  }

  const handleSelectedExpenseType = (id: number) => {
      const expenseType = expenseTypes.find((type) => type.id == id)
      if(expenseType){
        setSelectedItem(expenseType)
        setDescription(expenseType.type)
      }
  }

  return (
    <form action="#" className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 w-1/2 flex flex-col items-center">
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
            : 'Continuar >>'
        }
      </button>
    </form>
  )
}

/**
 * <div className="flex flex-col items-center w-full">
      <div className="flex flex-row w-full">
        <div className=" flex flex-col w-1/3 justify-center items-center border-r-2 border-mp-strong-gray">
          <p className="text-sm text-mp-dark font-coda">{selectedItem ? 'Gasto seleccionado:' : 'Selecciona el tipo de gasto:'}</p>
          {
            status.onLoading ? <Spinner bgBlank />
              : status.onError ? <p className="text-sm text-mp-error font-coda">No fue Posible Cargar los tipos de gastos</p>
                : selectedItem ? <p className="text-xl text-mp-dark font-coda">{item}</p>
                  : expenseTypes.map((expenseType) => (
                    <ExpenseTypeItem
                      expenseType={expenseType}
                      key={`expense-type-id-${expenseType.id}`}
                      expense={setExpense}
                      expenseDetails={expense}
                      isSelected={setSelectedItem}
                      item={setItem}
                    />
                  ))
          }
        </div>
        {
          successTransition ? (
            <div className="flex flex-col justify-center items-center w-1/3">
              <p className="text-sm text-mp-light-green font-coda text-center">Registro exitoso, redireccionando</p>
              <Spinner bgBlank />
            </div>)
            : (<ExpenseDetail expenseDetails={expense} expense={setExpense} />)
        }

        <ExpenseTicket currentAccounting={currentAccount} expense={expense} />
      </div>
      <button
        className="bg-mp-dark rounded text-mp-gray-soft w-32 mb-6"
        onClick={handleNewExpense}
        disabled={status.onLoading}
      >
        {status.onLoading ? <Spinner /> : 'Registrar'}
      </button>
      {status.onError && (<p className="text-sm text-mp-error font-coda text-center">No fue posible registrar el gasto, revisa que los daos sean correctos</p>)}
    </div>
 */
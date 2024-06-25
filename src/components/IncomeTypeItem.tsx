import { RequestStatus, failedRequest, initialStatus, pendingRequest, successfullRequest } from "@/services"
import { IncomeType } from "@/services/api/collections"
import { CreateIncomeRegistry, IncomeRegistry, createIncome } from "@/services/api/incomes"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import Spinner from "./Spinner"

type Props = {
  incomeType: IncomeType,
  accountingId: number
  disabled: Dispatch<SetStateAction<boolean>>
}

/**
 * 
 * @deprecated
 * this component is a candidate to be removed in future versions
 * 
 */
export default function IncomeTypeItem({ incomeType, accountingId, disabled }: Props): JSX.Element {
  const [status, setStatus] = useState<RequestStatus>(initialStatus)
  const [amount, setAmount] = useState<number>(0)
  const [incomeRegistry, setIncomeRegistry] = useState<IncomeRegistry | undefined>()

  const handleNewIncome = async (e: React.FormEvent<HTMLButtonElement>) => {
    setStatus(pendingRequest)
    const income: CreateIncomeRegistry = {
      accountingId,
      incomeTypeId: incomeType.id,
      tag: incomeType.type,
      amount
    }
    e.preventDefault()

    await createIncome(income)
      .then((result) => {
        setIncomeRegistry(result)
        setStatus(successfullRequest)
        disabled(false)
      })
      .catch(() => {
        setStatus(failedRequest)
      })
  }

  return (
    <>
      {
        status.onLoading 
        ? 
          <div className="flex flex-col justify-center items-center w-1/2 m-4">
            <Spinner bgBlank />
          </div>
        : status.onSuccess 
          ? 
            <div className="flex flex-col m-1 justify-center items-center w-1/2 rounded-xl border border-mp-soft-dark  p-4 mt-6">
              <strong  className="block font-medium text-mp-green">Ingreso Añadido exitosamente</strong  >
              <p className="text-mp-dark m-1 text-sm">{incomeRegistry?.tag}</p>
              <p className="text-mp-dark m-1 text-sm">Monto: $<span className="text-mp-blue">{incomeRegistry?.amount}</span></p>
            </div>
          
        : status.onError 
          ? <p className="text-mp-error m-2">Ocurrio un Error al Registrar el ingreso</p>
        : 
            <div className="flex flex-col justify-center items-center w-full m-4">
              <label htmlFor="text" className="text-mp-soft-dark">{incomeType.type}</label>
              <input
                  type="number"
                  name=""
                  className="border text-center text-mp-dark rounded m-2 w-1/2 border-mp-dark p-4 pe-12 text-sm shadow-sm"
                  onChange={(e: React.FormEvent<HTMLInputElement>) => setAmount(parseInt(e.currentTarget.value))}
              />
              <button
                  className="bg-mp-dark text-mp-gray-soft rounded border-none hover:cursor-pointer p-2"
                  onClick={handleNewIncome}
              >
                  Confirmar
              </button>
            </div>
      }
    </>
  )
}
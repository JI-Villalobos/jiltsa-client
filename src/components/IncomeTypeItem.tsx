import { RequestStatus } from "@/services"
import { IncomeType } from "@/services/api/collections"
import { CreateIncomeRegistry, IncomeRegistry, createIncome } from "@/services/api/incomes"
import React, { Dispatch, SetStateAction, useState } from "react"
import Spinner from "./Spinner"

type Props = {
  incomeType: IncomeType,
  accountingId: number
  disabled: Dispatch<SetStateAction<boolean>>
}

export default function IncomeTypeItem({ incomeType, accountingId, disabled }: Props): JSX.Element {
  const [status, setStatus] = useState<RequestStatus>({ onError: false, onLoading: false, onSuccess: false })
  const [amount, setAmount] = useState<number>(0)
  const [incomeRegistry, setIncomeRegistry] = useState<IncomeRegistry | undefined>()

  const handleNewIncome = async (e: React.FormEvent<HTMLButtonElement>) => {
    setStatus({ ...status, onLoading: true })
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
        setStatus({ ...status, onLoading: false, onSuccess: true })
        disabled(false)
      })
      .catch(() => {
        setStatus({ ...status, onError: true })
      })
  }

  return (
    <>
      {
        status.onLoading ? (
          <div className="flex flex-col justify-center items-center w-1/2">
            <Spinner bgBlank />
          </div>
        )
          : status.onSuccess ? (
            <div className="flex flex-col justify-center items-center w-1/2">
              <p className="text-mp-dark m-2 text-sm">Ingreso Añadido exitosamente</p>
              <p className="text-mp-dark m-2 text-sm">{incomeRegistry?.tag}</p>
              <p className="text-mp-dark m-2 text-sm">Monto: $<span className="text-mp-blue">{incomeRegistry?.amount}</span></p>
            </div>
          )
            : status.onError ? (<p className="text-mp-error m-2">Ocurrio un Error al Registrar el ingreso</p>)
              : (
                <div className="flex flex-row justify-center items-center w-1/2">
                  <p className="text-mp-dark m-2">{incomeType.type}</p>
                  <input
                    type="number"
                    name=""
                    className="w-20 border border-mp-green text-center text-mp-dark rounded mr-2"
                    onChange={(e: React.FormEvent<HTMLInputElement>) => setAmount(parseInt(e.currentTarget.value))}
                  />
                  <button
                    className="bg-mp-dark text-mp-gray-soft w-16 rounded border-none hover:cursor-pointer"
                    onClick={handleNewIncome}
                  >
                    OK
                  </button>
                </div>
              )
      }
    </>
  )
}
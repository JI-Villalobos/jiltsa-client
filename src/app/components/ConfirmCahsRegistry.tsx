'use client'

import { Dispatch, SetStateAction, useState } from "react"
import Spinner from "./shared/Spinner"
import { createCashRegistry, CreateCashWithdrawalDto } from "../services/api/withdrawals"
import { failedRequest, initialStatus, pendingRequest, RequestStatus, successfullRequest } from "../services"
import { useRouter } from "next/navigation"

type Props = {
  cashWithDrawal: CreateCashWithdrawalDto
  confirmationStage: Dispatch<SetStateAction<boolean>>
}

export default function ConfirmCashRegistry({ cashWithDrawal, confirmationStage }: Props): JSX.Element {
  const [status, setStatus] = useState<RequestStatus>(initialStatus)
  const router = useRouter()

  const handleNewCashWithDrawal = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setStatus(pendingRequest)
    await createCashRegistry(cashWithDrawal)
      .then(() => {
        setStatus(successfullRequest)
        setTimeout(() => {
          router.refresh()
        }, 1000)
      })
      .catch(() => {
        setStatus(failedRequest)
      })
  }

  return (
    <div className="border w-1/4 border-mp-green rounded flex flex-col justify-center items-center mt-6">
      <p className="text-mp-dark font-coda m-4">Confirma que los datos sean correctos</p>
      <p className="text-sm text-mp-green">Concepto:</p>
      <p className="text-sm text-mp-blue">{cashWithDrawal.concept}</p>
      <p className="text-sm text-mp-green">Monto: <span className="text-mp-blue">${cashWithDrawal.amount}</span></p>
      <p className="text-sm text-mp-green">Vendedora: <span className="text-mp-blue">{cashWithDrawal.sellerName}</span></p>
      <p className="text-sm text-mp-green">Sucursal: <span className="text-mp-blue">{cashWithDrawal.branch}</span></p>
      <div className="flex flex-row justify-center items-center">
        {
          status.onSuccess ? <p className="text-mp-green font-semibold text-center m-2">Registro Exitoso</p>
            : (
              <>
                <button
                  className="m-2 p-2 rounded bg-mp-dark text-mp-gray-soft text-sm w-20 flex justify-center items-center"
                  onClick={handleNewCashWithDrawal}
                  disabled={status.onLoading}
                >
                  {status.onLoading ? <Spinner /> : 'Confirmar'}
                </button>
                <button
                  className="m-2 p-2 rounded bg-mp-soft-dark text-mp-gray-soft text-sm w-20"
                  onClick={() => { confirmationStage(false) }}
                >
                  Cancelar
                </button>
              </>
            )
        }
      </div>
    </div>
  )
}
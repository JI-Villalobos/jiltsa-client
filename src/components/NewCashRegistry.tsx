import { RequestStatus } from "@/services"
import { getBranchById } from "@/services/api/branches"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import Spinner from "./Spinner"
import { getBranchId, getCurrentAccounting } from "@/utils/appStorage"
import { CreateCashWithdrawalDto } from "@/services/api/withdrawals"

type Props = {
  setCashWithdrawal: Dispatch<SetStateAction<CreateCashWithdrawalDto>>
  cashWithDrawal: CreateCashWithdrawalDto
  conformationstage: Dispatch<SetStateAction<boolean>>
}

export default function NewCashRegistry({ setCashWithdrawal, cashWithDrawal, conformationstage }: Props): JSX.Element {
  const [status, setStatus] = useState<RequestStatus>({ onError: false, onLoading: false, onSuccess: false })

  useEffect(() => {
    const branchId = getBranchId()
    const accounting = getCurrentAccounting()
    setStatus({ ...status, onLoading: true })
    if (branchId && accounting) {
      getBranchById(branchId)
      .then((result) => {
        setCashWithdrawal({...cashWithDrawal, branch: result.name, sellerName: accounting.seller})
        setStatus({ ...status, onLoading: false })
      })
      .catch((error) => {
        setStatus({ ...status, onError: true })
      })
    }
  }, [])

  return (
    <div className="border w-2/4 border-mp-green rounded flex flex-col justify-center items-center mt-6">
      <p className="text-mp-dark font-coda m-4">Registra un Retiro</p>
      {
        status.onLoading ? <Spinner bgBlank /> : <p className="text-mp-dark font-coda m-4">{cashWithDrawal.branch}</p>
      }
      <input
        type="text"
        placeholder="Concepto del retiro"
        className="bg-mp-strong-gray mr-2 text-center mb-2 text-mp-dark"
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          setCashWithdrawal({ ...cashWithDrawal, concept: e.currentTarget.value })
        }}
      />
      <input
        type="number"
        placeholder="Monto del retiro"
        className="bg-mp-strong-gray mr-2 text-center mb-2 text-mp-dark"
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          setCashWithdrawal({ ...cashWithDrawal, amount: parseInt(e.currentTarget.value) })
        }}
      />
      {
        status.onError ? <p className="text-mp-error"> No Fue Posible Cragar datos de tu Sucursal</p>
          : (
            <button
              className="bg-mp-green rounded text-mp-gray-soft text-sm w-20 m-2"
              onClick={() => conformationstage(true)}
              disabled={status.onLoading}
            >
              Registrar
            </button>
          )
      }
    </div>
  )
}
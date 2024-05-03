import { RequestStatus, failedRequest, initialStatus, pendingRequest, successfullRequest } from "@/services"
import { getBranchById } from "@/services/api/branches"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import Spinner from "./Spinner"
import { getBranchId, getCurrentAccounting } from "@/utils/appStorage"
import { CreateCashWithdrawalDto } from "@/services/api/withdrawals"
import Link from "next/link"
import { conceptList } from "@/utils/variables"

type Props = {
  setCashWithdrawal: Dispatch<SetStateAction<CreateCashWithdrawalDto>>
  cashWithDrawal: CreateCashWithdrawalDto
  conformationstage: Dispatch<SetStateAction<boolean>>
}

export default function NewCashRegistry({ setCashWithdrawal, cashWithDrawal, conformationstage }: Props): JSX.Element {
  const [status, setStatus] = useState<RequestStatus>(initialStatus)
  const [concept, setConcept] = useState('')

  useEffect(() => {
    const branchId = getBranchId()
    const accounting = getCurrentAccounting()
    setStatus(pendingRequest)
    if (branchId && accounting) {
      getBranchById(branchId)
        .then((result) => {
          setCashWithdrawal({ ...cashWithDrawal, branch: result.name, sellerName: accounting.seller })
          setStatus(successfullRequest)
        })
        .catch(() => {
          setStatus(failedRequest)
        })
    }
  }, [])

  return (
    <div className="border w-2/4 border-mp-green rounded flex flex-col justify-center items-center mt-6">
      <p className="text-mp-blue text-xl font-semibold m-2">Registro de Retiros</p>
      {
        status.onLoading ? <Spinner bgBlank /> : <p className="text-mp-green m-2">{cashWithDrawal.branch}</p>
      }
      <div className="m-2 w-1/3">
        <label htmlFor="selection" className="block text-sm font-medium text-mp-strong-gray"> Concepto del retiro </label>

        <select
          name="selection"
          id="selection"
          className="mt-1.5 w-full p-2 rounded-lg border border-mp-gray-soft text-mp-soft-dark sm:text-sm"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setCashWithdrawal({ ...cashWithDrawal, concept: e.currentTarget.value })
            setConcept(e.currentTarget.value)
          }}
        >
          <option value="">Selecciona el concepto</option>
          {
            conceptList.map((concept) => <option value={concept}>{concept}</option>)
          }
        </select>
      </div>

      {
        concept == 'OTROS' && (
          <input
            type="text"
            placeholder="Especifica concepto del retiro"
            className="rounded-lg w-1/3 p-2 border border-mp-gray-soft m-2 text-center text-mp-dark"
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setCashWithdrawal({ ...cashWithDrawal, concept: e.currentTarget.value})
            }}
          />
        )
      }

      <input
        type="number"
        placeholder="Monto del retiro"
        className="rounded-lg w-1/3 p-2 border border-mp-gray-soft m-2 text-center text-mp-dark"
        onChange={(e: React.FormEvent<HTMLInputElement>) => {
          setCashWithdrawal({ ...cashWithDrawal, amount: parseInt(e.currentTarget.value) })
        }}
      />
      {
        status.onError ? <p className="text-mp-error"> No Fue Posible Cragar datos de tu Sucursal</p>
          : (
            <button
              className="bg-mp-green rounded text-mp-gray-soft text-sm p-2 w-1/3 m-2"
              onClick={() => conformationstage(true)}
              disabled={status.onLoading}
            >
              Registrar
            </button>
          )
      }
      <div className="p-2">
        <Link href={`withdrawals/${cashWithDrawal.branch}`} className="text-mp-blue text-xs underline">
          Ver Registros
        </Link>
      </div>
    </div>
  )
}
import Spinner from "@/components/shared/Spinner"
import { RequestStatus, failedRequest, initialStatus, pendingRequest, successfullRequest } from "@/services"
import { updateBills } from "@/services/api/billing"
import { getBills } from "@/utils/appStorage"
import React, { Dispatch, SetStateAction, useState } from "react"

type Props = {
  setStep: Dispatch<SetStateAction<number>>
}

export default function ConfirmReceptionForm({ setStep }: Props): JSX.Element {
  const [date, setDate] = useState('')
  const [status, setStatus] = useState<RequestStatus>(initialStatus)

  const alterBills = () => {
    const bills = getBills()

    if (bills) {
      bills.forEach(bill => {
        bill.isActive = false
        bill.receptionDate = date
      })
    }

    return bills

  }

  const handleconfirmDate = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const bills = alterBills()
    if (bills) {
      setStatus(pendingRequest)
      await updateBills(bills)
        .then((result) => {
          setStatus(successfullRequest)
          setStep(3)
        })
        .catch((error) => {
          setStatus(failedRequest)
        })
    }
  }

  return (
    <div className="mt-6 flex flex-col justify-center items-center bg-mp-gray-soft w-4/12">
      <label htmlFor="date" className="text-sm text-center text-mp-dark m-2">
        Selecciona fecha de recepción
      </label>
      <input
        type="datetime-local"
        name=""
        className="w-1/2 text-xs text-mp-dark m-2 rounded p-2" id=""
        onChange={(e: React.FormEvent<HTMLInputElement>) => setDate(e.currentTarget.value)}
      />
      <button onClick={handleconfirmDate} className="text-sm bg-mp-dark text-mp-gray-soft  rounded m-2 p-2">
        {
          status.onLoading ? <div className="flex items-center"><Spinner /></div> : 'Confirmar'
        }
      </button>
      {
        status.onError && (<p className="text-center text-mp-error">Ocurrio un error al intentar confirmar la recepción de las facturas, intentalo mas tarde</p>)
      }
    </div>
  )
}
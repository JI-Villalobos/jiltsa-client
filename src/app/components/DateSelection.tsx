import { RequestStatus } from "@/services"
import { Accounting, getByDate } from "@/services/api/accounts"
import React, { Dispatch, SetStateAction, useState } from "react"
import Spinner from "./shared/Spinner"

type Props = {
  setAccounts: Dispatch<SetStateAction<Accounting[]>>
  setDisplay: Dispatch<SetStateAction<boolean>>
  branch: number
}

export default function DateSelection({ setDisplay, setAccounts, branch }: Props) {
  const [status, setStatus] = useState<RequestStatus>({onError: false, onLoading: false, onSuccess: false})
  const [initial, setInitial] = useState<string>('')
  const [end, setEnd] = useState<string>('')

  const handleAccouning = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setStatus({...status, onLoading: true})
    getByDate(initial, end, branch)
      .then((result) => {
        setAccounts(result)
        setDisplay(true)
        setStatus({...status, onLoading: false})
      })
      .catch(() => {
        setStatus({...status, onError: true})
      })
    
  }
  return (
    <div className="w-2/3 flex flex-col rounded items-center border border-mp-green mt-2">
      <p className="text-mp-dark m-2">Seleccionar por fecha:</p>
      <div className="flex flex-row w-full justify-center items-center">
        <p className=" text-mp-dark font-semibold">Del</p>
        <input 
          type="datetime-local" 
          className="bg-mp-strong-gray rounded text-mp-blue border-spacing-1 text-center h-8 m-2"
          onChange={(e: React.FormEvent<HTMLInputElement>) => setInitial(e.currentTarget.value)}
        />
        <p className=" text-mp-dark font-semibold">Al</p>
        <input 
          type="datetime-local" 
          className="bg-mp-strong-gray rounded text-mp-blue border-spacing-1 text-center h-8 m-2"
          onChange={(e: React.FormEvent<HTMLInputElement>) => setEnd(e.currentTarget.value)}
        />
        <button 
          className="bg-mp-green text-mp-gray-soft w-40 m-2 h-8 rounded flex justify-center items-center"
          onClick={handleAccouning}
        >
          {
            status.onLoading ? <Spinner />
            : 'Aceptar'
          }
        </button>
      </div>
    </div>
  )
}
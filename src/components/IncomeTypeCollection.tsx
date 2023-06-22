import { RequestStatus } from "@/services"
import { IncomeType, getIncomeTypes } from "@/services/api/collections"
import { useEffect, useState } from "react"
import Spinner from "./Spinner"

export default function IncomeTypeCollection(): JSX.Element {
  const [status, setStatus] = useState<RequestStatus>({ onError: false, onLoading: false, onSuccess: false })
  const [incomes, setIncomes] = useState<IncomeType[]>([])

  useEffect(() => {
    setStatus({ ...status, onLoading: true })
    getIncomeTypes()
      .then((result) => {
        setStatus({ ...status, onLoading: false })
        setIncomes(result)
      })
      .catch(() => {
        {
          setStatus({ ...status, onError: true })
        }
      })
  }, [])

  return (
    <div className="flex flex-col items-start w-8/12 border-b-2 border-mp-strong-gray mt-4">
      <p className="font-coda text-xl font-medium text-mp-green mb-4">Tipos de Ingreso</p>
      {
        status.onLoading ? <Spinner bgBlank/> : (
          incomes.map((income) => (
          <input 
            type="text" 
            disabled 
            value={income.type} 
            className="w-1/3 bg-mp-strong-gray mb-2 rounded text-center text-mp-dark" 
            key={`income-type-id-${income.id}`}
          />
          ))
        )
      }
    </div>
  )
}
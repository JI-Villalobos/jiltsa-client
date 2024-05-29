import { RequestStatus, failedRequest, initialStatus, pendingRequest, successfullRequest } from "@/services"
import { IncomeType, getIncomeTypes } from "@/services/api/collections"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import Spinner from "./Spinner"
import IncomeTypeItem from "./IncomeTypeItem"
import { clearIncomesregistered, getCurrentAccounting, getIncomesRegistered } from "@/utils/appStorage"
import ErrorMessage from "./ErrorMessage"
import { STAGES } from "./Expenses"

interface Props {
  setStage: Dispatch<SetStateAction<number>>
}

export default function Incomes({ setStage }: Props): JSX.Element {
  const [incomeTypes, setIncomeTypes] = useState<IncomeType[]>([])
  const [status, setStatus] = useState<RequestStatus>(initialStatus)
  const [accountingId, setAccountingId] = useState<number>(0)
  const [disabledClose, setDisabledClose] = useState<boolean>(true)
  const [transition, setTransition] = useState<boolean>(false)

  useEffect(() => {
    setStatus(pendingRequest)
    const registered = getIncomesRegistered()
    const currentAcccounting = getCurrentAccounting()
    if (currentAcccounting) {
      setAccountingId(currentAcccounting.accountingId)
    }
    getIncomeTypes()
      .then((result) => {
        setIncomeTypes(result)
        setStatus(successfullRequest)
        if (registered.length == result.length) {
          setDisabledClose(false)
        }
      })
      .catch(() => {
        setStatus(failedRequest)
      })
  }, [])

  const closeAccounting = (e: React.FormEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    setTimeout(() => {
      setStage(STAGES.SUCCESS)
    }, 2000)
    setTransition(true)
  }

  return (
    <div className="rounded-lg p-4 shadow-lg flex flex-col items-center mt-4 w-6/12">
      <p className="text-mp-green text-2xl p-2 font-semibold">Registro de ventas</p>
      <div className="flex flex-col w-full items-center justify-center">
        {
          status.onLoading 
            ? <Spinner bgBlank /> 
            : incomeTypes.map((income) => (
              <IncomeTypeItem
                incomeType={income}
                accountingId={accountingId}
                disabled={setDisabledClose}
                key={`income-type-id-${income.id}`}
              />
          ))
        }
      </div>
      <button
        className="mt-6 border-none rounded text-mp-gray-soft 
                bg-mp-green p-4 hover:cursor-pointer flex 
                  items-center justify-center mb-2 disabled:bg-mp-strong-gray"
        onClick={closeAccounting}
        disabled={disabledClose}
      >
        {transition ? <Spinner /> : 'Continuar'}
      </button>
      {
        status.onError && 
          <ErrorMessage 
            title="Error Al cargar información" 
            description="No fue posible cargar los tipos de ingreso disponibles, por favor intentalo mas tarde"
          />
      }
    </div>
  )
}
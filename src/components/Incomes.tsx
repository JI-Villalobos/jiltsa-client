import { RequestStatus } from "@/services"
import { IncomeType, getIncomeTypes } from "@/services/api/collections"
import { useEffect, useState } from "react"
import Spinner from "./Spinner"
import IncomeTypeItem from "./IncomeTypeItem"
import { deleteAccounting, getCurrentAccounting } from "@/utils/appStorage"
import { useRouter } from "next/router"

export default function Incomes(): JSX.Element {
  const [incomeTypes, setIncomeTypes] = useState<IncomeType[]>([])
  const [status, setStatus] = useState<RequestStatus>({ onLoading: false, onError: false, onSuccess: false })
  const [accountingId, setAccountingId] = useState<number>(0)
  const [disabledClose, setDisabledClose] = useState<boolean>(true)
  const [transition, setTransition] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    setStatus({ ...status, onLoading: true })
    const currentAcccounting = getCurrentAccounting()
    if (currentAcccounting) {
      setAccountingId(currentAcccounting.accountingId)
    }
    getIncomeTypes()
      .then((result) => {
        setIncomeTypes(result)
        setStatus({ ...status, onLoading: false })
      })
      .catch(() => {
        setStatus({ ...status, onError: true })
      })
  }, [])

  const closeAccounting = (e: React.FormEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    setTimeout(() => {
      deleteAccounting()
      router.push("/seller-home")
    }, 2000)
    setTransition(true)
  }

  return (
    <div className="bg-mp-gray-soft border border-mp-dark rounded flex flex-col items-center mt-4 w-8/12">
      <p className="text-mp-green font-coda p-2 font-semibold">Ventas</p>
      <div className="flex flex-row w-full items-center justify-center">
        {
          status.onLoading ? (<Spinner bgBlank />) : incomeTypes.map((income) => (
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
        className="mt-10 border-none rounded text-mp-gray-soft bg-mp-green w-40 h-8 hover:cursor-pointer flex items-center justify-center mb-2 disabled:bg-mp-strong-gray"
        onClick={closeAccounting}
        disabled={disabledClose}
      >
        {transition ? <Spinner /> : 'Cerrar turno'}
      </button>
      {status.onError && (<p className="text-mp-error font-coda p-2 text-center">No fue posible cargar los tipos de ingresos, intentalo mas tarde</p>)}
    </div>
  )
}
import { RequestStatus } from "@/services"
import { getTotalBalance } from "@/services/api/branches"
import { useEffect, useState } from "react"
import Spinner from "./Spinner"
import Cookies from "js-cookie"
import { formatAmount } from "@/utils/formatAmount"

export default function TotalBalanceItem(): JSX.Element {
  const [totals, setTotals] = useState<string>()
  const [status, setStatus] = useState<RequestStatus>({ onError: false, onLoading: false, onSuccess: false })

  useEffect(() => {
    setStatus({ ...status, onLoading: true })
    const branchId = Cookies.get('branchId')
    if (branchId) {
      getTotalBalance(parseInt(branchId)).then((result) => {
        setTotals(formatAmount(result.totals))
        setStatus({ ...status, onLoading: false })
      }).catch(() => {
        setStatus({ ...status, onError: true })
      })
    }

  }, [])

  return (
    <div className="flex flex-row w-1/3 border border-mp-strong-gray rounded justify-center items-center m-4">
      {
        status.onError ? <p>No fue posible obtener el saldo en caja</p>
          : status.onLoading ? <Spinner bgBlank/>  
          : (<>
            <p className="text-sm text-center text-mp-dark">Saldo en caja:</p>
            <input value={totals} readOnly className="text-sm text-center text-mp-blue"/>
          </>)
      }
    </div>
  )
}
import { getBranchName } from "@/utils/appStorage"
import { useEffect, useState } from "react"
import CashWSummaryItem from "./CashWsummaryItem"
import { failedRequest, initialStatus, pendingRequest, RequestStatus, successfullRequest } from "@/app/services"
import { CashWithdrawal, getCurrentCashRegistries } from "@/app/services/api/withdrawals"
import Spinner from "@/app/components/shared/Spinner"
import ErrorMessage from "@/app/components/shared/ErrorMessage"

export default function CashWSummary(): JSX.Element {
    const [status, setStatus] = useState<RequestStatus>(initialStatus)
    const [cashWithdrawals, setCashWithdrawals] = useState<CashWithdrawal[]>([])

    useEffect(() => {
        setStatus(pendingRequest)
        const branch = getBranchName()
        if (branch) {
            getCurrentCashRegistries(branch)
            .then((result) => {
                setCashWithdrawals(result)
                setStatus(successfullRequest)
            })
            .catch(() => {
                setStatus(failedRequest)
            })
        }
    }, [])

    return(
        <div className="mt-6">
            <p className="text-center text-2xl font-bold text-mp-dark sm:text-xl m-2">Retiros registrados las últimas 24 horas</p>
            {
                status.onLoading ? <Spinner bgBlank />
                : status.onSuccess ? cashWithdrawals.map(cash => (<CashWSummaryItem cashItem={cash} key={`cash-item-${cash.id}`}/>))
                : <ErrorMessage title="Error" description="No fue posible cargar el registro de retiros"/>
            }
        </div>
    )
}
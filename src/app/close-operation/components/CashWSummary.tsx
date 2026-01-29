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

    return (
        <div className="flow-root w-2/3">
            <dl className="divide-y divide-mp-strong-gray text-sm border border-mp-strong-gray rounded shadow">
                <div className="grid gap-1 p-3 grid-cols-3 bg-mp-green rounded-t">
                    <dt className="font-medium col-span-3 text-mp-gray-soft">Retiros y depositos registrados en las últimas 24 hrs</dt>
                </div>
                {
                    status.onLoading ? <Spinner bgBlank />
                        : status.onSuccess ? cashWithdrawals.map(cash => (<CashWSummaryItem cashItem={cash} key={`cash-item-${cash.id}`} />))
                            : <ErrorMessage title="Error" description="No fue posible cargar el registro de retiros" />
                }
            </dl>
        </div>
    )
}
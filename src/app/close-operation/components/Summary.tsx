import { getCurrentAccounting } from "@/utils/appStorage"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import IncomeSummary from "./IncomesSummary"
import ExpensesSummary from "./ExpensesSummary"
import CashWSummary from "./CashWSummary"
import DateFormat from "@/utils/DateFormat"
import { Accounting, getAccounting } from "@/app/services/api/accounts"
import { failedRequest, initialStatus, pendingRequest, RequestStatus, successfullRequest } from "@/app/services"
import { STAGES } from "@/app/components/Expenses"
import SessionInfo from "@/app/components/SessionInfo"
import Spinner from "@/app/components/shared/Spinner"

interface Props {
    setStage: Dispatch<SetStateAction<number>>
}

export default function Summary({ setStage }: Props): JSX.Element{
    const [accounting, setAccounting] = useState<Accounting>()
    const [status, setStatus] = useState<RequestStatus>(initialStatus)

    useEffect(() => {
       const accounting = getCurrentAccounting()
       if (accounting) {
        setStatus(pendingRequest)
        getAccounting(accounting.accountingId)
            .then((result) => {
                setAccounting(result)
                setStatus(successfullRequest)
            })
            .catch(() => {
                setStatus(failedRequest)
            })
       } 
    }, [])

    const handleCloseAccounting = () => {
        setStage(STAGES.CONFIRM)
    }

    if (accounting == undefined) {
        return <></>
    }

    return(
        <div className="flex flex-col">
            <SessionInfo />
            <p className="text-center text-2xl p-2 text-mp-green">Corte de día: {DateFormat(accounting.date)}</p>
            {
                status.onLoading && <Spinner bgBlank />   
            }
            <IncomeSummary incomes={accounting.incomeRegistries}/>
            {
                accounting.expenseRegistries.length > 0 && <ExpensesSummary expenses={accounting.expenseRegistries}/>
            }
            <CashWSummary />
            <button className="self-center m-6 bg-mp-dark p-2 text-mp-gray-soft rounded" onClick={handleCloseAccounting}>
                Terminar
            </button>
        </div>    
    )
}
import ErrorMessage from "@/components/ErrorMessage"
import SessionInfo from "@/components/SessionInfo"
import Spinner from "@/components/Spinner"
import { RequestStatus, failedRequest, initialStatus, pendingRequest, successfullRequest } from "@/services"
import { Accounting, getAccounting } from "@/services/api/accounts"
import { deleteAccounting, getCurrentAccounting } from "@/utils/appStorage"
import { useEffect, useState } from "react"
import IncomeSummary from "./IncomesSummary"
import ExpensesSummary from "./ExpensesSummary"
import { useRouter } from "next/router"
import CashRegistry from "@/pages/cash-registry"
import CashWSummary from "./CashWSummary"

export default function Summary(): JSX.Element{
    const [accounting, setAccounting] = useState<Accounting>()
    const [status, setStatus] = useState<RequestStatus>(initialStatus)
    const router = useRouter()

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
        deleteAccounting()
        router.push("/seller-home")
    }

    if (accounting == undefined) {
        return <ErrorMessage 
            title="Error de turno"
            description="No fue posible cargar los detalles de cierre de turno, por favor contacta con el administrador"      
        />
    }

    return(
        <div className="flex flex-col">
            <SessionInfo />
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
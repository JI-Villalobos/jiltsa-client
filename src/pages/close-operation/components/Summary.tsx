'use client'

import SessionInfo from "@/components/SessionInfo"
import Spinner from "@/components/Spinner"
import { RequestStatus, failedRequest, initialStatus, pendingRequest, successfullRequest } from "@/services"
import { Accounting, getAccounting } from "@/services/api/accounts"
import { clearIncomesregistered, deleteAccounting, getCurrentAccounting } from "@/utils/appStorage"
import { useEffect, useState } from "react"
import IncomeSummary from "./IncomesSummary"
import ExpensesSummary from "./ExpensesSummary"
import { useRouter } from "next/router"
import CashWSummary from "./CashWSummary"
import DateFormat from "@/utils/DateFormat"
import ScreenshotButton from "./ScreenShotButton"

export default function Summary(): JSX.Element {
    const [accounting, setAccounting] = useState<Accounting>()
    const [status, setStatus] = useState<RequestStatus>(initialStatus)
    const [successfullScreenShot, setSuccessfullScreenshot] = useState('')
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
        clearIncomesregistered()
        router.push("/seller-home")
    }

    if (accounting == undefined) {
        return <></>
    }

    return (
        <div className="flex flex-col" id="to-capture">
            <SessionInfo />
            <p className="text-center text-2xl p-2 text-mp-green">Corte de día: {DateFormat(accounting.date)}</p>
            {
                status.onLoading && <Spinner bgBlank />
            }
            <IncomeSummary incomes={accounting.incomeRegistries} />
            {
                accounting.expenseRegistries.length > 0 && <ExpensesSummary expenses={accounting.expenseRegistries} />
            }
            <CashWSummary />
            <div className="flex flex-row items-center justify-center m-6">
                <button className="self-center m-6 bg-mp-dark p-3 w-1/5 text-mp-gray-soft rounded" onClick={handleCloseAccounting}>
                    Terminar
                </button>
                <ScreenshotButton setSuccess={setSuccessfullScreenshot}/>
            </div>
            {
                successfullScreenShot == 'true' ? 
                <div className=" w-2/3 self-center text-sm text-center border border-mp-green rounded p-2">
                    <p>
                    Se realizó la captura de pantalla de forma exitosa, 
                    Compártela en el grupo de WhatsApp dando clic derecho y la opción "pegar" o 
                    <span className="font-bold"> Ctrl + V</span>
                    </p>
                </div>
                : successfullScreenShot == 'false' ?
                <div className=" w-2/3 self-center text-sm text-center text-mp-strong-red border border-mp-error rounded p-2">
                    <p>
                    Se realizó la captura de pantalla de forma exitosa, 
                    Compártela en el grupo de WhatsApp dando clic derecho y la opción "pegar" o 
                    <span className="font-bold"> Ctrl + V</span>
                    </p>
                </div>
                : <></>
            }
        </div>
    )
}
'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import { failedRequest, initialStatus, pendingRequest, RequestStatus, successfullRequest } from "@/app/services";
import { Accounting, getAccounting } from "@/app/services/api/accounts";
import { BiCommentError } from "react-icons/bi";
import Spinner from "@/app/components/shared/Spinner";
import ErrorMessage from "@/app/components/shared/ErrorMessage";
import NewExpense from "@/app/components/NewExpense";
import SuccessExpenseRegistry from "@/app/components/SuccessExpenseRegistry";

export enum STAGES {
    DEFAULT = 0,
    NEW = 1,
    SUCCESS = 2,
    FAILED = 3,
    LOADING = 4,
    CONFIRM = 5
}

export default function ExpenseDelay(): JSX.Element {
    const [stages, setStages] = useState<number>(STAGES.DEFAULT)
    const [status, setStatus] = useState<RequestStatus>(initialStatus)
    const [accounting, setAccounting] = useState<Accounting>()
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        setStatus(pendingRequest)
        if (typeof id === 'string') {
            const accountingId = parseInt(id)
            getAccounting(accountingId).then((res) => {
                setAccounting(res)
                setStatus(successfullRequest)
            }).catch(() => {
                setStatus(failedRequest)
            })
        } else {
            router.push("/")
        }
    }, [])


    const nextStage = (): void => {
        setTimeout(() => {
            setStages(STAGES.NEW)
        }, 1000)
        setStages(STAGES.LOADING)
    }

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="mt-10 w-1/3 flex flex-col items-center justify-center rounded shadow-md p-2 text-mp-green">
                
                <p className="text-2xl text-center">Registra gastos a turnos previamente cerrados.</p>
                <p className="text-sm text-center text-mp-dark p-2">
                    Este Apartado debe usarse solo en casos especiales, al registrar el monto, el o los administradores
                    de la sucursal revisaran la legitimidad de dichos movimientos
                </p>
            </div>
            <div className="m-2">
                {
                    status.onLoading ? <Spinner bgBlank/>
                    : status.onError ? <ErrorMessage title="Error de turno" description="No fue posible cargar datos del turno"/>
                    :   <div className="flex flex-col m-6 p-2 shadow-sm">
                            <p className="text-mp-blue">Turno: {accounting?.id}</p>
                            <p className="text-mp-green">Fecha: {accounting?.date}</p>
                            <p className="text-mp-dark">Vendedor: {accounting?.sellerId}</p>
                        </div>
                }
            </div>
            <div className="flex flex-col items-center w-8/12">
                <div className="w-full flex items-center justify-center">
                    {
                        stages == STAGES.DEFAULT
                            ? <div className="flex flex-row w-full justify-center">
                                <button className="bg-mp-dark text-mp-gray-soft rounded border-none hover:cursor-pointer p-2 mr-6"
                                    onClick={nextStage}
                                >
                                    +Nuevo Gasto
                                </button>
                                <button className="bg-mp-green text-mp-gray-soft rounded border-none hover:cursor-pointer hover:bg-mp-light-green w-32  p-2 mr-6"
                                    onClick={() => router.push("/")}
                                >
                                    Salir
                                </button>
                            </div>
                            : stages == STAGES.NEW
                                ? <NewExpense setStage={setStages} accountingId={accounting?.id}/>
                                : stages == STAGES.SUCCESS
                                    ? <SuccessExpenseRegistry setStage={setStages} />
                                    : stages == STAGES.FAILED
                                        ? <ErrorMessage setStage={setStages} title="Opss! ocurrio un error" description="No fue posible completar el registro, intentalo nuevamente" />
                                        : <Spinner bgBlank />
                    }
                </div>
            </div>
        </div>
    )
}

/*<BiCommentError size={30} /> */
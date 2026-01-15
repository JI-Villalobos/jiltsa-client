'use client'

import { useEffect, useState } from "react";
import ConfirmSummary from "./components/ConfirmSummary";
import { STAGES } from "@/app/components/Expenses";
import Layout from "@/app/layouts/Layout";
import IncomesRegistry from "@/app/components/shared/IncomesRegistry";
import Summary from "./components/Summary";
import ErrorMessage from "@/app/components/shared/ErrorMessage";
import { LuCircle, LuCurrency, LuDollarSign, LuFolder, LuInbox } from "react-icons/lu";
import DateFormat from "@/utils/DateFormat";
import { CurrentAccounting, getCurrentAccounting } from "@/utils/appStorage";

export default function CloseOperation(): JSX.Element {
    const [stage, setStage] = useState(STAGES.DEFAULT)
    const [currentAccounting, setCurrentAccounting] = useState<CurrentAccounting>()

    useEffect(() => {
        const accounting = getCurrentAccounting()
        if (!accounting) return
        
        setCurrentAccounting(accounting)
    }, [])

    return (
        <Layout>
            <div className="mt-10 w-full flex flex-col justify-center items-center">
                {/*
                   stage == STAGES.DEFAULT ? <IncomesRegistry setStage={setStage}/>
                   : stage == STAGES.SUCCESS ? <Summary setStage={setStage}/>
                   : stage == STAGES.CONFIRM ? <ConfirmSummary setStage={setStage} />
                   : <ErrorMessage title="Oppss! Error inesperado" description="No te preocupes estamos trabajando para resolverlo"/>
                */}
                <p className="mb-2 text-mp-dark text-xl">Cierre de caja <span className="text-mp-blue">{currentAccounting ? DateFormat(currentAccounting.date) : ''}</span></p>
                <div className="flow-root w-2/3 mb-6">
                    <dl className="divide-y divide-mp-strong-gray text-sm border border-mp-strong-gray rounded shadow">
                        <div className="grid gap-1 p-3 grid-cols-3 bg-mp-green rounded-t">
                            <dt className="text-mp-white font-bold col-span-3">Resumen de corte</dt>
                        </div>
                        <div className="grid gap-1 p-3 grid-cols-4 sm:gap-4 bg-mp-gray-soft font-bold">
                            <dt className="text-mp-green flex items-center gap-1"> <LuFolder /> Corte</dt>

                            <dd className="text-mp-blue sm:col-span-1">2045</dd>

                            <dt className=" text-mp-green flex items-center gap-1"><LuInbox />Saldo en caja </dt>

                            <dd className="text-mp-blue sm:col-span-1">$2,045</dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                            <dt className="font-medium text-mp-dark">Vendedora</dt>

                            <dd className="text-mp-blue sm:col-span-2">John Frusciante</dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4 bg-mp-gray-soft">
                            <dt className="font-medium text-mp-dark">Total de ventas</dt>

                            <dd className="text-mp-dark sm:col-span-2">$3,450</dd>
                        </div>

                        <div className="grid grid-cols-6 grid-rows-2 gap-1 p-3 sm:gap-4">
                            <dt className="font-medium text-mp-dark">
                                <LuCircle className="text-mp-blue" />
                            </dt>
                            <dt className="font-medium text-mp-dark col-span-1 text-xs">
                                PRONTIPAGOS
                            </dt>
                            <dd className="text-mp-dark col-span-1 text-xs">$1,345</dd>
                            <dt className="font-medium text-mp-dark col-span-3">
                            </dt>
                            <dt className="font-medium text-mp-dark">
                                <LuCircle className="text-mp-blue" />
                            </dt>
                            <dt className="font-medium text-mp-dark col-span-1 text-xs">
                                MEDICAMENTO
                            </dt>
                            <dd className="text-mp-dark col-span-1 text-xs">$1,345</dd>
                        </div>

                        <div className="grid gap-1 p-3 grid-cols-6 sm:gap-4 bg-mp-gray-soft">
                            <dt className="font-medium text-mp-dark col-span-3"></dt>
                            <dt className="font-medium text-mp-dark">Total de gastos</dt>

                            <dd className="text-mp-dark sm:col-span-1">$3,450</dd>
                        </div>
                        <div className="grid grid-cols-6 grid-rows-2 gap-1 p-3 sm:gap-4">
                            <dt className="font-medium text-mp-dark col-span-2"></dt>
                            <dt className="font-medium text-mp-dark">
                                <LuCircle className="text-mp-error" />
                            </dt>
                            <dt className="font-medium text-mp-dark col-span-1 text-xs">
                                PRONTIPAGOS
                            </dt>
                            <dd className="text-mp-dark col-span-1 text-xs ">$1,345</dd>
                            <dt className="font-medium text-mp-dark col-span-2">
                            </dt>
                            <dt className="font-medium text-mp-dark">
                                <LuCircle className="text-mp-error" />
                            </dt>
                            <dt className="font-medium text-mp-dark col-span-1 text-xs">
                                MEDICAMENTO
                            </dt>
                            <dd className="text-mp-dark col-span-1 text-xs">$1,345</dd>
                        </div>
                    </dl>
                </div>
                <div className="flow-root w-2/3">
                    <dl className="divide-y divide-mp-strong-gray text-sm border border-mp-strong-gray rounded shadow">
                        <div className="grid gap-1 p-3 grid-cols-3 bg-mp-green rounded-t">
                            <dt className="font-medium col-span-3 text-mp-gray-soft">Retiros y depositos registrados en las últimas 24 hrs</dt>
                        </div>
                        <div className="grid gap-1 p-3 grid-cols-4 sm:gap-6">
                            <dt className="font-medium text-mp-dark">Ref: <span className="text-mp-strong-red">451</span></dt>
                            <dt className="font-medium text-mp-dark">Concepto: <span className="text-mp-blue">Retiro administrativo</span></dt>
                            <dt className="font-medium text-mp-dark">Por: <span className="text-mp-blue">John Frusciante</span></dt>
                            <dt className="font-medium text-mp-dark">Monto: <span className="text-mp-green">$10,000</span></dt>
                        </div>

                        <div className="grid gap-1 p-3 grid-cols-4 sm:gap-6">
                            <dt className="font-medium text-mp-dark">Ref: <span className="text-mp-strong-red">451</span></dt>
                            <dt className="font-medium text-mp-dark">Concepto: <span className="text-mp-blue">Retiro administrativo</span></dt>
                            <dt className="font-medium text-mp-dark">Por: <span className="text-mp-blue">John Frusciante</span></dt>
                            <dt className="font-medium text-mp-dark">Monto: <span className="text-mp-green">$10,000</span></dt>
                        </div>
                    </dl>
                </div>
                <button className="mt-4 text-mp-white p-2 rounded shadow bg-gradient-to-r from-mp-green to-mp-blue">
                    Terminar
                </button>
            </div>
        </Layout>
    )
}

/***
 *  <div className="grid gap-1 p-3 grid-cols-3 ">
                            <dt className="font-medium text-mp-dark col-span-3">Retiros y depositos registrados en las últimas 24 hrs</dt>
                        </div>
 */
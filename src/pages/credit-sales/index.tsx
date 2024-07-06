import Layout from "@/layouts/Layout";
import CreditSaleItem from "./components/CreditSaleItem";
import { ChangeEvent, useEffect, useState } from "react";
import { failedRequest, initialStatus, pendingRequest, successfullRequest } from "@/services";
import { CreditSale, getCreditSaleByStatus, getCreditSales } from "@/services/api/creditSales";
import Spinner from "@/components/Spinner";
import ErrorMessage from "@/components/ErrorMessage";
import { getBranchId } from "@/utils/appStorage";
import { useRouter } from "next/router";

export enum FILTER_REQ {
    ALL = 'ALL',
    PAID = 'PAID',
    PENDING = 'PENDING'
}

export default function CreditSales(): JSX.Element {
    const [status, setStatus] = useState(initialStatus)
    const [reqFilter, setReqFilter] = useState(FILTER_REQ.ALL.toString())
    const [creditSales, setCreditSales] = useState<CreditSale[]>([])

    const router = useRouter()

    useEffect(() => {
        setStatus(pendingRequest)
        const branchId = getBranchId()
        if (branchId)
            switch (reqFilter) {
                case FILTER_REQ.PAID.toString():
                    getCreditSaleByStatus(branchId, true)
                        .then((result) => {
                            setCreditSales(result)
                            setStatus(successfullRequest)
                        }).catch(() => { setStatus(failedRequest) })
                    break;
                case FILTER_REQ.PENDING.toString():
                    getCreditSaleByStatus(branchId, false)
                        .then((result) => {
                            setCreditSales(result)
                            setStatus(successfullRequest)
                        }).catch(() => { setStatus(failedRequest) })
                    break;
                default:
                    getCreditSales(branchId)
                        .then((result) => {
                            setCreditSales(result)
                            setStatus(successfullRequest)
                        }).catch(() => { setStatus(failedRequest) })
                    break;
            }
    }, [reqFilter])

    return (
        <Layout>
            <div className="mt-10 w-full flex  flex-col justify-center items-center">
                <h3 className="text-xl text-mp-dark font-semibold">Administrador de apartados</h3>
                <div className="w-1/2 flex flex-row items-center justify-center m-8">
                    <div className="w-1/2">
                        <label className="block text-sm font-medium text-mp-soft-dark"> Consultar por: </label>

                        <select
                            name="HeadlineAct"
                            id="HeadlineAct"
                            className="mt-1.5 w-1/2 rounded-lg border border-mp-gray-soft text-mp-soft-dark sm:text-sm"
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => setReqFilter(e.currentTarget.value)}
                        >

                            <option value={FILTER_REQ.ALL.toString()}>Todas</option>
                            <option value={FILTER_REQ.PAID.toString()}>Pagadas</option>
                            <option value={FILTER_REQ.PENDING.toString()}>Pendientes</option>
                        </select>
                    </div>
                    <button 
                        className="bg-mp-dark flex flex-row p-2 rounded text-mp-white"
                        onClick={() => router.push('credit-sales/new')}
                    >
                        Nuevo Apartado
                    </button>
                </div>
                <div className="w-full flex flex-col items-center justify-center">
                    {
                        status.onLoading ? <Spinner bgBlank />
                            : status.onError ? <ErrorMessage title="Fallo de conexión" description="No fue posible consultar la lista de apartados, intentalo más tarde" />
                                : creditSales.map(sale => <CreditSaleItem sale={sale} key={`id-credit-${sale.id}`}/>)
                    }
                </div>
            </div>
        </Layout>
    )
}
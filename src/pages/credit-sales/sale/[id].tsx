import ErrorMessage from "@/components/ErrorMessage"
import Layout from "@/layouts/Layout"
import { failedRequest, initialStatus, pendingRequest, successfullRequest } from "@/services"
import { CreditSale, getCreditSale } from "@/services/api/creditSales"
import DateFormat from "@/utils/DateFormat"
import { formatAmount } from "@/utils/formatAmount"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function CreditSaleDetail(): JSX.Element {
    const router = useRouter()
    const { id } = router.query
    const [status, setStatus] = useState(initialStatus)
    const [creditSale, setCreditSale] = useState<CreditSale>()


    useEffect(() => {
        setStatus(pendingRequest)
        if (id && typeof id == 'string') {
            getCreditSale(parseInt(id))
                .then((result) => {
                    setCreditSale(result)
                    setStatus(successfullRequest)
                }).catch(() => {
                    setStatus(failedRequest)
                })
        }
    }, [])

    if (!creditSale || status.onError) {
        return (
            <Layout>
                <ErrorMessage
                    title="Apartado no encontrado"
                    description="No fue posible obtener el detalle del apartado, inténtalo más tarde o comunícate con tu administrador"
                />
            </Layout>
        )
    }

    return (
        <Layout>
            <div className="w-1/2 m-8 flow-root rounded-lg border border-mp-gray-soft py-3 shadow-sm">
                <dl className="-my-3 divide-y divide-mp-gray-soft text-sm">
                    <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-mp-soft-dark">Número de apartado</dt>
                        <dd className="text-mp-soft-dark sm:col-span-2">{creditSale.id}</dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 p-3  sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-gray-900 text-mp-soft-dark">Cliente</dt>
                        <dd className="text-mp-green sm:col-span-2">{creditSale.client}</dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-mp-soft-dark">Concepto</dt>
                        <dd className="text-mp-dark sm:col-span-2">{creditSale.concept}</dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 p-3  sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-mp-soft-dark">Precio Acordado</dt>
                        <dd className="text-mp-blue sm:col-span-2">{formatAmount(creditSale.amount)}</dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 p-3  sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-mp-soft-dark">Detalle de pagos</dt>
                        <div className="flex flex-col">
                            {
                                creditSale.partials.map(partial =>
                                    <div className="flex flex-row" key={`part-id-${partial.id}`}>
                                        <p className="mr-3 text-mp-green">Abonado el {DateFormat(partial.paymentDate)}</p>
                                        <p className="text-mp-blue"> Por {formatAmount(partial.amount)}</p>
                                    </div>

                                )
                            }
                        </div>
                    </div>

                </dl>
            </div>
            <div>
                <button
                    className="bg-mp-blue p-2 rounded text-mp-white"
                    onClick={() => router.back()}
                >
                    Regresar
                </button>

            </div>
        </Layout>
    )
}
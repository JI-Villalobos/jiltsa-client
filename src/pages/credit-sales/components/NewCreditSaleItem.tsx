import ErrorMessage from "@/components/ErrorMessage"
import Spinner from "@/components/Spinner"
import { failedRequest, initialStatus, pendingRequest, successfullRequest } from "@/services"
import { createCreditSale, CreateCreditSale } from "@/services/api/creditSales"
import { getBranchId } from "@/utils/appStorage"
import { useRouter } from "next/router"
import { FormEvent, useState } from "react"

export default function NewCreditSaleItem(): JSX.Element {
    const [status, setStatus] = useState(initialStatus)
    const [date, setDate] = useState('')
    const [amount, setAmount] = useState(0)
    const [concept, setConcept] = useState('')
    const router = useRouter()

    const handleNewCreditSale = async (e: FormEvent<HTMLButtonElement>) => {
        setStatus(pendingRequest)
        e.preventDefault()
        const branchId = getBranchId()
        if (branchId) {
            const creditSale: CreateCreditSale = {
                branchId: branchId,
                concept: concept,
                date: date,
                amount: amount
            }

            if (amount > 0 || date != '' || concept != '') {
                createCreditSale(creditSale)
                .then(() => {
                    setStatus(successfullRequest)
                    router.push('/credit-sales')
                }).catch(() => {
                    setStatus(failedRequest)
                })
            }
        } 
        setStatus(initialStatus)
    }

    return(
        <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8 mt-8">
                <div className="mx-auto max-w-lg">
                    <h1 className="text-center text-xl font-bold text-mp-blue sm:text-3xl">Registro de Nuevo Apartado</h1>

                    <form action="#" className="mb-0 m-2 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
                        <div>
                            <label htmlFor="date" className="text-xs text-center text-mp-dark">Fecha del Apartado</label>

                            <div className="relative">
                                <input
                                    type="datetime-local"
                                    className="w-full rounded-lg border-mp-soft-dark bg-mp-gray-soft text-mp-soft-dark p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Fecha"
                                    onChange={(e) => setDate(e.currentTarget.value)}
                                />
                            </div>
                        </div>

                        <div>
                        <label htmlFor="date" className="text-xs text-center text-mp-dark">Concepto</label>

                            <div className="relative">
                                <input
                                    type="text"
                                    className="w-full rounded-lg border-mp-soft-dark bg-mp-gray-soft p-4 pe-12 text-mp-green text-sm shadow-sm"
                                    placeholder="Concepto"
                                    onChange={(e) => setConcept(e.currentTarget.value)}
                                />
                            </div>
                        </div>

                        <div>
                        <label htmlFor="date" className="text-xs text-center text-mp-dark">Monto</label>

                            <div className="relative">
                                <input
                                    type="number"
                                    className="w-full rounded-lg border-mp-soft-dark bg-mp-gray-soft text-mp-soft-dark p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Monto"
                                    onChange={(e) => setAmount(parseInt(e.currentTarget.value))}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="block w-full rounded-lg bg-mp-dark px-5 py-3 text-sm font-medium text-mp-gray-soft"
                            onClick={handleNewCreditSale}
                        >
                            {status.onLoading ? (<div className="flex justify-center"><Spinner /> </div>) : 'Registrar'}
                        </button>
                    </form>
                    {
                        status.onError && (<ErrorMessage title="Error de Registro" description="No fue posible registrar el apartado, intentalo más tarde"/>)
                    }
                </div>
            </div>
    )
}
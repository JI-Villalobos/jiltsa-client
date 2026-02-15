'use client'

import { failedRequest, initialStatus, pendingRequest, successfullRequest } from "@/app/services"
import { CreateIncomeRegistry, createIncomes, getIncomes } from "@/app/services/api/incomes"
import { getCurrentAccounting } from "@/utils/appStorage"
import { Defaults, Income } from "@/utils/variables"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { LuLoaderCircle } from "react-icons/lu"

interface Props {
    showModal: Dispatch<SetStateAction<boolean>>
}

export const IncomeRegistryModal = ({ showModal }: Props) => {
    const [services, setServices] = useState(0)
    const [products, setProducts] = useState(0)
    const [total, setTotal] = useState(0)
    const [incomeStatus, setIncomeStatus] = useState(initialStatus)
    const [successMessage, setSucccessMesssage] = useState(false)

    const router = useRouter()

    useEffect(() => {
        const accounting = getCurrentAccounting()
        if (!accounting) return

        setIncomeStatus(pendingRequest)
        getIncomes(accounting.accountingId)
            .then((res) => {
                if (res.length > 0) {
                    router.push("/close-operation")
                }
                setIncomeStatus(successfullRequest)
            })
            .catch(() => {
                showModal(false)
            })
    }, [])

    const handleIncomeRegistry = async () => {
        const accounting = getCurrentAccounting()
        if (accounting) {
            setIncomeStatus(pendingRequest)
            const id = accounting.accountingId
            const incomes: CreateIncomeRegistry[] = [
                {
                    accountingId: id,
                    incomeTypeId: Defaults.MEDICAMENTO,
                    tag: Income.MEDICAMENTO,
                    amount: products
                },
                {
                    accountingId: id,
                    incomeTypeId: Defaults.PRONTIPAGOS,
                    tag: Income.PRONTIPAGOS,
                    amount: services
                }
            ]

            await createIncomes(incomes)
                .then(() => {
                    setSucccessMesssage(true)
                    router.push("/close-operation")
                    setIncomeStatus(successfullRequest)
                })
                .catch(() => {
                    setIncomeStatus(failedRequest)
                })
        }
    }


    return (
        <div className="w-full flex flex-col items-center justify-center gap-2">
            <div className="flex flex-col items-center justify-center w-full mb-2">
                <label htmlFor="" className="text-mp-dark text-sm">Prontipagos</label>
                <input
                    type="number"
                    className="p-2 w-1/3 shadow-sm rounded text-center text-sm text-mp-green outline-none border-mp-dark border-opacity-30"
                    onChange={(e) => {
                        const services: number = parseFloat(e.currentTarget.value)
                        setServices(services)
                        setProducts(total - services)
                    }}
                />
            </div>
            <div className="flex flex-col items-center justify-center w-full mb-2">
                <label htmlFor="" className="text-mp-dark text-sm">Medicamento</label>
                <p className="p-2 w-1/3 shadow-sm rounded text-center text-sm text-mp-green outline-none bg-mp-white border-mp-dark border-opacity-30">
                    {
                        typeof products === "number" ? products :
                            0
                    }
                </p>
            </div>
            <div className="flex flex-col items-center justify-center w-full mb-2">
                <label htmlFor="" className="text-mp-dark text-sm">Total de ventas</label>
                <input
                    type="number"
                    className="p-2 w-1/3 shadow-sm rounded text-center text-sm text-mp-green outline-none border-mp-dark border-opacity-30"
                    onChange={(e) => {
                        const total: number = parseFloat(e.currentTarget.value)
                        setTotal(total)
                        setProducts(total - services)
                    }}
                />
            </div>
            <button
                className="mb-4 w-24 rounded shadow flex flex-col items-center justify-center bg-gradient-to-r from-mp-green to-mp-blue p-2 text-mp-white"
                onClick={handleIncomeRegistry}
                disabled={incomeStatus.onLoading || successMessage}
            >
                {
                    incomeStatus.onLoading ? <LuLoaderCircle className="animate-spin" /> : 'Confirmar'
                }
            </button>
            {
                incomeStatus.onError && <p className="mb-2 text-sm text-mp-error">No fue posible registrar los ingresos, intentalo nuevamente</p>
            }
            {
                successMessage &&
                <p className="text-mp-green text-sm p-2 border rounded border-mp-green border-opacity-25 mb-2">
                    Las ventas se registraron exitosamente, espera un momento <span className="animate-pulse">redireccionando...</span>
                </p>
            }
        </div>
    )
}
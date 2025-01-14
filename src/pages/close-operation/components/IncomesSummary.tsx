import ErrorMessage from "@/components/shared/ErrorMessage"
import { IncomeRegistry } from "@/services/api/incomes"
import { formatAmount } from "@/utils/formatAmount"
import { useEffect, useState } from "react"

interface Props {
    incomes: IncomeRegistry[]
}

export default function IncomeSummary({ incomes }: Props): JSX.Element {
    const [totals, setTotals] = useState<number>(0)

    useEffect(() => {
        if (incomes.length > 0) {
            const total = incomes.map(income => income.amount).reduce((result, val) => result + val)
            setTotals(total)
        }
    }, [])

    if (!incomes) {
        return (<ErrorMessage title="Error desconocido" description="Un error inesperado causo qué la información no se muestre correctamente" />)
    }

    return (
        <div>
            <p className="text-center text-2xl font-bold text-mp-blue sm:text-xl m-2">Resumen de Ventas</p>
            <article className="flex flex-col rounded-lg  bg-mp-gray-soft p-2">
                <div className="inline-flex gap-1 self-end rounded bg-mp-light-green p-1 text-mp-green">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                    </svg>

                    <span className="text-xs font-medium"> Ingresos </span>
                </div>

                <div className="flex flex-row w-full items-center justify-center">
                    {
                        incomes.map((income) => (
                            <div key={`income-key-id-${income.id}`} className="flex flex-row items-center  m-4">
                                <strong className="text-sm font-medium text-mp-blue mr-2"> {income.tag}: </strong>
                                <p>
                                    <span className="text-sm font-medium text-mp-dark"> {formatAmount(income.amount)} </span>
                                </p>
                            </div>
                        ))
                    }
                    <div className="flex flex-row items-center  m-4">
                        <strong className="text-sm font-medium text-mp-blue mr-2"> TOTAL: </strong>
                        <p>
                            <span className="text-sm font-medium text-mp-green"> {formatAmount(totals)} </span>
                        </p>
                    </div>
                </div>
            </article>
        </div>
    )
}
import ErrorMessage from "@/app/components/shared/ErrorMessage"
import { IncomeRegistry } from "@/app/services/api/incomes"
import { formatAmount } from "@/utils/formatAmount"
import { useEffect, useState } from "react"
import { LuCircle } from "react-icons/lu"

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
        <>
            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4 bg-mp-gray-soft">
                <dt className="font-medium text-mp-dark">Total de ventas</dt>

                <dd className="text-mp-dark sm:col-span-2">{formatAmount(totals)}</dd>
            </div>


            {
                incomes.map(income => (
                    <div className="grid grid-cols-6 p-3 gap-1" key={income.id}>
                        <dt className="font-medium text-mp-dark flex items-center justify-center">
                            <LuCircle className="text-mp-blue" />
                        </dt>
                        <dt className="font-medium text-mp-dark col-span-1 text-xs">
                            {income.tag}
                        </dt>
                        <dd className="text-mp-green col-span-1 text-xs">{formatAmount(income.amount)}</dd>
                        <dt className="font-medium text-mp-dark col-span-3">
                        </dt>
                    </div>
                ))
            }

        </>
    )
}
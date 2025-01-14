import ErrorMessage from "@/components/shared/ErrorMessage"
import { ExpenseRegistry } from "@/services/api/expenses"
import { formatAmount } from "@/utils/formatAmount"
import { useEffect, useState } from "react"

interface Props {
    expenses: ExpenseRegistry[]
}

export default function ExpensesSummary({ expenses }: Props): JSX.Element {
    const [totals, setTotals] = useState<number>(0)

    useEffect(() => {
        if (expenses.length > 0) {
            const total = expenses.map(expense => expense.amount).reduce((result, val) => result + val)
            setTotals(total)   
        }
    }, [])

    if(!expenses) {
        return(<ErrorMessage title="Error desconocido" description="Un error inesperado causo qué la información no se muestre correctamente"/>)
    }

    return (
        <div className="flow-root mt-6">
            <p className="text-center text-2xl font-bold text-mp-blue sm:text-xl mt-2">Resumen de Gastos</p>
            <dl className="-my-3 divide-y divide-mp-strong-gray text-sm">
                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-mp-strong-gray">Gastos</dt>
                    <dd className="text-gray-mp sm:col-span-2"></dd>
                </div>

                {
                    expenses.map((expense) => (
                        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4" key={`expense-key-id-${expense.id}`}>
                            <dt className="font-medium text-mp-green">{expense.description}</dt>
                            <dd className="text-mp-dark sm:col-span-2">{formatAmount(expense.amount)}</dd>
                        </div>
                    ))
                }
                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-mp-green">TOTAL</dt>
                    <dd className="text-mp-green font-semibold sm:col-span-2">{formatAmount(totals)}</dd>
                </div>
            </dl>
        </div>
    )
}
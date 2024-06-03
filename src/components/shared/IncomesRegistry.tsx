import { RequestStatus, failedRequest, initialStatus, pendingRequest, successfullRequest } from "@/services"
import { CreateIncomeRegistry, createIncomes } from "@/services/api/incomes"
import { getCurrentAccounting, getIncomesRegistered, setIncomesRegistered } from "@/utils/appStorage"
import { formatAmount } from "@/utils/formatAmount"
import { Defaults, Income } from "@/utils/variables"
import { Dispatch, SetStateAction, useState } from "react"
import { STAGES } from "../Expenses"
import Spinner from "../Spinner"
import ErrorMessage from "../ErrorMessage"

interface Props {
    setStage: Dispatch<SetStateAction<number>>
}

type Sales = {
    products: number,
    others: number,
    total: number
}

export default function IncomesRegistry({ setStage }: Props): JSX.Element {
    const [confirmation, setConfirmation] = useState(false)
    const [sales, setSales] = useState<Sales>({ products: 0, others: 0, total: 0 })
    const [status, setStatus] = useState<RequestStatus>(initialStatus)

    const handleCompleteSales = () => {
        const total = sales.total - sales.others
        setSales({ ...sales, products: total })
        setConfirmation(true)
    }

    const handleIncomeRegistries = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setStatus(pendingRequest)
        const accounting = getCurrentAccounting()
        if (accounting) {
            const id = accounting.accountingId
            const incomes: CreateIncomeRegistry[] = [
                {
                    accountingId: id,
                    incomeTypeId: Defaults.MEDICAMENTO,
                    tag: Income.MEDICAMENTO,
                    amount: sales.products
                },
                {
                    accountingId: id,
                    incomeTypeId: Defaults.PRONTIPAGOS,
                    tag: Income.PRONTIPAGOS,
                    amount: sales.others
                }
            ]

            await createIncomes(incomes)
                .then((result) => {
                    setStatus(successfullRequest)
                    setStage(STAGES.SUCCESS)
                    setIncomesRegistered(result)
                })
                .catch(() => {
                    setStatus(failedRequest)
                    setStage(STAGES.FAILED)
                })
        }
    }

    if (getIncomesRegistered()) {
        console.log("call");

        return (
            <div className="flex flex-col items-center justify-center">
                <ErrorMessage
                    description="Al parecer las ventas correspondientes a este turno ya se registraron, de ser así da click en continuar, de lo contrario contacta a tu supervisor"
                    title="Ventas ya registradas"
                />
                <button
                    onClick={() => setStage(STAGES.SUCCESS)}
                    className="border-none bg-none text-mp-blue p-2 underline">
                    Continuar
                </button>
            </div>
        )
    }

    return (
        <div className="w-full flex justify-center">
            {
                confirmation ?
                    <div className="w-1/3 flex flex-col items-center justify-center">
                        <p className="text-mp-green text-2xl font-medium m-4">Confirma que los montos sean correctos</p>

                        <div className="flex flex-row items-center justify-center">
                            <label className="block text-s font-medium text-mp-soft-dark"> Prontipagos </label>

                            <input
                                type="text"
                                className="m-1 w-1/4 rounded-md border border-mp-gray-soft shadow-sm sm:text-sm p-2 text-center text-mp-blue mr-2"
                                readOnly
                                value={formatAmount(sales.others)}
                            />

                            <label className="block text-s font-medium text-mp-soft-dark"> Medicamento </label>

                            <input
                                type="text"
                                className="m-1 w-1/4 rounded-md border border-mp-gray-soft shadow-sm sm:text-sm p-2 text-center text-mp-blue"
                                readOnly
                                value={formatAmount(sales.products)}
                            />
                        </div>
                        <label className="block text-s font-medium text-mp-soft-dark mt-6"> Total </label>

                        <input
                            type="text"
                            className="m-1 w-1/4 rounded-md border border-mp-gray-soft shadow-sm sm:text-sm p-2 text-center text-mp-blue"
                            readOnly
                            value={formatAmount(sales.total)}
                        />
                        <div className="flex flex-row w-full justify-center mt-4">
                            <button
                                className="p-2 bg-mp-soft-dark text-mp-white m-4 w-1/4 rounded"
                                onClick={() => setConfirmation(false)}
                                disabled={status.onLoading}
                            >
                                Regresar
                            </button>
                            <button
                                className="p-2 bg-mp-green text-mp-white m-4 w-1/4 rounded"
                                onClick={handleIncomeRegistries}
                                disabled={status.onLoading}
                            >
                                {status.onLoading ? <Spinner /> : `Confirmar`}
                            </button>
                        </div>
                    </div>
                    :
                    <div className="w-1/3 flex flex-col items-center justify-center">
                        <p className="text-mp-green text-2xl font-medium m-4">Registro de Ventas</p>
                        <label className="block text-s font-medium text-mp-soft-dark"> Ventas Prontipagos </label>

                        <input
                            type="number"
                            placeholder="0.00"
                            className="mt-1 w-1/3 rounded-md border border-mp-gray-soft shadow-sm sm:text-sm p-2 text-center text-mp-blue"
                            onChange={(e) => { setSales({ ...sales, others: parseInt(e.currentTarget.value) }) }}
                        />

                        <label className="block text-s font-medium text-mp-soft-dark mt-8"> Monto Total de Ventas </label>

                        <input
                            type="number"
                            placeholder="0.00"
                            className="mt-1 w-1/3 rounded-md border border-mp-gray-soft shadow-sm sm:text-sm p-2 text-center text-mp-blue"
                            onChange={(e) => { setSales({ ...sales, total: parseInt(e.currentTarget.value) }) }}
                        />
                        <button
                            className="p-2 bg-mp-green text-mp-white m-4 w-1/4 rounded"
                            onClick={handleCompleteSales}
                        >
                            Continuar
                        </button>
                    </div>
            }
        </div>
    )
}
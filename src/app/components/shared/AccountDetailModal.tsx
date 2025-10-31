'use client'

import { Accounting } from "@/app/services/api/accounts"

type Props = {
  seller: string,
  accounting: Accounting | undefined,
}

export const AccountDetailModal = ({ seller, accounting }: Props) => {
    return (
        <div className="flex flex-col w-full items-center justify-center">
            <label htmlFor="timestamp" className="mt-4 flex flex-col w-2/3">
                <span className="text-sm font-medium text-mp-soft-dark"> Timestamp </span>

                <input
                    type="text"
                    id="timestamp"
                    className="mt-0.5 rounded border-mp-soft-dark shadow-sm sm:text-sm p-2 text-center text-mp-dark w-full"
                    value={accounting?.date}
                    readOnly
                />
            </label>
            <label htmlFor="seller" className="mt-4 flex flex-col w-2/3">
                <span className="text-sm font-medium text-mp-soft-dark"> Vendedor(a) </span>

                <input
                    type="text"
                    className="mt-0.5 rounded border-mp-soft-dark shadow-sm sm:text-sm p-2 text-center text-mp-dark w-full"
                    value={seller}
                    readOnly
                />
            </label>
            <div className="w-full flex flex-col items-center justify-center mb-4">
                {
                    accounting?.incomeRegistries.map((income) => (
                        <label htmlFor="seller" className="mt-4 flex flex-col w-2/3" key={income.id}>
                            <span className="text-sm font-medium text-mp-soft-dark"> {income.tag} </span>
                            <input
                                type="seller"
                                id="Email"
                                className="mt-0.5 rounded border-mp-soft-dark shadow-sm sm:text-sm p-2 text-center text-mp-dark w-full"
                                value={income.amount}
                                readOnly
                            />
                        </label>
                    ))
                }
            </div>
            <div className="w-full flex flex-col items-center justify-center mb-4">
                {
                    accounting?.expenseRegistries.map((expense) => (
                        <label htmlFor="seller" className="mt-4 flex flex-col w-2/3" key={expense.id}>
                            <span className="text-sm font-medium text-mp-soft-dark"> {expense.description} </span>
                            <input
                                type="seller"
                                id="Email"
                                className="mt-0.5 rounded border-mp-soft-dark shadow-sm sm:text-sm p-2 text-center text-mp-dark w-full"
                                value={expense.amount}
                                readOnly
                            />
                        </label>
                    ))
                }
            </div>
        </div>
    )
}
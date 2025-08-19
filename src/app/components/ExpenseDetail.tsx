import { CreateExpenseRegistry } from "@/services/api/expenses"
import React, { Dispatch, SetStateAction } from "react"

type Props = {
  expense: Dispatch<SetStateAction<CreateExpenseRegistry>>,
  expenseDetails: CreateExpenseRegistry
}

export default function ExpenseDetail({ expense, expenseDetails }: Props): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center w-1/3  border-r-2 border-mp-strong-gray">
      <input
        type="text"
        name="" id=""
        placeholder="Concepto"
        className="w-2/3 m-2 border border-mp-green rounded text-center text-mp-dark outline-none"
        onChange={( e: React.FormEvent<HTMLInputElement>): void => expense({...expenseDetails, description: e.currentTarget.value})}
      />
      <input
        type="number"
        name=""
        id=""
        placeholder="Monto $"
        className="w-2/3 m-2 border border-mp-green rounded text-center text-mp-dark outline-none"
        onChange={(e: React.FormEvent<HTMLInputElement>): void => expense({...expenseDetails, amount: parseInt(e.currentTarget.value)})}
      />

    </div>
  )
}
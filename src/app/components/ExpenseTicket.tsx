'use client'

import { CurrentAccounting, getCurrentAccounting } from "@/utils/appStorage"
import { useState } from "react"
import { CreateExpenseRegistry } from "../services/api/expenses"

type Props = {
  currentAccounting: CurrentAccounting,
  expense: CreateExpenseRegistry,
}

export default function ExpenseTicket(props: Props): JSX.Element {
  const [currentAccounting, setCurrentAcccounting] = useState<CurrentAccounting>({accountingId: 0, seller: '', date: '', sellerId: 0})

  return (
    <div className="flex flex-col items-center justify-center w-1/3">
      <p className="text-mp-dark text-sm">Corte numero: <span>{props.currentAccounting.accountingId}</span></p>
      <p className="text-mp-dark text-sm">Tipo de gasto: <span>{props.expense.expenseTypeId}</span></p>
      <p className="text-mp-dark text-sm">Vendedora: <span className="text-mp-blue">{props.currentAccounting.seller}</span></p>
      <p className="text-mp-dark text-sm">Descripcion: </p>
      <p className="text-mp-green font-coda text-sm">{props.expense.description}</p>
      <p className="text-mp-dark text-sm">Monto: <span className="text-mp-blue">${props.expense.amount}</span></p>
    </div>
  )
}
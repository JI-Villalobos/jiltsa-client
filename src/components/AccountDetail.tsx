import { Accounting } from "@/services/api/accounts"

type Props = {
  seller: string,
  accounting: Accounting | undefined
}

export default function Details({ seller, accounting }: Props): JSX.Element {
  return (
    <>
      {
        accounting ? (
          <div className="rounded border border-mp-light-green bg-mp-gray-soft mt-6 w-8/12 flex flex-col items-center">
            <p className="font-coda text-mp-dark text-2xl mt-2">Detalle de corte número: <span className="text-mp-blue">{accounting.id}</span></p>
            <p className="font-coda text-mp-dark text-xl mt-2">Timestamp: <span className="text-mp-blue">{accounting.date}</span></p>
            <p className="font-coda text-mp-dark text-xl mt-2">Vendedora: <span className="text-mp-blue">{seller}</span></p>
            <p className="font-coda text-mp-green text-xl mt-2">Ingresos:</p>
            {
              accounting.incomeRegistries?.map(income => (<p key={`income-id${income.id}`} className="font-coda text-mp-dark mt-1">{income.tag}: ${income.amount}</p>))
            }
            <p className="font-coda text-mp-green text-xl mt-2" >Gastos:</p>
            {
              accounting.expenseRegistries?.map(expense => (<p key={`income-id${expense.id}`} className="font-coda text-mp-dark m-1">{expense.description}: ${expense.amount}</p>))
            }
          </div>)
          : <p></p>
      }
    </>
  )
}
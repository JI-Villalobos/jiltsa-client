'use client'

import { BiArrowBack, BiLockOpen } from "react-icons/bi";
import Image from "next/image"
import Link from "next/link";
import { Accounting } from "../services/api/accounts";

type Props = {
  seller: string,
  accounting: Accounting | undefined,
  current: boolean
}

export default function Details({ seller, accounting, current }: Props): JSX.Element {
  return (
    <>
      {
        accounting ? (
          <div className="rounded shadow-lg mt-6 w-1/3 flex flex-col items-center">
            <div className="flex flex-row justify-between w-8/12">
              <Image src="/mp_logo.png" width={70} height={45} alt='mp logo' className='m-2' />
              {
                !current &&
                <Link
                  href={`/expense-delay/${accounting.id}`}
                  className="text-mp-blue rounded-full border flex border-mp-blue border-opacity-30 items-center justify-center w-12 h-12 hover:bg-mp-white"
                >
                  <BiLockOpen size={30} />
                </Link>
              }
            </div>
            <p className="text-mp-dark text-2xl w-10/12 text-center m-6 border-b-2 border-mp-strong-gray">Detalle de corte número: <span className="text-mp-blue">{accounting.id}</span></p>
            <p className="text-mp-dark text-xl mt-2">Timestamp: <span className="text-mp-blue">{accounting.date}</span></p>
            <p className="text-mp-dark text-xl mt-2">Vendedora: <span className="text-mp-blue">{seller}</span></p>
            <span className="mt-4 border-b-2 border-mp-strong-gray w-1/2"></span>
            <p className="text-mp-green text-xl font-bold">Ingresos:</p>
            {
              accounting.incomeRegistries?.map(income => (<p key={`income-id${income.id}`} className="text-mp-dark mt-1">{income.tag}: ${income.amount}</p>))
            }
            <span className="mt-4 border-b-2 border-mp-strong-gray w-1/2"></span>
            <p className="text-mp-green text-xl mt-2 font-bold" >Gastos:</p>
            {
              accounting.expenseRegistries?.map(expense => (<p key={`income-id${expense.id}`} className="text-mp-dark mt-1">{expense.description}: ${expense.amount}</p>))
            }
            <Link href={"/seller-home"} className="m-6 text-mp-blue font-semibold flex flex-row items-center">
              <BiArrowBack />
              Regresar
            </Link>
          </div>)
          : <p></p>
      }
    </>
  )
}
'use client'

import { Accounting } from "../services/api/accounts";
import RowReport from "./RowReport";

type Props = {
  accounts: Accounting[]
}

export default function TableReport({ accounts }: Props): JSX.Element {
  return (

    <table className='overflow-x-auto divide-y-2 divide-mp-strong-gray text-base w-1/2'>
      <thead className="ltr:text-left rtl:text-right rounded shadow">
        <tr>
          <th className='whitespace-nowrap px-4 py-2 font-medium text-mp-soft-dark text-sm'>Fecha</th>
          <th className='whitespace-nowrap px-4 py-2 font-medium text-mp-soft-dark text-sm'>Vendedora</th>
          <th className='whitespace-nowrap px-4 py-2 font-medium text-mp-soft-dark text-sm'>Medicamento</th>
          <th className='whitespace-nowrap px-4 py-2 font-medium text-mp-soft-dark text-sm'>Prontipagos</th>
          <th className='whitespace-nowrap px-4 py-2 font-medium text-mp-soft-dark text-sm'>Total</th>
          <th className='whitespace-nowrap px-4 py-2 font-medium text-mp-soft-dark text-sm'>Gastos</th>
          <th className='whitespace-nowrap px-4 py-2 font-medium text-mp-soft-dark text-sm'>Estado</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-mp-strong-gray">
        {accounts.map((account) => (
          <RowReport key={`acc-id-${account.id}`} account={account} />
        ))}
      </tbody>
    </table>
  )
}

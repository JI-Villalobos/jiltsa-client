import { Accounting } from "@/services/api/accounts";
import RowReport from "./RowReport";

type Props = {
  accounts: Accounting[]
}

export default function TableReport({ accounts }: Props): JSX.Element {
  return (
    
    <table className='overflow-x-auto divide-y-2 divide-mp-strong-gray text-base w-1/2'>
      <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className='whitespace-nowrap px-4 py-2 font-medium text-mp-dark'>Fecha</th>
            <th className='whitespace-nowrap px-4 py-2 font-medium text-mp-dark'>Vendedora</th>
            <th className='whitespace-nowrap px-4 py-2 font-medium text-mp-dark'>Prontipagos</th>
            <th className='whitespace-nowrap px-4 py-2 font-medium text-mp-dark'>Medicamento</th>
            <th className='whitespace-nowrap px-4 py-2 font-medium text-mp-dark'>Total</th>
            <th className='whitespace-nowrap px-4 py-2 font-medium text-mp-dark'>Gastos</th>
          </tr>
        </thead>
      <tbody className="divide-y divide-mp-strong-gray">  
        {accounts.map((account) => (
          <RowReport key={`acc-id-${account.id}`} account={account}/>
        ))}
      </tbody>
    </table>
  )
}
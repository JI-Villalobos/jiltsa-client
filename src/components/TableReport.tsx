import { Accounting } from "@/services/api/accounts";
import RowReport from "./RowReport";

type Props = {
  accounts: Accounting[]
}

export default function TableReport({ accounts }: Props): JSX.Element {
  return (
    <table className='bg-mp-gray-soft rounded table-fixed w-10/12 mt-6'>
      <tbody>
        <tr>
          <th className='text-mp-green font-coda text-center'>Fecha</th>
          <th className='text-mp-green font-coda text-center'>Vendedora</th>
          <th className='text-mp-green font-coda text-center'>Prontipagos</th>
          <th className='text-mp-green font-coda text-center'>Medicamento</th>
          <th className='text-mp-green font-coda text-center'>Total</th>
          <th className='text-mp-green font-coda text-center'>Gastos</th>
        </tr>
        {accounts.map((account) => (
          <RowReport key={`acc-id-${account.id}`} account={account}/>
        ))}
      </tbody>
    </table>
  )
}
'use client'

import page from "@/app/seller-home/page"
import { PageCashWithdrawal } from "@/app/services/api/withdrawals"
import { CashWithdrawalRow } from "./CashWithdrawalRow"

interface Props {
    page: PageCashWithdrawal
}

export const CashWithdrawalTable = ({ page }: Props) => {
    return (
        <table className='overflow-x-auto divide-y-2 divide-mp-strong-gray text-base w-1/2'>
            <thead className="ltr:text-left rtl:text-right rounded shadow">
                <tr>
                    <th className='whitespace-nowrap px-4 py-2 font-medium text-mp-soft-dark text-sm'>Fecha</th>
                    <th className='whitespace-nowrap px-4 py-2 font-medium text-mp-soft-dark text-sm'>Vendedora</th>
                    <th className='whitespace-nowrap px-4 py-2 font-medium text-mp-soft-dark text-sm'>Concepto</th>
                    <th className='whitespace-nowrap px-4 py-2 font-medium text-mp-soft-dark text-sm'>Monto</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-mp-strong-gray">
                {page.content.map((cw) => (
                  <CashWithdrawalRow key={`acc-id-${cw.id}`} cw={cw} />
                ))}
            </tbody>
        </table>
    )
}
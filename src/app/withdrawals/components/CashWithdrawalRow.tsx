'use client'

import { CashWithdrawal } from "@/app/services/api/withdrawals"
import DateFormat from "@/utils/DateFormat"
import { formatAmount } from "@/utils/formatAmount"
import clsx from "clsx"

interface Props {
    cw: CashWithdrawal
}

export const CashWithdrawalRow = ({ cw }: Props) => {

    return (
        <>
            <tr
                className={clsx(
                    'text-center hover:bg-mp-strong-gray hover:cursor-pointer',
                    {
                        'bg-mp-white': cw.id % 2 == 0
                    }
                )}
            >
                <td className='whitespace-nowrap px-4 py-2 text-mp-soft-dark text-xs'>{DateFormat(cw.date!)}</td>
                <td className='whitespace-nowrap px-4 py-2 text-mp-blue text-xs'>{cw.sellerName}</td>
                <td className='whitespace-nowrap px-4 py-2 text-mp-blue text-xs'>{cw.concept}</td>
                <td className='whitespace-nowrap px-4 py-2 text-mp-green text-xs'>{formatAmount(cw.amount)}</td>
            </tr>
        </>
    )
}
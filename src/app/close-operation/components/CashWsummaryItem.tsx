import { CashWithdrawal } from "@/app/services/api/withdrawals"
import { formatAmount } from "@/utils/formatAmount"

interface Props {
    cashItem: CashWithdrawal
}

export default function CashWSummaryItem({ cashItem }: Props): JSX.Element {
    if (!cashItem) {
        return (<></>)
    }
    return (
        <div className="grid gap-1 p-3 grid-cols-4 sm:gap-6">
            <dt className="font-medium text-mp-dark">Ref: <span className="text-mp-strong-red">{cashItem.id}</span></dt>
            <dt className="font-medium text-mp-dark">Concepto: <span className="text-mp-blue">{cashItem.concept}</span></dt>
            <dt className="font-medium text-mp-dark">Por: <span className="text-mp-blue">{cashItem.sellerName}</span></dt>
            <dt className="font-medium text-mp-dark">Monto: <span className="text-mp-green">{formatAmount(cashItem.amount)}</span></dt>
        </div>
    )
}
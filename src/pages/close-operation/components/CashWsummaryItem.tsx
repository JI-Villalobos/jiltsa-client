import { CashWithdrawal } from "@/services/api/withdrawals"
import { formatAmount } from "@/utils/formatAmount"

interface Props {
    cashItem: CashWithdrawal
}

export default function CashWSummaryItem({ cashItem }: Props): JSX.Element {
    if (!cashItem) {
        return (<></>)
    }
    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 p-1 m-2 shadow-lg text-sm">
            <div className="text-center text-mp-blue"><span className="text-mp-green">Ref: </span>{cashItem.id}</div>
            <div className="text-center text-mp-dark"><span className="text-mp-green">Concepto: </span>{cashItem.concept}</div>
            <div className="text-center text-mp-blue"><span className="text-mp-green">Por: </span>{cashItem.sellerName}</div>
            <div className="text-center text-mp-error"><span className="text-mp-green">Monto: </span>{formatAmount(cashItem.amount)}</div>
        </div>
    )
}
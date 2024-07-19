import { CreditSale } from "@/services/api/creditSales"
import DateFormat from "@/utils/DateFormat"
import { formatAmount } from "@/utils/formatAmount"

interface Props {
    sale: CreditSale
}

export default function CreditSaleItem({ sale }: Props): JSX.Element {
   
    if (!sale) {
        return( 
            <div className="mx-auto bg-white shadow-lg w-8/12 rounded-2xl">
                <div className="h-12 p-3 overflow-hidden bg-mp-gray-soft animate-pulse rounded-2xl">
                </div>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-10 gap-1 items-center w-2/4 shadow-lg p-2 rounded">
            {
                sale.isPaid ? <div className="bg-mp-light-green text-mp-white text-xs text-center rounded p-1 flex col-start-1 col-end-2">Pagado</div>
                : <div className="bg-mp-error text-mp-white text-xs text-center rounded p-1 flex col-start-1 col-end-2">Pendiente</div>
            }
            <div className="flex flex-row text-sm m-2 col-start-2 col-end-4">
                <p className="text-mp-dark mr-1">Número de Apartado:</p>
                <p className="text-mp-blue">{sale.id}</p>
            </div>
            <div className="flex flex-col m-2 col-start-4 col-end-8">
                <p className="text-mp-green font-semibold">{sale.concept}</p>
                <div className="flex flex-row text-sm">
                    <p className="text-mp-dark mr-1">Fecha apartado: </p>
                    <p className="text-mp-blue">{DateFormat(sale.date)}</p>
                </div>
            </div>
            <div className="flex flex-row items-center col-start-8 col-end-9">
                <p className="text-mp-green mr-1">Monto: </p>
                <p className="text-mp-blue">{formatAmount(sale.amount)}</p>
            </div>
            <div className="col-start-10 col-end-10 flex justify-center items-center">
                <button className="bg-mp-blue flex flex-row p-2 rounded text-mp-white self-center">

                    Abonar
                </button>
            </div>
        </div>
    )
}
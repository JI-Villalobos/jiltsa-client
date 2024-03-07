import Spinner from "@/components/Spinner"
import { RequestStatus } from "@/services"
import { Bill, getBillById } from "@/services/api/billing"
import DateFormat from "@/utils/DateFormat"
import { formatAmount } from "@/utils/formatAmount"
import { NextRouter, useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function BillDetail() {
  const req: RequestStatus = {
    onLoading: false,
    onSuccess: false,
    onError: false
  }

  const router: NextRouter = useRouter()
  const { id } = router.query
  const [status, setStatus] = useState<RequestStatus>(req)
  const [bill, setBill] = useState<Bill>()

  useEffect(() => {
    setStatus({ ...status, onLoading: true })
    if (id && typeof id === 'string') {
      getBillById(parseInt(id))
        .then((result) => {
          setBill(result)
          setStatus({ ...req, onLoading: false })
        })
        .catch((error) => {
          setStatus({ ...req, onError: true })
          console.log(error);

        })
    }

  }, [])


  return (
    <div className="fixed inset-0  bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="p-8 border w-96 shadow-mp-strong-gray rounded-md bg-white">
        <div className="text-center">

          {
            status.onLoading ? <Spinner bgBlank />
              : bill ? (

                <div className="flow-root">
                  <dl className="-my-3 divide-y divide-mp-strong-gray text-sm">
                    <div className="text-center text-lg text-mp-dark">
                      Detalle de Factura
                    </div>
                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                      <dt className="font-medium text-mp-soft-dark">Sucursal</dt>
                      <dd className="text-mp-green sm:col-span-2">{bill.branch}</dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                      <dt className="font-medium text-mp-soft-dark">Folio</dt>
                      <dd className="text-mp-dark sm:col-span-2">{bill.invoice}</dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                      <dt className="font-medium text-mp-soft-dark">Fecha</dt>
                      <dd className="text-mp-blue sm:col-span-2">{DateFormat(bill.date)}</dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                      <dt className="font-medium text-mp-soft-dark">Monto</dt>
                      <dd className="text-mp-green sm:col-span-2">{formatAmount(bill.amount)}</dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                      <dt className="font-medium text-mp-soft-dark">Fecha Limite de Pago</dt>
                      <dd className="text-mp-blue sm:col-span-2">{DateFormat(bill.limitPaymentDate)}</dd>
                    </div>

                    {
                      bill.isPaid ? (
                        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                          <dt className="font-medium text-mp-soft-dark">Ticket de Pago</dt>
                          <dd className="text-mp-blue text-xs sm:col-span-2">{bill.paymentTicket}</dd>
                        </div>)
                        : <div>
                          <p className="text-center text-mp-error m-2">Pendiente de Pago</p>
                        </div>
                    }
                    {
                      bill.isActive ? (
                        <div>
                          <p className="text-center text-mp-error m-2">Pendiente de Recpción</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                          <dt className="font-medium text-mp-soft-dark">Fecha de Recepción</dt>
                          <dd className="text-mp-blue sm:col-span-2">{DateFormat(bill.receptionDate)}</dd>
                        </div>
                      )
                    }

                  </dl>
                </div>
              )
                : <p>Erorr</p>
          }
          <div className="flex justify-center mt-4">


            <button
              onClick={router.back}
              className="px-4 py-2 bg-mp-blue text-mp-gray-soft text-base font-medium rounded-md shadow-sm hover:bg-mp-soft-dark focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Regresar
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}
import Spinner from "@/components/shared/Spinner"
import { RequestStatus, failedRequest, initialStatus, pendingRequest, successfullRequest } from "@/services"
import { Bill, updateBills } from "@/services/api/billing"
import { CreatePayment, createPayment, getPaymentTicket } from "@/services/api/payment"
import { getBills } from "@/utils/appStorage"
import { formatAmount } from "@/utils/formatAmount"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

type Props = {
  setStep: Dispatch<SetStateAction<number>>
}

/**
 * @deprecated this component will be removed soon
 */
export default function PaymentForm({ setStep }: Props): JSX.Element {
  const [date, setDate] = useState('')
  const [status, setStatus] = useState<RequestStatus>(initialStatus)
  const [total, setTotal] = useState<number>(0)
  const [ticket, setTicket] = useState('')

  const computeTotal = (bills: Bill[]): number => {
    const total = bills.reduce((accum, bill) => {
      return accum += bill.amount
    }, 0)

    return total;
  }

  const alterBills = (bills: Bill[]) => {
    bills.forEach(bill => {
      bill.isPaid = true
      bill.paymentTicket = ticket
    })

    return bills
  }

  const handleCreatePayment = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const bills = getBills()
    if (bills) {
      const payment: CreatePayment = {
        date: date,
        amount: total,
        ticket: ticket
      }
      setStatus(pendingRequest)
      await createPayment(payment)
        .then((result) => {
          const paidBills = alterBills(bills)
          updateBills(paidBills)
            .then(() => {
              setStatus(successfullRequest)
              setStep(3)
            })
            .catch(() => {
              setStatus(failedRequest)
            })
        })
        .catch((error) => {
          setStatus(failedRequest)
        })
    }
  }

  useEffect(() => {
    const bills = getBills()
    if (bills) {
      setTotal(computeTotal(bills))
    }
    getPaymentTicket()
      .then((result) => {
        setTicket(result)
      }).catch((error) => {
        setTicket("No fue posible obtener referencia de pago")
      })
  }, [])

  return (
    <div className="mt-6 flex flex-col justify-center items-center bg-mp-gray-soft w-4/12">
      <label htmlFor="date" className="text-xs text-center text-mp-dark m-2">
        Identificador de pago
      </label>
      <label htmlFor="date" className="text-xs text-center text-mp-green m-2">
        {ticket}
      </label>
      <label htmlFor="date" className="text-xs text-center text-mp-dark m-2">
        Selecciona fecha de Pago
      </label>
      <input
        type="datetime-local"
        name=""
        className="w-1/2 text-xs text-mp-dark m-2 rounded p-2" id=""
        onChange={(e: React.FormEvent<HTMLInputElement>) => setDate(e.currentTarget.value)}
      />
      <label htmlFor="date" className="text-xs text-center text-mp-dark m-2">
        Monto del Pago: <span className="text-mp-blue">{formatAmount(total)}</span>
      </label>
      <input
        type="number"
        name=""
        className="w-1/2 text-xs text-mp-green m-2 rounded p-2" id=""
        placeholder="Modificar monto del pago"
        onChange={(e: React.FormEvent<HTMLInputElement>) => setTotal(parseInt(e.currentTarget.value))}
      />
      <button onClick={handleCreatePayment} className="text-sm bg-mp-dark text-mp-gray-soft  rounded m-2 p-2">
        {
          status.onLoading ? <div className="flex items-center"><Spinner /></div> : 'Confirmar'
        }
      </button>
      {
        status.onError && (<p className="text-center text-mp-error">Ocurrio un error al intentar confirmar el pago de las facturas, intentalo mas tarde</p>)
      }
    </div>
  )
}
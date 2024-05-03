import Spinner from "@/components/Spinner";
import Layout from "@/layouts/Layout";
import { RequestStatus } from "@/services";
import { CashWithdrawal, getCashRegistries } from "@/services/api/withdrawals";
import DateFormat from "@/utils/DateFormat";
import { formatAmount } from "@/utils/formatAmount";
import { conceptList } from "@/utils/variables";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function BranchWithdrawals(): JSX.Element {
  const [status, setStatus] = useState<RequestStatus>({ onError: false, onLoading: false, onSuccess: false })
  const [cashWithdrawals, setCashWithdrawals] = useState<CashWithdrawal[]>([])

  const router = useRouter()
  const { branch } = router.query

  const match = (option: string): boolean => {
    return conceptList.includes(option)
  }

  useEffect(() => {
    setStatus({ ...status, onLoading: true })
    if (typeof branch === 'string') {
      getCashRegistries(branch)
        .then((result) => {
          setCashWithdrawals(result)
          setStatus({ ...status, onLoading: false })
        })
        .catch(() => {
          setStatus({ ...status, onError: true })
        })
    }
  }, [])

  return (
    <Layout>
      <div className="mt-6 w-full flex flex-col items-center justify-center">
        <p className="text-xl text-mp-green m-2 font-semibold">Registro de Retiros sucursal <span>{branch}</span></p>
        <div className="grid grid-cols-1 lg:grid-cols-4 w-1/2 p-1 bg-mp-green m-1 rounded text-mp-white">
          <div className="rounded-lg ">Fecha</div>
          <div className="rounded-lg ">Concepto</div>
          <div className="rounded-lg ">Monto</div>
          <div className="rounded-lg ">Registrado Por</div>
        </div>
        {
          status.onLoading ? <Spinner bgBlank /> :
            (cashWithdrawals.map((cashWithdrawal) => (
              <div className="grid grid-cols-1 lg:grid-cols-4 w-1/2 p-1 border border-mp-gray-soft m-1" key={`cash-w-id-${cashWithdrawal.id}`}>
                <div className="text-mp-green text-sm">{DateFormat(cashWithdrawal.date!)}</div>
                <div 
                  className={
                    cashWithdrawal.concept == conceptList[0] ? 
                      `text-mp-white bg-mp-dark rounded-sm text-center text-sm w-2/3` 
                    : match(cashWithdrawal.concept) ?
                      `text-mp-white bg-mp-blue rounded-sm text-center text-sm w-2/3` 
                    : `text-mp-white bg-mp-soft-dark rounded-sm text-center text-sm w-2/3`
                      
                    }
                >
                  {cashWithdrawal.concept}
                </div>
                <div className="text-mp-blue text-sm">{formatAmount(cashWithdrawal.amount)}</div>
                <div className="text-mp-dark text-sm">{cashWithdrawal.sellerName}</div>
              </div>
            )))
        }
      </div>
    </Layout>
  )
}

/**
 * <div className="flex flex-row items-center justify-between w-1/2 bg-mp-strong-gray rounded m-2 p-1" key={`cash-w-id-${cashWithdrawal.id}`}>
                <p className="text-mp-blue mr-1 text-sm text-center">{DateFormat(cashWithdrawal.date!)}</p>
                <p className="text-mp-dark mr-1 text-sm text-center">{cashWithdrawal.concept}</p>
                <p className="text-mp-blue mr-1 text-sm text-center">${cashWithdrawal.amount}</p>
                <p className="text-mp-green mr-1 text-sm text-center">{cashWithdrawal.sellerName}</p>
              </div>
 */
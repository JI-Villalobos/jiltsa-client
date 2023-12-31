import Spinner from "@/components/Spinner";
import Layout from "@/layouts/Layout";
import { RequestStatus } from "@/services";
import { CashWithdrawal, getCashRegistries } from "@/services/api/withdrawals";
import DateFormat from "@/utils/DateFormat";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function BranchWithdrawals(): JSX.Element {
  const [status, setStatus] = useState<RequestStatus>({ onError: false, onLoading: false, onSuccess: false })
  const [cashWithdrawals, setCashWithdrawals] = useState<CashWithdrawal[]>([])

  const router = useRouter()
  const { branch } = router.query

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
      <>
        <p className="text-xl text-mp-dark font-coda font-semibold">Registro de Retiros sucursal <span>{branch}</span></p>
        {
          status.onLoading ? <Spinner bgBlank /> :
            (cashWithdrawals.map((cashWithdrawal) => (
              <div className="flex flex-row items-center justify-between w-1/2 bg-mp-strong-gray rounded m-2 p-1" key={`cash-w-id-${cashWithdrawal.id}`}>
                <p className="text-mp-blue mr-1 text-sm text-center">{DateFormat(cashWithdrawal.date!)}</p>
                <p className="text-mp-dark mr-1 text-sm text-center">{cashWithdrawal.concept}</p>
                <p className="text-mp-blue mr-1 text-sm text-center">${cashWithdrawal.amount}</p>
                <p className="text-mp-green mr-1 text-sm text-center">{cashWithdrawal.sellerName}</p>
              </div>
            )))
        }
      </>
    </Layout>
  )
}
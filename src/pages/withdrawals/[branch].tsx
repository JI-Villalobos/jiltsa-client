import Spinner from "@/components/shared/Spinner";
import Layout from "@/layouts/Layout";
import { RequestStatus, failedRequest, initialStatus, pendingRequest, successfullRequest } from "@/services";
import { PageCashWithdrawal, getLatestCashRegistries } from "@/services/api/withdrawals";
import DateFormat from "@/utils/DateFormat";
import { formatAmount } from "@/utils/formatAmount";
import { conceptList } from "@/utils/variables";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ErrorMessage from "@/components/shared/ErrorMessage";
import Pagination from "@/components/shared/Pagination";

export default function BranchWithdrawals(): JSX.Element {
  const [status, setStatus] = useState<RequestStatus>(initialStatus)
  const [page, setPage] = useState<PageCashWithdrawal>()
  const [pageNumber, setPageNumber] = useState(0)

  const router = useRouter()
  const { branch } = router.query

  const match = (option: string): boolean => {
    return conceptList.includes(option)
  }

  useEffect(() => {
    setStatus(pendingRequest)
    if (typeof branch === 'string') {
      getLatestCashRegistries(branch, pageNumber)
        .then((result) => {
          setPage(result)
          setStatus(successfullRequest)
        })
        .catch(() => {
          setStatus(failedRequest)
        })
    }
  }, [pageNumber])

  return (
    <Layout>
      <div className="mt-6 w-full flex flex-col items-center justify-center">
        <p className="text-xl text-mp-green m-2 font-semibold">Registro de Retiros sucursal: <span className="text-mp-blue">{branch}</span></p>
        <div className="grid grid-cols-1 lg:grid-cols-4 w-1/2 p-1 bg-mp-green m-1 rounded text-mp-white">
          <div className="rounded-lg ">Fecha</div>
          <div className="rounded-lg ">Concepto</div>
          <div className="rounded-lg ">Monto</div>
          <div className="rounded-lg ">Registrado Por</div>
        </div>
        {
          status.onLoading ? <Spinner bgBlank />
            : page ?
              (page.content.map((cashWithdrawal) => (
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
              : <ErrorMessage
                title="Error"
                description="No fue posible cargar el registro de retiros, intentalo más tarde"
              />
        }
      </div>
      <div className="m-2">
        {
          page && <Pagination setNumberPage={setPageNumber} pages={page.totalPages} currentPage={pageNumber} />
        }
      </div>
    </Layout>
  )
}
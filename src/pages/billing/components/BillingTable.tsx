import { Mode } from "@/services/api/pagination";
import HeaderTable from "./HeaderTable";
import RowTable from "./RowTable";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Bill, PageBill, getBills, getPendingBills } from "@/services/api/billing";
import { RequestStatus, failedRequest, initialStatus, pendingRequest, successfullRequest } from "@/services";
import Spinner from "@/components/shared/Spinner";
import { clearBillStorage } from "@/utils/appStorage";
import Pagination from "./Pagination";
import ErrorMessage from "@/components/shared/ErrorMessage";

export interface Props {
  mode: Mode
  selectedBills: Bill[]
  setSelectedBills: Dispatch<SetStateAction<Bill[]>>
  selectedAmount: number
  setSelectedAmount: Dispatch<SetStateAction<number>>
}

/**
 * @deprecated this component will be removed soon
 */
export default function BillingTable({ mode, setSelectedBills, selectedBills, setSelectedAmount, selectedAmount }: Props): JSX.Element {
  const [page, setPage] = useState<PageBill>()
  const [status, setStatus] = useState<RequestStatus>(initialStatus)
  const [numberPage, setNumberPage] = useState(0)

  useEffect(() => {
    clearBillStorage()
    setStatus(pendingRequest)
    if (mode == Mode.PENDING) {
      getPendingBills(numberPage)
        .then((result) => {
          setPage(result)
          setStatus(successfullRequest)
        })
        .catch(() => {
          setStatus(failedRequest)
        })
    } else if (mode == Mode.ALL) {
      getBills(numberPage)
        .then((result) => {
          setPage(result)
          setStatus(successfullRequest)
        })
        .catch((error) => {
          setStatus(failedRequest)
        })
    }

  }, [mode, numberPage])

  return (
    <>
      {
        status.onLoading ? (<div className="w-full flex items-center justify-center"><Spinner bgBlank /></div>)
          : page ? (
            <>
              <table className="overflow-x-auto divide-y-2 divide-mp-strong-gray text-sm">
                <HeaderTable />
                <tbody className="divide-y divide-mp-strong-gray">
                  {
                    page?.content.map((bill) => (
                      <RowTable
                        selectedAmount={selectedAmount}
                        setSelectedAmount={setSelectedAmount}
                        bills={selectedBills}
                        bill={bill}
                        setSelectedBills={setSelectedBills}
                        key={`bill-idd-${bill.id}`}
                      />
                    ))
                  }
                </tbody>
              </table>
              <div className="w-full mt-4 flex justify-center">
                <Pagination pages={page.totalPages} setNumberPage={setNumberPage} currentPage={numberPage} />
              </div>
            </>
          )
            : <ErrorMessage
                title="Error"
                description="No fue posible cargar el registro de facturas, intentalo más tarde"
              />
      }
    </>
  )
}
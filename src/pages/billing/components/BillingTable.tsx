import { Mode } from "@/services/api/pagination";
import HeaderTable from "./HeaderTable";
import RowTable from "./RowTable";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Bill, PageBill, getBills, getPendingBills } from "@/services/api/billing";
import { RequestStatus } from "@/services";
import BillingPagination from "./BillingPagination";
import Spinner from "@/components/Spinner";
import { clearBillStorage } from "@/utils/appStorage";

export interface Props {
  mode: Mode
  selectedBills: Bill[]
  setSelectedBills: Dispatch<SetStateAction<Bill[]>>
  selectedAmount: number
  setSelectedAmount: Dispatch<SetStateAction<number>>
}

export default function BillingTable({ mode, setSelectedBills, selectedBills, setSelectedAmount, selectedAmount }: Props): JSX.Element {
  const [page, setPage] = useState<PageBill>()
  const [status, setStatus] = useState<RequestStatus>({ onError: false, onLoading: false, onSuccess: false })
  const [numberPage, setNumberPage] = useState(0)

  useEffect(() => {
    clearBillStorage()
    setStatus({ ...status, onLoading: true })
    if (mode == Mode.PENDING) {
      getPendingBills(numberPage)
        .then((result) => {
          setPage(result)
          setStatus({ ...status, onLoading: false, onSuccess: true })
        })
        .catch((error) => {
          setStatus({ ...status, onError: true })
        })
    } else if (mode == Mode.ALL) {
      getBills(numberPage)
        .then((result) => {
          setPage(result)
          setStatus({ ...status, onLoading: false })
        })
        .catch((error) => {
          setStatus({ ...status, onError: true })
          console.log(error);

        })
    }

  }, [mode, numberPage])

  return (
    <>
      {
        status.onLoading ? (<div className="w-full flex items-center justify-center"><Spinner bgBlank /></div>)
          : page ? (
          <div className="w-1/2">
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
              <BillingPagination pages={page.totalPages} setNumberPage={setNumberPage} currentPage={numberPage} />
            </div>
          </div>
          )  
          : <p>Error</p>
      }
    </>
  )
}
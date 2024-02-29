import { Mode } from "@/services/api/pagination";
import HeaderTable from "./HeaderTable";
import RowTable from "./RowTable";
import { useEffect, useState } from "react";
import { PageBill, getBills, getPendingBills } from "@/services/api/billing";
import { RequestStatus } from "@/services";
import BillingPagination from "./BillingPagination";
import Spinner from "@/components/Spinner";

export interface Props {
  mode: Mode
}

export default function BillingTable({ mode }: Props): JSX.Element {
  const [page, setPage] = useState<PageBill>()
  const [status, setStatus] = useState<RequestStatus>({ onError: false, onLoading: false, onSuccess: false })
  const [numberPage, setNumberPage] = useState(0)

  useEffect(() => {
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
    console.log(page?.content);

  }, [mode])

  return (
    <>
      {
        status.onLoading ? <Spinner bgBlank />
          : status.onSuccess ? (<>
            <table className="min-w-full divide-y-2 divide-mp-strong-gray text-sm">
              <HeaderTable />
              <tbody className="divide-y divide-mp-strong-gray">
                {
                  page?.content.map((bill) => (<RowTable bill={bill} />))
                }
              </tbody>
            </table>
            <div className="w-full mt-4 flex justify-center">
              <BillingPagination />
            </div>
          </>)
            : <p>Error</p>
      }
    </>
  )
}
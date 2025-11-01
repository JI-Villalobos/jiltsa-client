'use client'

import SessionInfo from "@/app/components/SessionInfo";
import CloseOperationButton from "@/app/components/shared/CloseOperationButton";
import Error from "@/app/components/shared/Error";
import Skeleton from "@/app/components/Skeleton";
import TableReport from "@/app/components/TableReport";
import Layout from "@/app/layouts/Layout";
import { failedRequest, initialStatus, pendingRequest, RequestStatus, successfullRequest } from "@/app/services";
import { Accounting, getLatestRegistries } from "@/app/services/api/accounts";
import { getBranchId, getCurrentAccounting } from "@/utils/appStorage";
import { useEffect, useState } from "react";
import { isAuth } from "../hoc/isAuth";

function SellerHome(): JSX.Element {
  const [status, setStatus] = useState<RequestStatus>(initialStatus)
  const [accounts, setAccounts] = useState<Accounting[]>([])

  useEffect(() => {
    const branchId = getBranchId()
    if (branchId) {
      setStatus(pendingRequest)
      getLatestRegistries(branchId).then((result) => {
        setAccounts(result)
        setStatus(successfullRequest)
      }).catch(() => {
        setStatus(failedRequest)
      })
    }
  }, [])

  return (
    <Layout>
      <>
        <SessionInfo />
        <div className="w-1/2 flex flex-row justify-end">
          {
            getCurrentAccounting() && <CloseOperationButton />
          }
        </div>
        <p className='mt-2 text-xl text-mp-dark'>Actividad Reciente:</p>
        <table className="w-1/2 text-left table-auto min-w-max">
          <thead>
            <tr>
              <th className="p-4 border-b border-mp-strong-gray bg-slate-50">
                <p className="text-sm font-normal leading-none text-mp-dark">
                  Invoice Number
                </p>
              </th>
              <th className="p-4 border-b border-mp-strong-gray bg-slate-50">
                <p className="text-sm font-normal leading-none text-mp-dark">
                  Customer
                </p>
              </th>
              <th className="p-4 border-b border-mp-strong-gray bg-slate-50">
                <p className="text-sm font-normal leading-none text-mp-dark">
                  Amount
                </p>
              </th>
              <th className="p-4 border-b border-mp-strong-gray bg-slate-50">
                <p className="text-sm font-normal leading-none text-mp-dark">
                  Issued
                </p>
              </th>
              <th className="p-4 border-b border-mp-strong-gray bg-slate-50">
                <p className="text-sm font-normal leading-none text-mp-dark">
                  Due Date
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-slate-50 border-b border-slate-200">
              <td className="p-4 py-5">
                <p className="block font-semibold text-sm text-slate-800">PROJ1001</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">John Doe</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">$1,200.00</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">2024-08-01</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">2024-08-15</p>
              </td>
            </tr>
            <tr className="hover:bg-slate-50 border-b border-slate-200">
              <td className="p-4 py-5">
                <p className="block font-semibold text-sm text-slate-800">PROJ1002</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">Jane Smith</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">$850.00</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">2024-08-05</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">2024-08-20</p>
              </td>
            </tr>
            <tr className="hover:bg-slate-50 border-b border-slate-200">
              <td className="p-4 py-5">
                <p className="block font-semibold text-sm text-slate-800">PROJ1003</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">Acme Corp</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">$2,500.00</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">2024-08-07</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">2024-08-21</p>
              </td>
            </tr>
            <tr className="hover:bg-slate-50 border-b border-slate-200">
              <td className="p-4 py-5">
                <p className="block font-semibold text-sm text-slate-800">PROJ1004</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">Global Inc</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">$4,750.00</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">2024-08-10</p>
              </td>
              <td className="p-4 py-5">
                <p className="text-sm text-slate-500">2024-08-25</p>
              </td>
            </tr>
          </tbody>
        </table>
        {status.onLoading ? <Skeleton /> : status.onError ? <Error /> : <TableReport accounts={accounts} />}
      </>
    </Layout>
  )
}

export default isAuth(SellerHome)
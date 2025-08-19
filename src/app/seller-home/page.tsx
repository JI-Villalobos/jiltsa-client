'use client'

import SessionInfo from "@/app/components/SessionInfo";
import CloseOperationButton from "@/app/components/shared/CloseOperationButton";
import Error from "@/app/components/shared/Error";
import Skeleton from "@/app/components/Skeleton";
import TableReport from "@/app/components/TableReport";
import Layout from "@/app/layouts/Layout";
import { failedRequest, initialStatus, pendingRequest, RequestStatus, successfullRequest } from "@/app/services";
import { Accounting, getLatestRegistries } from "@/app/services/api/accounts";
import { getBranchId, getCurrentAccounting, isAuth } from "@/utils/appStorage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SellerHome(): JSX.Element {
  const [status, setStatus] = useState<RequestStatus>(initialStatus)
  const [accounts, setAccounts] = useState<Accounting[]>([])
  
  const router = useRouter()

  useEffect(() => {
    const branchId = getBranchId()
    if (!isAuth()) {
      router.push("/login")
    } else if(branchId){
      setStatus(pendingRequest)
      getLatestRegistries(branchId).then((result) => {
        setAccounts(result)
        setStatus(successfullRequest)
      }).catch(() => {
        setStatus(failedRequest)
      })
    } else {
      router.push("/login")
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
        {status.onLoading ? <Skeleton /> : status.onError ? <Error /> : <TableReport accounts={accounts} />}
      </>
    </Layout>
  )
}
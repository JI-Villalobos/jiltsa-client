import Error from "@/components/Error";
import SessionInfo from "@/components/SessionInfo";
import Skeleton from "@/components/Skeleton";
import TableReport from "@/components/TableReport";
import CloseOperationButton from "@/components/shared/CloseOperationButton";
import Layout from "@/layouts/Layout";
import { RequestStatus, failedRequest, initialStatus, pendingRequest, successfullRequest } from "@/services";
import { Accounting, getLatestRegistries } from "@/services/api/accounts";
import { getBranchId, getCurrentAccounting, isAuth } from "@/utils/appStorage";
import Image from "next/image";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SellerHome(): JSX.Element {
  const router: NextRouter = useRouter()
  const [status, setStatus] = useState<RequestStatus>(initialStatus)
  const [accounts, setAccounts] = useState<Accounting[]>([])
  

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
import Error from "@/components/Error";
import SessionInfo from "@/components/SessionInfo";
import Skeleton from "@/components/Skeleton";
import TableReport from "@/components/TableReport";
import TotalBalanceItem from "@/components/TotalBalanceItem";
import { AuthContext } from "@/context/AuthContext";
import Layout from "@/layouts/Layout";
import { RequestStatus, failedRequest, initialStatus, pendingRequest, successfullRequest } from "@/services";
import { Accounting, getLatestRegistries } from "@/services/api/accounts";
import Cookies from "js-cookie";
import { NextRouter, useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

export default function SellerHome(): JSX.Element {
  const isAuth: boolean = useContext(AuthContext)

  const router: NextRouter = useRouter()
  const [status, setStatus] = useState<RequestStatus>(initialStatus)
  const [accounts, setAccounts] = useState<Accounting[]>([])
  

  const branchId: number = parseInt(Cookies.get('branchId')!)

  useEffect(() => {
    if (!isAuth) {
      router.push("/login")
    } else {
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
        <TotalBalanceItem />
        <p className='mt-4 text-2xl text-mp-dark font-coda'>Actividad Reciente:</p>
        {status.onLoading ? <Skeleton /> : status.onError ? <Error /> : <TableReport accounts={accounts} />}
      </>
    </Layout>
  )
}
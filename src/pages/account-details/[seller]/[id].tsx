import Details from "@/components/AccountDetail";
import SessionInfo from "@/components/SessionInfo";
import Skeleton from "@/components/Skeleton";
import Layout from "@/layouts/Layout";
import { failedRequest, initialStatus, pendingRequest, RequestStatus, successfullRequest } from "@/services";
import { Accounting, getAccounting } from "@/services/api/accounts";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AccountDetails(): JSX.Element {
  const [sellerName, setSellerName] = useState<string>('')
  const [accounting, setAccounting] = useState<Accounting>()
  const [status, setStatus] = useState<RequestStatus>(initialStatus)
  const router = useRouter()
  const { id, seller } = router.query

  useEffect(() => {
    setStatus(pendingRequest)
    if (seller && typeof seller === 'string' && typeof id === 'string') {
      setSellerName(seller)
      const accountingId = parseInt(id)
      getAccounting(accountingId).then((res) => {
        setAccounting(res)
        setStatus(successfullRequest)
      }).catch(() => {
        setStatus(failedRequest)
      })
    } else {
      router.push("/")
    }
  }, [])

  return (
    <Layout>
      <>
        <SessionInfo />
        {
          status.onLoading ? <Skeleton /> : <Details seller={sellerName} accounting={accounting} />
        }
      </>
    </Layout>
  )
}
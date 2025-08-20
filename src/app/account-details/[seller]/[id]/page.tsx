'use client'

import Details from "@/app/components/AccountDetail";
import SessionInfo from "@/app/components/SessionInfo";
import Skeleton from "@/app/components/Skeleton";
import Layout from "@/app/layouts/Layout";
import { failedRequest, initialStatus, pendingRequest, RequestStatus, successfullRequest } from "@/app/services";
import { Accounting, getAccounting } from "@/app/services/api/accounts";
import { getCurrentAccounting } from "@/utils/appStorage";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AccountDetails(): JSX.Element {
  const [sellerName, setSellerName] = useState<string>('')
  const [accounting, setAccounting] = useState<Accounting>()
  const [status, setStatus] = useState<RequestStatus>(initialStatus)
  const [currentAccounting, setCurrentAccounting] = useState(false)
  const params = useParams<{ id: string, seller: string }>()
  const router = useRouter()

  useEffect(() => {
    setStatus(pendingRequest)
    const current = getCurrentAccounting() ? true : false
    setCurrentAccounting(current)
    if (params?.seller && typeof params.seller === 'string' && typeof params.id === 'string') {
      setSellerName(params.seller.replace('%20', ' '))
      const accountingId = parseInt(params.id)
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
          status.onLoading ? <Skeleton /> : <Details seller={sellerName} accounting={accounting} current={currentAccounting}/>
        }
      </>
    </Layout>
  )
}
import Spinner from "@/components/Spinner";
import Layout from "@/layouts/Layout";
import { RequestStatus, failedRequest, initialStatus, pendingRequest, successfullRequest } from "@/services";
import { Branch, getBranches } from "@/services/api/branches";
import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * 
 * @deprecated
 * this page will be removed soon
 */
export default function CashWithdrawals(): JSX.Element {
  const [status, setStatus] = useState<RequestStatus>(initialStatus)
  const [branches, setBranches] = useState<Branch[]>([])

  useEffect(() => {
    setStatus(pendingRequest)
    getBranches()
      .then((result) => {
        setBranches(result)
        setStatus(successfullRequest)
      })
      .catch(() => {
        setStatus(failedRequest)
      })
  }, [])

  return (
    <Layout>
      <>
        <p className="text-mp-dark text-xl text-center mt-10">Este contenido ya no esta disponible</p>
      </>
    </Layout>
  )
}
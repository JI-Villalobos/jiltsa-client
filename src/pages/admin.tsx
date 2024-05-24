import Spinner from "@/components/Spinner";
import BranchItem from "@/components/branchItem";
import Layout from "@/layouts/Layout";
import { RequestStatus, failedRequest, initialStatus, pendingRequest, successfullRequest } from "@/services";
import { Branch, getBranches } from "@/services/api/branches";
import { isAuth, setLocalBranches, setLocalMode, setUserRole } from "@/utils/appStorage";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Admin(): JSX.Element {
  const [branches, setBranches] = useState<Branch[]>([])
  const [status, setStatus] = useState<RequestStatus>(initialStatus)

  const router = useRouter()

  useEffect(() => {
    if (!isAuth()) {
      router.push("/login")
    }
    setStatus(pendingRequest)
    getBranches().then((result) => {
      setBranches(result)
      setLocalBranches(result)
      setStatus(successfullRequest)
    }).catch(() => {
      setStatus(failedRequest)
    })
  }, [])

  const handleDemoOption = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setLocalMode("DEMO")
    setUserRole()
    router.push('/')
  }

  return (
    <Layout>
      <>
      <button onClick={handleDemoOption} className="m-4 bg-mp-green text-mp-gray-soft text-sm rounded h-8 w-44">
        Cambiar a DEMO
      </button>
        {
          status.onLoading ? (<Spinner bgBlank />)
            : (<>
              <p className="text-xl text-mp-green mb-6">Selecciona Sucursal:</p>
              {
                branches.map((branch) => (<BranchItem branch={branch} key={`branch-id-${branch.id}`} />))
              }
            </>)
        }
      </>
    </Layout>
  )
}
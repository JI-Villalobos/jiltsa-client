import { RequestStatus } from "@/services"
import { Branch, BranchConfig, getBranchConfig, updateBranchConfig } from "@/services/api/branches"
import React, { useEffect, useState } from "react"
import Spinner from "./Spinner"
import { getLocalBranches } from "@/utils/appStorage"
import InitialBalanceItem from "./InitialBalanceItem"

export default function BranchConfigCollection(): JSX.Element {
  const [status, setStatus] = useState<RequestStatus>({ onError: false, onLoading: false, onSuccess: false })
  const [branches, setBranches] = useState<BranchConfig[]>([])
  
  useEffect(() => {
    setStatus({ ...status, onLoading: true })
    getBranchConfig()
      .then((result) => {
        setBranches(result)
        setStatus({ ...status, onLoading: false })
      }).catch(() => {
        setStatus({ ...status, onError: true })
      })
  }, [])

  

  return (
    <>
      <div className="flex flex-col items-start w-8/12 border-b-2 border-mp-strong-gray mt-4">
        <p className="font-coda text-xl font-medium text-mp-green mb-4">Editar Saldos iniciales</p>
        <div className="flex flex-col">
          {
            status.onLoading && <Spinner bgBlank />
          }
          {
            branches.map((branch) => (<InitialBalanceItem branch={branch} />))
          }
        </div>
      </div>
    </>
  )
}
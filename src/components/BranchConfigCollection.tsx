import { RequestStatus } from "@/services"
import { BranchConfig, getBranchConfig, updateBranchConfig } from "@/services/api/branches"
import React, { useEffect, useState } from "react"
import Spinner from "./Spinner"

export default function BranchConfigCollection(): JSX.Element {
  const [status, setStatus] = useState<RequestStatus>({ onError: false, onLoading: false, onSuccess: false })
  const [branches, setBranches] = useState<BranchConfig[]>([])
  const [config, setConfig] = useState<BranchConfig>()

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

  const handleUpdateBranchConfig = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (config) {
      await updateBranchConfig(config.id, config).then(() => {
        setStatus({ ...status, onSuccess: true })
        setTimeout(() => {
          setStatus({ ...status, onSuccess: false })
        }, 1000)
      }).catch(() => {
        setStatus({ ...status, onError: true })
        setTimeout(() => {
          setStatus({ ...status, onError: false })
        }, 1000)
      })
      setConfig(undefined)
    }
  }

  return (
    <>
      <div className="flex flex-col items-start w-8/12 border-b-2 border-mp-strong-gray mt-4">
        <p className="font-coda text-xl font-medium text-mp-green mb-4">Editar Saldos iniciales</p>
        <div className="flex flex-col">
          {
            status.onLoading && <Spinner bgBlank />
          }
          {
            branches.map((branch) => (

              <div className="flex flex-row items-center mb-2" key={`branch-config-id-${branch.id}`}>
                <p className="text-mp-blue w-24 text-left">{branch.branchId}</p>
                <input
                  type="number"
                  defaultValue={branch.initialBalance}
                  className="w-1/2 bg-mp-strong-gray text-center text-mp-dark rounded ml-2"
                  onChange={
                    (e: React.FormEvent<HTMLInputElement>) => setConfig({ id: branch.id, branchId: branch.branchId, initialBalance: parseInt(e.currentTarget.value) })}
                />
                <button className="ml-2 rounded bg-mp-soft-dark text-mp-gray-soft w-10" onClick={handleUpdateBranchConfig}>
                  OK
                </button>

              </div>
            ))
          }
        </div>
      </div>
      {status.onSuccess && <p className="text-mp-green text-center text-sm">Actualizado correctamente</p>}
      {status.onError && <p className="text-mp-error text-center text-sm">Error al intentar actualizar Saldos iniciales</p>}
    </>
  )
}
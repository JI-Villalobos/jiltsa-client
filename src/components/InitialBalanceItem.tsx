import { RequestStatus } from "@/services"
import { BranchConfig, updateBranchConfig } from "@/services/api/branches"
import { getLocalBranch } from "@/utils/appStorage"
import { useEffect, useState } from "react"

type Props = {
  branch: BranchConfig
}

export default function InitialBalanceItem({ branch }: Props): JSX.Element {
  const [config, setConfig] = useState<BranchConfig>()
  const [status, setStatus] = useState<RequestStatus>({ onError: false, onLoading: false, onSuccess: false })
  const [branchName, setBranchName] = useState<string>('')

  useEffect(() => {
    const branchStored = getLocalBranch(branch.branchId)
    if (branchStored) {
      setBranchName(branchStored.name)
    }
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
      <div className="flex flex-row items-center mb-2" key={`branch-config-id-${branch.id}`}>
        <p className="text-mp-blue w-24 text-left">{branchName}</p>
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
      {status.onSuccess && <p className="text-mp-green text-center text-sm">Actualizado correctamente</p>}
      {status.onError && <p className="text-mp-error text-center text-sm">Error al intentar actualizar Saldos iniciales</p>}
    </>
  )
}
import { RequestStatus } from "@/services"
import { Provider, getProviders } from "@/services/api/providers"
import { useEffect, useState } from "react"
import Spinner from "./Spinner"

/**
 * 
 * @deprecated
 * this component will be removed soon
 */
export default function ProvidersWrapper() {
  const [status, setStatus] = useState<RequestStatus>({ onError: false, onLoading: false, onSuccess: false })
  const [providers, setProviders] = useState<Provider[]>([])

  useEffect(() => {
    setStatus({ ...status, onLoading: true })
    getProviders()
      .then((result) => {
        setProviders(result)
        setStatus({ ...status, onLoading: false })
      })
      .catch(() => {
        setStatus({ ...status, onError: true })
      })
  }, [])

  return (
    <>
      {
        status.onLoading ? <Spinner bgBlank /> :
          providers.map((provider) => (
            <div className="flex flex-row items-center justify-between w-1/2 bg-mp-strong-gray rounded m-2 p-1" key={`prov-w-id-${provider.id}`}>
              <p className="text-mp-blue mr-1 text-sm text-center">{provider.name}</p>
              <p className="text-mp-dark mr-1 text-sm text-center">{provider.rfc}</p>
              <p className="text-mp-blue mr-1 text-sm text-center">Estatus: Activo</p>
            </div>
          ))
      }
    </>
  )
}
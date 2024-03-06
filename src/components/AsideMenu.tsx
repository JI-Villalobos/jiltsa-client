import Image from "next/image";
import LinkItem from "./LinkItem";
import { useEffect, useState } from "react";
import { RequestStatus } from "@/services";
import { getBranchById } from "@/services/api/branches";
import { getBranchId, getUserCredentials } from "@/utils/appStorage";
import Spinner from "./Spinner";
import { Role } from "@/utils/variables";

export default function AsideMenu(): JSX.Element {
  const [branch, setBranch] = useState<string>('')
  const [status, setStatus] = useState<RequestStatus>({ onError: false, onLoading: false, onSuccess: false })
  const [role, setRole] = useState<string>(Role.USER)

  useEffect(() => {
    const creds = getUserCredentials()
    setStatus({ ...status, onLoading: true })
    if (creds) {
      getBranchById(creds.branchId)
        .then((result) => {
          setBranch(result.name)
          setStatus({ ...status, onLoading: false })
          setRole(creds.role)
        })
        .catch(() => {
          setStatus({ ...status, onError: true })
        })
    }
  }, [])

  return (
    <div className='flex flex-col bg-mp-dark h-screen'>
      <Image src="/mountain.svg" alt='mountain svg' width={40} height={40} className='self-center mt-6' />
      <p className='self-center mt-6 text-xs xl:text-sm text-mp-gray-soft'>Sucursal:</p>
      <div className="self-center">
        {
          status.onLoading ? <Spinner /> : <p className='mt-2 text-xs xl:text-sm text-mp-gray-soft'>{branch}</p>
        }
      </div>
      {
        role === Role.ADMIN ? (<>
          <LinkItem path="/admin" icon="/home.svg" name="Movimientos" />
          <LinkItem path="/sellers" icon="/casher.svg" name="Vendedoras" />
          <LinkItem path="/cashwithdrawals" icon="/withdrawal.svg" name="Retiros" />
          <LinkItem path="/collections" icon="/config.svg" name="Configuración" />
          <LinkItem path="/providers" icon="/providers.svg" name="Proveedores" />
          <LinkItem path="/billing" icon="/bill.svg" name="Cuentas x Pagar" />
        </>)
          : (<>
            <LinkItem path="/seller-home" icon="/home.svg" name="Movimientos" />
            <LinkItem path="/operation" icon="/casher.svg" name="Registro de Caja" />
            <LinkItem path="/cash-registry" icon="/withdrawal.svg" name="Retiros" />
          </>)
      }

    </div>
  )
}
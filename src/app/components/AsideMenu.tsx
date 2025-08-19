'use client'

import Image from "next/image";
import LinkItem from "./LinkItem";
import { useEffect, useState } from "react";
import { getUserCredentials, setBranchName } from "@/utils/appStorage";
import Spinner from "./shared/Spinner";
import { Role } from "@/utils/variables";
import { RequestStatus } from "../services";
import { getBranchById } from "../services/api/branches";

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
          setBranchName(result.name)
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
      <>
        <LinkItem path="/seller-home" icon="/home.svg" name="Movimientos" />
        <LinkItem path="/operation" icon="/casher.svg" name="Registro de Gastos" />
        <LinkItem path="/cash-registry" icon="/withdrawal.svg" name="Depositos" />
      </>
    </div>
  )
}
'use client'

import Image from "next/image";
import LinkItem from "./LinkItem";
import { useEffect, useState } from "react";
import { getUserCredentials, setBranchName } from "@/utils/appStorage";
import Spinner from "./shared/Spinner";
import { Role } from "@/utils/variables";
import { RequestStatus } from "../services";
import { getBranchById } from "../services/api/branches";
import { LuLandmark, LuMenu, LuReceipt, LuWalletCards } from "react-icons/lu";

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
    <div className='flex flex-col items-center bg-mp-white h-screen border border-mp-green border-opacity-10 rounded w-1/12'>
      <LuMenu className="text-mp-green mt-10"/>
      <p className='self-center mt-6 text-xs xl:text-sm text-mp-blue'>Sucursal:</p>
      <div className="self-center">
        {
          status.onLoading ? <Spinner /> : <p className='mt-2 text-xs xl:text-sm text-mp-green'>{branch}</p>
        }
      </div>
      <div className="h-2 rounded w-11/12 shadow bg-gradient-to-r from-mp-green to-mp-blue">
      </div>
      <>
        <LinkItem path="/seller-home" icon={<LuLandmark className="text-mp-green"/>} name="Movimientos" />
        <LinkItem path="/operation" icon={<LuReceipt className="text-mp-green"/>} name="Gastos" />
        <LinkItem path="/cash-registry" icon={<LuWalletCards className="text-mp-green"/>} name="Depositos" />
      </>
    </div>
  )
}
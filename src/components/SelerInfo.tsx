import { RequestStatus } from "@/services";
import { Seller, disableSeller } from "@/services/api/sellers";
import Image from "next/image";
import React, { useState } from "react";
import Spinner from "./Spinner";

type Props = {
  seller: Seller
}

export default function SellerInfo({ seller }: Props): JSX.Element {
  const [isActive, setIsActive] = useState<boolean>(seller.isActive)
  const [status, setStatus] = useState<RequestStatus>({ onError: false, onLoading: false, onSuccess: false })

  const handleDisableSeller = (e: React.FormEvent<HTMLButtonElement>) => {
    setStatus({ ...status, onLoading: true })
    e.preventDefault()
    disableSeller(seller.id)
      .then((result) => {
        setIsActive(result.isActive)
        setStatus({ ...status, onLoading: false })
      })
      .catch(() => {
        setStatus({ ...status, onError: true })
      })
  }

  return (
    <div className="flex flex-row w-1/3 bg-mp-strong-gray hover:bg-mp-gray-soft rounded space-x-4 items-center justify-center m-2">
      {
        status.onLoading ? <Spinner bgBlank /> :
          (
            <>
              <p className="text-mp-blue">{seller.fullName}</p>
              <p className="text-mp-dark">Sucursal: {seller.branchId}</p>
              <p className="text-mp-blue">
                {seller.isActive ? 'Activo' : 'Inactivo'}
              </p>
              {
                isActive && (
                  <button 
                    className="bg-mp-dark text-sm text-mp-gray-soft rounded h-3/4 w-8 flex justify-center items-center"
                    onClick={handleDisableSeller}
                  >
                    <Image src="/disable.svg" alt="disable icon" width={15} height={15} />
                  </button>
                )
              }
            </>
          )
      }
    </div>
  )
}
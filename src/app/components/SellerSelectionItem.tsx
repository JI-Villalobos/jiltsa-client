'use client'

import { setCurrentAccounting } from "@/utils/appStorage"
import { useState } from "react"
import Spinner from "./shared/Spinner"
import { getCurrentDate } from "@/utils/dateOperations"
import { Seller } from "../services/api/sellers"
import { failedRequest, initialStatus, pendingRequest, RequestStatus, successfullRequest } from "../services"
import { newAccounting } from "../services/api/accounts"
import { useRouter } from "next/navigation"
import { LuLoader, LuUser, LuUserRound } from "react-icons/lu"

type Props = {
  seller: Seller
}

export default function SellerSellectionItem({ seller }: Props): JSX.Element {
  const router = useRouter()
  const [status, setStatus] = useState<RequestStatus>(initialStatus)

  const handleAccounting = async (e: React.FormEvent<HTMLButtonElement>) => {
    const date = getCurrentDate()
    setStatus(pendingRequest)
    e.preventDefault()
    await newAccounting({ sellerId: seller.id, branchId: seller.branchId, date: date})
      .then((result) => {
        setCurrentAccounting({ accountingId: result.id, seller: seller.fullName, date: result.date, sellerId: result.sellerId })
        setStatus(successfullRequest)
        router.push("/check-list")
      })
      .catch((e) => {
        setStatus(failedRequest)
      })
  }

  return (
    <>
      <button
        className="w-full rounded-lg text-center align-middle 
                  text-xs font-medium text-mp-blue transition-all 
                  hover:bg-gradient-to-r from-mp-green to-mp-blue hover:text-mp-white p-2 flex flex-row items-center 
                  justify-center border border-opacity-60 mb-4"
        type="button"
        disabled={status.onLoading}
        onClick={handleAccounting}
      >
        <LuUserRound />
       {status.onLoading ? <LuLoader className="animate-spin" /> : `${seller.fullName}`}
      </button>
      {status.onError && <p className="text-center text-mp-error text-sm">Ocurrio un erro al intentar abrir tu turno intentalo mas tarde</p>}
    </>
  )
}

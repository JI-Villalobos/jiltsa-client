import { RequestStatus, failedRequest, initialStatus, pendingRequest, successfullRequest } from "@/services"
import { newAccounting } from "@/services/api/accounts"
import { Seller } from "@/services/api/sellers"
import { setCurrentAccounting } from "@/utils/appStorage"
import { useRouter } from "next/router"
import { useState } from "react"
import Spinner from "./shared/Spinner"
import { getCurrentDate } from "@/utils/dateOperations"

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
        className="m-2 border-s-4 border-mp-green bg-mp-gray-soft w-full p-4 rounded text-mp-dark text-base hover:cursor-pointer hover:text-mp-green"
        disabled={status.onLoading}
        onClick={handleAccounting}
      >
        {status.onLoading ? <Spinner /> : `${seller.fullName}`}
      </button>
      {status.onError && <p className="text-center text-mp-error text-sm">Ocurrio un erro al intentar abrir tu turno intentalo mas tarde</p>}
    </>
  )
}

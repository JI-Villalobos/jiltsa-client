import { RequestStatus } from "@/services"
import { newAccounting } from "@/services/api/accounts"
import { Seller } from "@/services/api/sellers"
import { setCurrentAccounting } from "@/utils/appStorage"
import { useRouter } from "next/router"
import { useState } from "react"
import Spinner from "./Spinner"

type Props = {
  seller: Seller
}

export default function SellerSellectionItem({ seller }: Props): JSX.Element {
  const router = useRouter()
  const [status, setStatus] = useState<RequestStatus>({
    onLoading: false,
    onError: false,
    onSuccess: false
  })

  const handleAccounting = async (e: React.FormEvent<HTMLButtonElement>) => {
    setStatus({ ...status, onLoading: true })
    e.preventDefault()
    await newAccounting({ sellerId: seller.id, branchId: seller.branchId, })
      .then((result) => {
        setCurrentAccounting({ accountingId: result.id, seller: seller.fullName })
        setStatus({ ...status, onLoading: false })
        router.reload()
      })
      .catch((e) => {
        setStatus({ ...status, onError: true })
        console.log(e);
        
      })
  }

  return (
    <>
      <button
        className="m-2 bg-mp-strong-gray w-full h-8 rounded text-mp-dark hover:cursor-pointer hover:bg-mp-gray-soft"
        disabled={status.onLoading}
        onClick={handleAccounting}
      >
        {status.onLoading ? <Spinner /> : `${seller.fullName}`}
      </button>
      {status.onError && <p className="text-center text-mp-error text-sm">Ocurrio un erro al intentar abrir tu turno intentalo mas tarde</p>}
    </>
  )
}

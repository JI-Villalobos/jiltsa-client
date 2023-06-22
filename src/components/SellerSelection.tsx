import { RequestStatus } from "@/services"
import { Seller, getSellerByBranch } from "@/services/api/sellers"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import SellerSellectionItem from "./SellerSelectionItem"

export default function SellerSelection() {
  const [status, setStatus] = useState<RequestStatus>({
    onError: false,
    onLoading: false,
    onSuccess: false
  })
  const [sellers, setSellers] = useState<Seller[]>([])

  useEffect(() => {
    const branch = Cookies.get('branchId')
    setStatus({
      ...status,
      onLoading: true
    })
    if (branch) {
      const branchId: number = parseInt(branch)
      getSellerByBranch(branchId).then((result: Seller[]) => {
        setSellers(result)
        setStatus({
          ...status,
          onLoading: false
        })
      }).catch(() => {
        setStatus({
          ...status,
          onError: true
        })
      })
    }
  }, [])
  return (
    <div className="mt-8 flex flex-col items-center">
      <p className="mb-4 text-xl text-mp-green font-coda">Abrir turno de:</p>
      {
        sellers.map(seller => (
          <SellerSellectionItem seller={seller} key={`seller-id-${seller.id}`}/>
        ))
      }
    </div>
  )
}
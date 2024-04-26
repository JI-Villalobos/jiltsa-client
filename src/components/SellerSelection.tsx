import { RequestStatus, failedRequest, initialStatus, pendingRequest, successfullRequest } from "@/services"
import { Seller, getSellerByBranch } from "@/services/api/sellers"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import SellerSellectionItem from "./SellerSelectionItem"

export default function SellerSelection() {
  const [status, setStatus] = useState<RequestStatus>(initialStatus)
  const [sellers, setSellers] = useState<Seller[]>([])

  useEffect(() => {
    const branch = Cookies.get('branchId')
    setStatus(pendingRequest)
    if (branch) {
      const branchId: number = parseInt(branch)
      getSellerByBranch(branchId).then((result: Seller[]) => {
        setSellers(result)
        setStatus(successfullRequest)
      }).catch(() => {
        setStatus(failedRequest)
      })
    }
  }, [])
  return (
    <div className="mt-8 flex flex-col items-center w-1/2">
      <p className="mb-4 text-xl text-mp-dark font-coda">¿Quién eres?</p>
      {
        sellers.map(seller => (
          <SellerSellectionItem seller={seller} key={`seller-id-${seller.id}`}/>
        ))
      }
    </div>
  )
}
'use client'

import SellerSellectionItem from "@/app/components/SellerSelectionItem"
import Spinner from "@/app/components/shared/Spinner"
import { failedRequest, initialStatus, pendingRequest, RequestStatus, successfullRequest } from "@/app/services"
import { getSellerByBranch, Seller } from "@/app/services/api/sellers"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { LuLoaderCircle } from "react-icons/lu"

export const OpenAccountModal = () => {
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
        <div className="flex flex-col items-center w-1/2 p-2">
            <p className="mb-4 text-xl text-mp-green">Selecciona tu turno</p>
            {
                status.onLoading ? <LuLoaderCircle className="animate-spin text-mp-green" size={30}/>
                    : sellers.map(seller => (
                        <SellerSellectionItem seller={seller} key={`seller-id-${seller.id}`} />
                    ))
            }
        </div>
    )
}
import NewSeller from "@/components/NewSeller";
import SellerInfo from "@/components/SelerInfo";
import Spinner from "@/components/Spinner";
import Layout from "@/layouts/Layout";
import { RequestStatus, failedRequest, initialStatus, pendingRequest, successfullRequest } from "@/services";
import { Seller, getAllSellers, getSellerByBranch } from "@/services/api/sellers";
import { isAuth } from "@/utils/appStorage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Sellers(): JSX.Element {
  const [sellers, setSellers] = useState<Seller[]>([])
  const [status, setStatus] = useState<RequestStatus>(initialStatus)
  const [transitionStatus, setTransitionStatus] = useState(false)
  const [showNewSellerForm, setShowNewSellerForm] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    if (isAuth()) {
      setStatus(pendingRequest)
      getAllSellers()
        .then((result) => {
          setSellers(result)
          setStatus(successfullRequest)
        })
        .catch(() => {
          setStatus(failedRequest)
        })
    } else {
      router.push("/login")
    }
  }, [])

  const handleFormTransition = () => {
    setTransitionStatus(true)
    setTimeout(() => {
      setTransitionStatus(false)
      setShowNewSellerForm(true)
    }, 2000)
  }

  return (
    <Layout>
      <>
        {
          showNewSellerForm ?
            <>
              <NewSeller />
            </> : (
              <>
                <p className="text-xl text-mp-green mb-10">Vendedoras</p>
                <button
                  className="mb-5 bg-mp-green text-mp-gray-soft text-sm rounded w-40 hover:bg-mp-light-green"
                  onClick={() => handleFormTransition()}
                >
                  +Vendedora
                </button>
                {
                  status.onLoading ? <Spinner bgBlank /> : sellers.map((seller) => (<SellerInfo key={`seller-id-${seller.id}`} seller={seller} />))
                }
                {
                  status.onError && (<p>Error al cargar información de vendedoras</p>)
                }
              </>
            )
        }
      </>
    </Layout>
  )
}
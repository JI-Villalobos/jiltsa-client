import NewSeller from "@/components/NewSeller";
import SellerInfo from "@/components/SelerInfo";
import Spinner from "@/components/Spinner";
import Layout from "@/layouts/Layout";
import { RequestStatus } from "@/services";
import { Seller, getAllSellers, getSellerByBranch } from "@/services/api/sellers";
import { getBranchId } from "@/utils/appStorage";
import { useEffect, useState } from "react";

export default function Sellers(): JSX.Element {
  const [sellers, setSellers] = useState<Seller[]>([])
  const [status, setStatus] = useState<RequestStatus>({ onError: false, onLoading: false, onSuccess: false })
  const [showNewSellerForm, setShowNewSellerForm] = useState<boolean>(false)

  useEffect(() => {
    setStatus({ ...status, onLoading: true })
      getAllSellers()
        .then((result) => {
          setSellers(result)
          setStatus({ ...status, onLoading: false })
        })
        .catch(() => {
          setStatus({ ...status, onError: true })
        })
  }, [])

  const handleFormTransition = () => {
    setStatus({ ...status, onLoading: true })
    setTimeout(() => {
      setStatus({ ...status, onLoading: false })
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
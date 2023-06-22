import AsideMenu from "@/components/AsideMenu";
import Header from "@/components/Header";
import Spinner from "@/components/Spinner";
import BranchItem from "@/components/branchItem";
import Layout from "@/layouts/Layout";
import { RequestStatus } from "@/services";
import { Branch, getBranches } from "@/services/api/branches";
import { useEffect, useState } from "react";

export default function Admin(): JSX.Element {
  const [branches, setBranches] = useState<Branch[]>([])
  const [status, setStatus] = useState<RequestStatus>({ onError: false, onLoading: false, onSuccess: false })

  useEffect(() => {
    setStatus({ ...status, onLoading: true })
    getBranches().then((result) => {
      setBranches(result)
      setStatus({ ...status, onLoading: false })
    }).catch(() => {
      setStatus({ ...status, onError: true })
    })
  }, [])

  return (
    <Layout>
      <>
        {
          status.onLoading ? (<Spinner bgBlank />)
            : (<>
              <p className="text-xl text-mp-green mb-6">Selecciona Sucursal:</p>
              {
                branches.map((branch) => (<BranchItem branch={branch} key={`branch-id-${branch.id}`} />))
              }
            </>)
        }
      </>
    </Layout>
  )
}
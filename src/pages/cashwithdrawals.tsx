import Spinner from "@/components/Spinner";
import Layout from "@/layouts/Layout";
import { RequestStatus } from "@/services";
import { Branch, getBranches } from "@/services/api/branches";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CashWithdrawals(): JSX.Element {
  const [status, setStatus] = useState<RequestStatus>({ onError: false, onLoading: false, onSuccess: false })
  const [branches, setBranches] = useState<Branch[]>([])

  useEffect(() => {
    setStatus({ ...status, onLoading: true })
    getBranches()
      .then((result) => {
        setBranches(result)
        setStatus({ ...status, onLoading: false })
      })
      .catch(() => {
        setStatus({ ...status, onError: true })
      })
  }, [])

  return (
    <Layout>
      <>
        <p className="text-mp-dark text-xl text-center">Sucursales:</p>
        {
          status.onLoading ? <Spinner bgBlank />
            : (
              branches.map((branch) => (
                <Link className="w-1/3 border border-mp-green rounded text-mp-dark text-center m-2 hover:bg-mp-gray-soft" href={`withdrawals/${branch.name}`} key={`branch-id-${branch.id}`}>
                  {branch.name}
                </Link>
              ))
            )
        }
      </>
    </Layout>
  )
}
'use client'
import { Inter } from 'next/font/google'
import { useContext, useEffect, useState } from 'react'
import { NextRouter, useRouter } from 'next/router'
import { AuthContext } from '@/context/AuthContext'
import TableReport from '@/components/TableReport'
import { RequestStatus } from '@/services'
import { Accounting, getLatestRegistries } from '@/services/api/accounts'
import Skeleton from '@/components/Skeleton'
import Error from '@/components/Error'
import DateSelection from '@/components/DateSelection'
import Layout from '@/layouts/Layout'

const inter = Inter({ subsets: ['latin'] })

export default function AdminHome() {
  const req: RequestStatus = {
    onLoading: false,
    onSuccess: false,
    onError: false
  }

  const isAuth: boolean = useContext(AuthContext)

  const router: NextRouter = useRouter()
  const { id } = router.query
  const [status, setStatus] = useState<RequestStatus>(req)
  const [accounts, setAccounts] = useState<Accounting[]>([])
  const [customDisplay, setCustomDisplay] = useState<boolean>(false)
  const [branchId, setBranchId] = useState<number>(1)

  useEffect(() => {
    if (!isAuth) {
      router.push("/login")
    } else if (id && typeof id === 'string') {
      setBranchId(parseInt(id))
      setStatus({
        ...req,
        onLoading: true
      })
      getLatestRegistries(branchId).then((result) => {
        setAccounts(result)
        setStatus({
          ...req,
          onLoading: false
        })
      }).catch(() => {
        setStatus({
          ...req,
          onError: true
        })
      })

    }
  }, [])

  return (
    <Layout>
      <>
        <DateSelection setDisplay={setCustomDisplay} setAccounts={setAccounts} branch={branchId} />
        <p className='mt-4 text-2xl text-mp-dark font-coda'>Actividad Reciente:</p>
        {
          customDisplay ? (<>
            {status.onLoading ? <Skeleton /> : status.onError ? <Error /> : <TableReport accounts={accounts} />}
          </>)
            : (<>
              {status.onLoading ? <Skeleton /> : status.onError ? <Error /> : <TableReport accounts={accounts} />}
            </>)
        }
      </>

    </Layout>
  )
}

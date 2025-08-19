'use client'

import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import { NextRouter, useRouter } from 'next/router'
import { RequestStatus } from '@/app/services'
import { Accounting, getLatestRegistries } from '@/app/services/api/accounts'
import Layout from '@/app/layouts/Layout'
import DateSelection from '@/app/components/DateSelection'
import Skeleton from '@/app/components/Skeleton'
import Error from '@/app/components/shared/Error'
import TableReport from '@/app/components/TableReport'


const inter = Inter({ subsets: ['latin'] })

export default function AdminHome() {
  const req: RequestStatus = {
    onLoading: false,
    onSuccess: false,
    onError: false
  }

  const router: NextRouter = useRouter()
  const { id } = router.query
  const [status, setStatus] = useState<RequestStatus>(req)
  const [accounts, setAccounts] = useState<Accounting[]>([])
  const [customDisplay, setCustomDisplay] = useState<boolean>(false)
  const [branchId, setBranchId] = useState<number>()

  useEffect(() => {
    setStatus({ ...status, onLoading: true })
    if (id && typeof id === 'string') {
      const branch = parseInt(id)
      setBranchId(branch)
      getLatestRegistries(branch).then((result) => {
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
  }, [branchId])

  return (
    <Layout>
      <>
        {
          branchId && (<DateSelection setDisplay={setCustomDisplay} setAccounts={setAccounts} branch={branchId} />)
        }
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

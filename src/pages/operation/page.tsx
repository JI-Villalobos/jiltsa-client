'use client'

import Expenses from "@/app/components/Expenses";
import OpenAccounting from "@/app/components/OpenAccounting";
import SessionInfo from "@/app/components/SessionInfo";
import Layout from "@/app/layouts/Layout";
import { getCurrentAccounting, isAuth } from "@/utils/appStorage";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Operation(): JSX.Element {
  const [accountingCreated, setAccountingCreated] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    const accounting = getCurrentAccounting()
    if(isAuth()){
      if (accounting) {
        setAccountingCreated(true)
      }
    } else {
      router.push('/login')
    }
  }, [])

  
  return (
    <Layout>
      <>
        {
          accountingCreated 
          ? <>
              <SessionInfo />
              <Expenses />
            </>
          :
            <>
              <OpenAccounting />
            </>
        }
      </>
    </Layout>
  )
}
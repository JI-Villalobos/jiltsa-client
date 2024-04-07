import Expenses from "@/components/Expenses";
import Incomes from "@/components/Incomes";
import OpenAccounting from "@/components/OpenAccounting";
import SessionInfo from "@/components/SessionInfo";
import Layout from "@/layouts/Layout";
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
          accountingCreated ? <>
            <SessionInfo />
            <Expenses />
            <Incomes />
           
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
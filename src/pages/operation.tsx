import Expenses from "@/components/Expenses";
import Incomes from "@/components/Incomes";
import OpenAccounting from "@/components/OpenAccounting";
import SessionInfo from "@/components/SessionInfo";
import Layout from "@/layouts/Layout";
import { getCurrentAccounting } from "@/utils/appStorage";
import React, { useEffect, useState } from "react";

export default function Operation(): JSX.Element {
  const [accountingCreated, setAccountingCreated] = useState<boolean>(false)

  useEffect(() => {
    const accounting = getCurrentAccounting()
    if (accounting) {
      setAccountingCreated(true)
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
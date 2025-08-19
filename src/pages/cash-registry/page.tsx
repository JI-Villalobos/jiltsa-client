'use client'

import ConfirmCashRegistry from "@/app/components/ConfirmCahsRegistry";
import NewCashRegistry from "@/app/components/NewCashRegistry";
import SessionInfo from "@/app/components/SessionInfo";
import CloseOperationButton from "@/app/components/shared/CloseOperationButton";
import Layout from "@/app/layouts/Layout";
import { CreateCashWithdrawalDto } from "@/app/services/api/withdrawals";
import { getCurrentAccounting, isAuth } from "@/utils/appStorage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CashRegistry() {
  const [cashWithDrawal, setCashWithdrawal] = useState<CreateCashWithdrawalDto>({ amount: 0, branch: '', concept: '', sellerName: '' })
  const [confirmationStage, setConfirmationStage] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    const accounting = getCurrentAccounting()
    if (isAuth()) {
      if (!accounting) {
        router.push("/seller-home")
      }  
    } else {
      router.push('/login')
    }
    
  }, [])

  return (
    <Layout>
      <>
        <SessionInfo />
        <CloseOperationButton />
        {
          confirmationStage ?
            <ConfirmCashRegistry
              cashWithDrawal={cashWithDrawal}
              confirmationStage={setConfirmationStage}

            />
            : <NewCashRegistry
              setCashWithdrawal={setCashWithdrawal}
              cashWithDrawal={cashWithDrawal}
              confirmationstage={setConfirmationStage}
            />
        }
      </>
    </Layout>
  )
}
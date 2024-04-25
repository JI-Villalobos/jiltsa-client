import { CurrentAccounting, getCurrentAccounting } from "@/utils/appStorage"
import { useEffect, useState } from "react"
import NotRegisteredSessionInfo from "@/components/NotRegisteredSessionInfo"
import RegisteredSessionInfo from "@/components/RegisteredSessionInfo"

export default function SessionInfo(): JSX.Element {
  const [accountingExists, setAccountingExist] = useState<boolean>(false)
  const [accounting, setAccounting] =  useState<CurrentAccounting>({accountingId: 0, seller: ''})
  
  useEffect(() => {
    const accounting = getCurrentAccounting()
    if (accounting) {
      setAccountingExist(true)
      setAccounting({
        accountingId: accounting.accountingId,
        seller: accounting.seller
      })
    }
  }, [])
  return (
    <div  className="flex flex-col items-center">
      {
        accountingExists 
        ? <RegisteredSessionInfo accountingId={accounting.accountingId} seller={accounting.seller}/> 
        : <NotRegisteredSessionInfo />
      }
    </div>
  )
}
import { CurrentAccounting, getCurrentAccounting } from "@/utils/appStorage"
import { useEffect, useState } from "react"
import NotRegisteredSessionInfo from "@/components/NotRegisteredSessionInfo"
import RegisteredSessionInfo from "@/components/RegisteredSessionInfo"
import TotalBalanceItem from "./TotalBalanceItem"

export default function SessionInfo(): JSX.Element {
  const [accountingExists, setAccountingExist] = useState<boolean>(false)
  const [accounting, setAccounting] =  useState<CurrentAccounting>({accountingId: 0, seller: '', date: '', sellerId: 0})
  
  useEffect(() => {
    const accounting = getCurrentAccounting()
    if (accounting) {
      setAccountingExist(true)
      setAccounting({
        accountingId: accounting.accountingId,
        seller: accounting.seller,
        date: accounting.date,
        sellerId: accounting.sellerId
      })
    }
  }, [])
  return (
    <div  className="flex flex-col items-center">
      {
        accountingExists 
        ? (
            <div className="flex flex-row">
              <RegisteredSessionInfo accountingId={accounting.accountingId} seller={accounting.seller}/>
              <TotalBalanceItem />
            </div>
          ) 
        : <NotRegisteredSessionInfo />
      }
    </div>
  )
}
import { CurrentAccounting, getCurrentAccounting } from "@/utils/appStorage"
import Link from "next/link"
import { useEffect, useState } from "react"
import NotRegisteredSessionInfo from "./NotregisteredSessionInfo"

export default function SessionInfo(): JSX.Element {
  const [accountingExists, setAccountingExist] = useState<boolean>(false)
  const [accounting, setAccounting] =  useState<CurrentAccounting | undefined>()
  
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
        accountingExists ? (
          <>
            <p className='mt-4 text-mp-dark font-coda text-xl'>
              Corte Número: <span className='text-mp-blue'>{accounting?.accountingId } </span>
            </p>
            <p className='mt-4 text-mp-dark font-coda text-xl'>Vendedora: <span className='text-mp-blue'>{accounting?.seller}</span></p>
          </>
        )
          : (
            <>
              <NotRegisteredSessionInfo />
            </>
          )
      }
    </div>
  )
}
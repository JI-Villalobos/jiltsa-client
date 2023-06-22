import { CurrentAccounting, getCurrentAccounting } from "@/utils/appStorage"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function (): JSX.Element {
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
              <p className="mt-4 text-mp-error font-coda text-xl">Aun no se ha registrado un nuevo turno</p>
              <Link href='/operation' className="mt-2 text-mp-blue text-center border border-mp-dark rounded w-1/3">Abrir turno</Link>
            </>
          )
      }
    </div>
  )
}
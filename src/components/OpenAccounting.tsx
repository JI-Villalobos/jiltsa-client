import { useState } from "react"
import SellerSelection from "./SellerSelection"
import Link from "next/link"

export default function OpenAccounting(): JSX.Element {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <>
      <Link href='/outdate-accounting'>
        <button className="mt-4 border border-mp-green rounded text-mp-dark  text-sm w-40 h-8"
        >
          Turno fuera de fecha
        </button>
      </Link>
      {
        open ? <SellerSelection />
          : (
            <button
              className="mt-10 border-none rounded text-mp-gray-soft bg-mp-green w-40 h-8 hover:cursor-pointer"
              onClick={() => setOpen(true)}
            >
              Abrir Turno
            </button>
          )

      }
    </>
  )
}
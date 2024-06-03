import { useState } from "react"
import SellerSelection from "./SellerSelection"
import Link from "next/link"

export default function OpenAccounting(): JSX.Element {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className="w-1/2 flex flex-col items-center mt-10">
      <SellerSelection />

      <span className="w-full flex items-center mt-14">
        <span className="h-px flex-1 bg-mp-dark"></span>
        <span className="shrink-0 px-6 text-mp-blue">Registra un turno correspondiente a otra fecha</span>
        <span className="h-px flex-1 bg-mp-dark"></span>
      </span>

      <Link href='/outdate-accounting' className="w-1/4 mt-2">
        <button className="mt-4 border border-mp-green rounded text-mp-dark p-4 w-full"
        >
          Turno fuera de fecha
        </button>
      </Link>
    </div>
  )
}

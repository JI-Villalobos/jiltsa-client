import { useState } from "react"
import SellerSelection from "./SellerSelection"
import Link from "next/link"

export default function OpenAccounting(): JSX.Element {
  const [open, setOpen] = useState<boolean>(false)
  
  return (
    <div className="w-1/2 flex flex-col items-center mt-10">
      <SellerSelection />
      <Link href='/outdate-accounting' className="w-1/4 mt-10">
        <button className="mt-4 border border-mp-green rounded text-mp-dark p-4 w-full"
        >
          Turno fuera de fecha
        </button>
      </Link>
    </div>
  )
}

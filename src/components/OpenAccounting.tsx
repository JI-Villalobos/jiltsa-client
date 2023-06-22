import { useState } from "react"
import SellerSelection from "./SellerSelection"

export default function OpenAccounting(): JSX.Element {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <>
      {
        open ? <SellerSelection />
          : (
            <button
              className="mt-10 border-none rounded text-mp-gray-soft bg-mp-green w-40 h-8 hover:cursor-pointer"
              onClick={() => setOpen(true)}
            >
              Abrir Turno
            </button>)
      }
    </>
  )
}
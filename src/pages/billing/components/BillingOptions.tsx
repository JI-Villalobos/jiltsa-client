import { Mode } from "@/services/api/pagination"
import { useRouter } from "next/router"
import { ChangeEvent, Dispatch, SetStateAction } from "react"

type Props = {
  setMode: Dispatch<SetStateAction<Mode>>
}

export default function BillingOptions({ setMode }: Props): JSX.Element {
  const router = useRouter()

  const handleMode = (mode: string) : Mode => {
      if(mode == 'PENDING')
        return Mode.PENDING
      else
        return Mode.ALL
  }

  return (
    <div className="w-8/12 mt-4 flex flex-row justify-between">
      <div className="w-4/12">
        <label htmlFor="searchBy" className="block text-sm font-medium text-mp-dark"> Mostrar por: </label>

        <select
          name="searchBy"
          id="searchBy"
          className="mt-1.5 w-full rounded-sm border-mp-strong-gray text-mp-soft-dark sm:text-sm"
          onChange={(e: ChangeEvent<HTMLSelectElement>) => (setMode(handleMode(e.currentTarget.value)))}
        >
          <option value={'PENDING'}>Pendientes de pago</option>
          <option value={'ALL'}>Todas</option>
        </select>
      </div>
      <button
        className="block rounded-lg bg-mp-dark px-5 py-3 text-sm font-medium text-mp-gray-soft transition hover:bg-mp-soft-dark focus:outline-none focus:ring"
        type="button"
        onClick={() => router.push("/billing/new")}
      >
        Nueva Factura
      </button>
    </div>
  )
}
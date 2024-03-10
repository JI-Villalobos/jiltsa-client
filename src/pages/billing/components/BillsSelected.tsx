import { Bill } from "@/services/api/billing"
import { getBills } from "@/utils/appStorage"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import BillItem from "./BillItem"
import { useRouter } from "next/router"

type Props = {
  setStep: Dispatch<SetStateAction<number>>
}

export default function BillsSelected({ setStep }: Props): JSX.Element {
  const [bills, setBills] = useState<Bill[]>([])

  const router = useRouter()

  useEffect(() => {
    const selectedBills = getBills()
    console.log(selectedBills)

    if (selectedBills) {
      setBills(selectedBills)
    }
  }, [])

  return (
    <div className="mt-8 flex flex-col items-center justify-center w-8/12">
      {
        bills.map((bill) => (<BillItem bill={bill} key={`bill-id-d${bill.id}`} />))
      }
      <div className="flex">
      <button className="m-4 rounded-sm border border-mp-green text-mp-green p-2 text-xs" onClick={() => router.back()}>Regresar</button>
      <button className="m-4 rounded-sm bg-mp-blue text-mp-gray-soft p-2 text-xs" onClick={() => setStep(2)}>Continuar</button>
      </div>
    </div>
  )
}
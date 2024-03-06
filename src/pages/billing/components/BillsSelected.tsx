import { Bill } from "@/services/api/billing"
import { getBills } from "@/utils/appStorage"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import BillItem from "./BillItem"

type Props = {
  setStep: Dispatch<SetStateAction<number>>
}

export default function BillsSelected({ setStep }: Props): JSX.Element {
  const [bills, setBills] = useState<Bill[]>([])

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
      bills.map((bill) => (<BillItem bill={bill} key={`bill-id-d${bill.id}`}/>))
     }
     <button className="mt-4 rounded-sm bg-mp-blue text-mp-gray-soft p-2 text-xs" onClick={() => setStep(2)}>Continuar</button>
    </div>
  )
}
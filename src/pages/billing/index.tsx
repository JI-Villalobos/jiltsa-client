import Layout from "@/layouts/Layout";
import { useState } from "react";
import BillingOptions from "./components/BillingOptions";
import BillingTable from "./components/BillingTable";
import { Mode } from "@/services/api/pagination";
import { Bill } from "@/services/api/billing";
import { useRouter } from "next/router";
import { setBills } from "@/utils/appStorage";


export default function Billing(): JSX.Element {
  const [mode, setMode] = useState<Mode>(Mode.PENDING)
  const [selectedBills, setSelectedBills] = useState<Bill[]>([])
  const [selectedAmount, setSelectedAmount] = useState<number>(0)
  const router = useRouter()

  const handleSelectedBills = (isPayment: boolean) => {
    if (selectedBills.length > 0) {
      setBills(selectedBills)
      if (isPayment == true) {
        setSelectedAmount(0)
        router.push("/billing/update?payment=true")
      } else {
        setSelectedAmount(0)
        router.push("/billing/update")
      }
    }
  }

  return (
    <Layout>
      <div className="flex flex-col xl:justify-start items-center">
        <BillingOptions setMode={setMode} />
        <div className="mt-6 flex items-center">

          <button
            className="rounded bg-mp-blue px-4 py-2 text-xs font-medium text-mp-gray-soft mr-14"
            onClick={() => handleSelectedBills(true)
            }
          >
            Pagar Seleccionadas
          </button>
          <button
            className="rounded border border-mp-green px-4 py-2 text-xs font-medium text-mp-green mr-14"
            onClick={() => {
              handleSelectedBills(false)
            }}
          >
            Confirmar Recepción
          </button>

        </div>
        <div className="text-xs text-center text-mp-dark mt-2">Monto Seleccionado:<span className="text-mp-blue">${selectedAmount}</span></div>
        <div className="m-4">
          <BillingTable
            mode={mode}
            selectedBills={selectedBills}
            setSelectedBills={setSelectedBills}
            setSelectedAmount={setSelectedAmount}
            selectedAmount={selectedAmount}
          />
        </div>
      </div>
    </Layout>
  )
}
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
  const router = useRouter()

  const handleSelectedBills = () => {
    if (selectedBills.length > 0) {
      setBills(selectedBills)
      router.push("/billing/update")
    }
  }

  return (
    <Layout>
      <div className="overflow-y-auto">
        <BillingOptions setMode={setMode} />
        <div className="w-full mt-6 flex justify-center">

          <button
            className="inline-block rounded bg-mp-blue px-4 py-2 text-xs font-medium text-mp-gray-soft mr-14"
            onClick={() => console.log(selectedBills)
            }
          >
            Pagar Seleccionadas
          </button>
          <button
            className="inline-block rounded border border-mp-green px-4 py-2 text-xs font-medium text-mp-green mr-14"
            onClick={() => {
              handleSelectedBills()
            }}
          >
            Confirmar Recepción
          </button>

        </div>
        <div className="overflow-x-auto m-4">
          <BillingTable mode={mode} selectedBills={selectedBills} setSelectedBills={setSelectedBills} />
        </div>
      </div>
    </Layout>
  )
}
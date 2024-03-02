import Layout from "@/layouts/Layout";
import { useState } from "react";
import BillingOptions from "./components/BillingOptions";
import BillingTable from "./components/BillingTable";
import BillingPagination from "./components/BillingPagination";
import { Mode } from "@/services/api/pagination";
import { Bill } from "@/services/api/billing";


export default function Billing(): JSX.Element {
  const [mode, setMode] = useState<Mode>(Mode.PENDING)
  const [selectedBills, setSelectedBills] = useState<Bill[]>([])

  return (
    <Layout>
      <h1 className="text-mp-dark">Facturas</h1>
      <BillingOptions setMode={setMode} />
      <div>
        <div className="w-full mt-8 flex justify-end">

          <a
            href="#"
            className="inline-block rounded bg-mp-blue px-4 py-2 text-xs font-medium text-mp-gray-soft mr-14"
            onClick={() => console.log(selectedBills)
            }
          >
            Pagar Seleccionadas
          </a>

        </div>
        <div className="overflow-x-auto m-4">
          <BillingTable mode={mode} selectedBills={selectedBills} setSelectedBills={setSelectedBills} />
        </div>
      </div>
    </Layout>
  )
}
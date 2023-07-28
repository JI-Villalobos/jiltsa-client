import NewOutDateAccounting from "@/components/NewOutDateAccounting";
import Spinner from "@/components/Spinner";
import Layout from "@/layouts/Layout";
import { useState } from "react";

export default function outOfDateAccounting(): JSX.Element {
  const [adviceHidden, setAdviceHidden] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const hiddeAdvice = () => {
    setLoading(true)
    setTimeout(() => {
      setAdviceHidden(true)
      setLoading(false)
    }, 2000)
  }

  return (
    <Layout>
      <div className="flex flex-col items-center w-full">
        {
          adviceHidden ? (
           <NewOutDateAccounting />
          ) : (
            <div className="flex flex-col justify-center items-center w-1/2 p-2 m-10 border border-mp-strong-gray rounded">
              <p className="text-sm text-mp-dark text-center">
                El registro de ventas y gastos extemporaneos, solo debe realizarse bajo imprevistos, ej. fallas en el servicio eléctrio, fallas con el proveedor de internet.
                Presiona continuar para registrar el turno correpondiente.
              </p>
              <button
                className="text-sm text-mp-gray-soft border bg-mp-dark rounded w-36 h-8 m-4 hover:bg-mp-soft-dark flex flex-row items-center justify-center"
                onClick={hiddeAdvice}
              >
                {
                  loading ? <Spinner /> : 'Continuar'
                }
              </button>
            </div>
          )
        }
      </div>
    </Layout>
  )
}
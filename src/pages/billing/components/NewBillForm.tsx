import Spinner from "@/components/Spinner"
import { RequestStatus, failedRequest, initialStatus, pendingRequest, successfullRequest } from "@/services"
import { CreateBill, createNewBill } from "@/services/api/billing"
import { Branch, getBranches } from "@/services/api/branches"
import React, { ChangeEvent, useEffect, useRef, useState } from "react"

export default function NewBillForm() {
  const [branches, setBranches] = useState<Branch[]>([])
  const [status, setStatus] = useState<RequestStatus>(initialStatus)
  const [selectedBranch, setSelectedBrach] = useState<Branch>()
  const [amount, setAmount] = useState<number>()
  const [date, setDate] = useState<string>()
  const [invoice, setInvoice] = useState<string>()
  const [update, setUpdate] = useState(false)
  const [reload, setReload] = useState(false)
  const ref = useRef(null)

  const DEFAULT_PRV_ID = 1;

  const handleSelectedBranch = (id: number) => {
    const branch = branches.find((branch) => branch.id == id)
    setSelectedBrach(branch)
  }


  const handleNewBill = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setStatus(pendingRequest)
    if (amount && date && invoice && selectedBranch) {

      const bill: CreateBill = {
        date: date,
        invoice: invoice,
        amount: amount,
        branch: selectedBranch.name,
        branchId: selectedBranch.id,
        providerId: DEFAULT_PRV_ID
      }

      await createNewBill(bill)
        .then((result) => {
          setUpdate(true)
        })
        .catch((error) => {
          setStatus(failedRequest)
        })

    } else {
      setStatus(failedRequest)
    }
  }

  const handleResetValues = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setReload(true)
  }

  useEffect(() => {
    setReload(false)
    setStatus(pendingRequest)
    getBranches()
      .then((result) => {
        setBranches(result)
        setStatus(successfullRequest)
      })
      .catch((error) => {
        setStatus(failedRequest)
        console.log(error);

      })
  }, [reload])

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-xl font-bold text-mp-blue sm:text-3xl">Registro de Nueva Factura</h1>

        <form action="#" className="mb-0 mt-2 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
          <div className="flex flex-row justify-between w-full">
            <p className="text-center text-sm font-medium text-mp-soft-dark">Proveedor: ROSARIO MD</p>
            <input
              className="hidden"
              type="file"
              placeholder=""
            />
          </div>


          <div>
            <label htmlFor="date" className="text-xs text-center text-mp-dark">Sucursal</label>

            <div className="relative">
              {
                !status.onLoading && (
                  <select
                    name="searchBy"
                    id="searchBy"
                    className="w-full rounded-lg border-mp-soft-dark bg-mp-gray-soft text-mp-soft-dark p-4 pe-12 text-sm shadow-sm"
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => { handleSelectedBranch(parseInt(e.currentTarget.value)) }}
                  >
                    <option value=''>Selecciona tu sucursal</option>
                    {
                      branches.map((branch) => <option value={branch.id} key={`branch-${branch.id}`}>{branch.name}</option>)
                    }

                  </select>
                )
              }
            </div>
          </div>


          <div>
            <label htmlFor="date" className="text-xs text-center text-mp-dark">Fecha de la Factura</label>

            <div className="relative">
              <input
                type="datetime-local"
                className="w-full rounded-lg border-mp-soft-dark bg-mp-gray-soft text-mp-soft-dark p-4 pe-12 text-sm shadow-sm"
                placeholder="Fecha"
                onChange={(e: React.FormEvent<HTMLInputElement>) => setDate(e.currentTarget.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="invoice" className="sr-only">Folio</label>

            <div className="relative">
              <input
                type="text"
                className="w-full rounded-lg border-mp-soft-dark bg-mp-gray-soft p-4 pe-12 text-mp-green text-sm shadow-sm"
                placeholder="Folio"
                ref={ref}
                onChange={(e: React.FormEvent<HTMLInputElement>) => setInvoice(e.currentTarget.value)}
              />

            </div>
          </div>

          <div>
            <label htmlFor="amount" className="sr-only">Monto</label>

            <div className="relative">
              <input
                type="number"
                className="w-full rounded-lg border-mp-soft-dark bg-mp-gray-soft text-mp-soft-dark p-4 pe-12 text-sm shadow-sm"
                placeholder="Monto"
                ref={ref}
                onChange={(e: React.FormEvent<HTMLInputElement>) => setAmount(parseFloat(e.currentTarget.value))}
              />


            </div>
          </div>

          {
            update ? (
              <button
                type="submit"
                className="block w-full rounded-lg px-5 py-3 text-sm font-medium text-mp-green border border-mp-green"
                onClick={handleResetValues}
              >
                Registro exitoso, confirma si quires registrar una nueva factura
              </button>
            ) : (

              <button
                type="submit"
                className="block w-full rounded-lg bg-mp-dark px-5 py-3 text-sm font-medium text-mp-gray-soft"
                onClick={handleNewBill}
              >
                {status.onLoading ? (<div className="flex justify-center"><Spinner /> </div>) : 'Registrar'}
              </button>
            )
          }

        </form>
      </div>
    </div>
  )
}
'use client'

import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import Spinner from "./shared/Spinner"
import { Branch, getBranches } from "../services/api/branches"
import { RequestStatus } from "../services"
import { newSeller } from "../services/api/sellers"

export default function NewSeller(): JSX.Element {
  const [branches, setBranches] = useState<Branch[]>([])
  const [branchSelected, setBranchSelected] = useState<Branch>({ id: 1, isActive: true, name: 'PENON BLANCO' })
  const [branchStage, setBranchStage] = useState<boolean>(true)
  const [status, setStatus] = useState<RequestStatus>({ onError: false, onLoading: false, onSuccess: false })
  const [sellerName, setSellerName] = useState<string>('')

  useEffect(() => {
    setStatus({ ...status, onLoading: true })
    getBranches()
      .then((result) => {
        setBranches(result)
        setStatus({ ...status, onLoading: false })
      })
      .then(() => {
        setStatus({ ...status, onError: true })
      })
  }, [])

  const router = useRouter()

  const handleNewSeller = async (e: React.FormEvent<HTMLButtonElement>) => {
    setStatus({...status, onLoading: true})
    e.preventDefault()

    await newSeller({ fullName: sellerName, branchId: branchSelected.id, isActive: true })
      .then(() => {
        setStatus({...status, onLoading: false})
        router.reload()
      })
      .catch((e) => {
        setStatus({...status, onError: true})        
      })
  }

  return (
    <div className="flex flex-col items-center mt-6 w-1/3 border border-mp-green rounded">
      <div className=" flex flex-col items-center">
        <p className="m-2 text-mp-green font-semibold font-coda">Selleciona La sucursal:</p>
        <div className="m-2 flex items-center justify-center border-b-2 border-mp-strong-gray w-full">
          {
            branchStage ? (
              <>
                {
                  status.onLoading ? <Spinner bgBlank />
                    : branches.map((branch) => (
                      <button
                        className="bg-mp-soft-dark rounded text-mp-gray-soft w-3/4 text-sm m-2 hover:bg-mp-dark"
                        onClick={() => {
                          setBranchSelected(branch)
                          setBranchStage(false)
                        }}
                        key={`branch-id-${branch.id}`}
                      >
                        {branch.name}
                      </button>
                    ))
                }
              </>
            )
              :
              (
                <div className="flex flex-col">
                  <p className="text-mp-dark text-center">Sucursal seleccionada: </p>
                  <input
                    value={branchSelected.name}
                    className="bg-mp-strong-gray rounded text-mp-dark text-center  m-2"
                    readOnly
                  />
                </div>
              )
          }
        </div>
        <input
          type="text"
          placeholder="Nombre de la Vendedora"
          className="border border-mp-dark rounded text-center text-mp-dark"
          onChange={
            (e: React.FormEvent<HTMLInputElement>) => setSellerName(e.currentTarget.value)
          }
        />
        <button
          className="bg-mp-dark text-mp-gray-soft w-20 m-4 rounded flex items-center justify-center"
          onClick={handleNewSeller}
        >
          {
            status.onLoading ? <Spinner />
            : 'Aceptar'
          }
        </button>
      </div>
    </div>
  )
}
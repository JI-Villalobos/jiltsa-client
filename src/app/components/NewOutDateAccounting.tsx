'use client'

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Spinner from "./shared/Spinner";
import { setCurrentAccounting } from "@/utils/appStorage";
import OutdateRegistry from "./OutdateRegistry";
import { failedRequest, initialStatus, pendingRequest, RequestStatus, successfullRequest } from "../services";
import { getSellerByBranch, Seller } from "../services/api/sellers";
import { CustomAccounting, newCustomAccounting } from "../services/api/accounts";

export default function NewOutDateAccounting(): JSX.Element {
  const [accountingRegSuccess, setAccountingRegSuccess] = useState<boolean>(false)
  const [status, setStatus] = useState<RequestStatus>(initialStatus)
  const [sellers, setSellers] = useState<Seller[]>([])
  const [accounting, setAccounting] = useState<CustomAccounting>({ branchId: 0, sellerId: 0, date: '' })
  const [sellerName, setSellerName] = useState('Extemporáneo');


  useEffect(() => {
    const branch = Cookies.get('branchId')
    setStatus(pendingRequest)
    if (branch) {
      const branchId: number = parseInt(branch)
      setAccounting({ ...accounting, branchId: branchId })
      getSellerByBranch(branchId).then((result: Seller[]) => {
        setSellers(result)
        setStatus(successfullRequest)
      }).catch(() => {
        setStatus(failedRequest)
      })
    }
  }, [])

  const handleAccountingRegSuccess = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setStatus({ ...status, onLoading: true })
    await newCustomAccounting(accounting)
      .then((result) => {
        setCurrentAccounting({ accountingId: result.id, seller: sellerName, date: result.date, sellerId: result.sellerId })
        setStatus({ ...status, onLoading: false })
        setAccountingRegSuccess(true)
      })
      .catch(() => {
        setStatus({ ...status, onError: true })
      })
  }

  const getSellerName = (id: string) => {
    const index = parseInt(id)
    const seller =  sellers.find(seller => seller.id == index)?.fullName || 'Extemporaneo'; 
    setSellerName(seller)
  }

  return (
    <>
      {
        accountingRegSuccess ? <OutdateRegistry />
        : (
          <div className="flex flex-col justify-center items-center w-1/2 p-4 border border-mp-strong-gray rounded mt-6">
            <div className="flex flex-col items-center w-full">
              <label className="text-sm text-mp-dark text-center">Fecha del turno</label >
              <input
                type="datetime-local"
                name=""
                id=""
                className="w-1/3 m-2 text-sm text-center text-mp-blue border rounded border-mp-soft-dark"
                onChange={(e: React.FormEvent<HTMLInputElement>) => setAccounting({ ...accounting, date: e.currentTarget.value })}
              />
              <label className="text-sm text-mp-dark text-center">Vendedoras:</label>
              {
                status.onLoading ? <Spinner bgBlank /> :
                  (
                    <select
                      className="w-1/3 h-8 m-2 text-sm text-center text-mp-blue border rounded border-mp-soft-dark"
                      onChange={(e: React.FormEvent<HTMLSelectElement>) => {
                        setAccounting({ ...accounting, sellerId: parseInt(e.currentTarget.value) })
                        getSellerName(e.currentTarget.value)
                      }}
                    >
                      <option>--Selecciona</option>
                      {
                        sellers.map(seller => (
                          <option key={seller.fullName} value={seller.id}>{seller.fullName}</option>
                        ))
                      }
                    </select>
                  )
              }
              <button
                className="text-sm text-mp-gray-soft border bg-mp-dark rounded w-36 p-4 m-4 hover:bg-mp-soft-dark flex flex-row justify-center items-center"
                onClick={handleAccountingRegSuccess}
              >
                {status.onLoading ? <Spinner /> : 'Confirmar'}
              </button>
            </div >
          </div >
        )
      }
    </>
  )
}
'use client'

import Spinner from "@/app/components/shared/Spinner"
import { useOrderStore } from "@/app/hooks/useOrderStore"
import { failedRequest, initialStatus, pendingRequest } from "@/app/services"
import { Branch } from "@/app/services/api/branches"
import { CreateOrder, Order, saveOrder } from "@/app/services/api/orders"
import { getProviders, Provider } from "@/app/services/api/providers"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Field, Form, Formik } from 'formik'

import axios from "axios"
import * as Yup from 'yup'
import { DateTime } from "luxon"
import { LuLoaderCircle } from "react-icons/lu"
import { getBranchId } from "@/utils/appStorage"
import ErrorMessage from "@/app/components/shared/ErrorMessage"
import { useRouter } from "next/navigation"

const newOrder: CreateOrder = {
  branchId: 0,
  creationDate: '',
  estimatedCost: 0.0,
  isOpen: true,
  providerId: 0,
  realCost: 0.0,
  status: 1
}

export const CreatePurchaseForm = () => {
  const [loadProvidersStatus, setLoadProvidersStatus] = useState(initialStatus)
  const [submitStatus, setSubmitStatus] = useState(initialStatus)
  const [providers, setProviders] = useState<Provider[]>([])
  const [order, setOrder] = useState<CreateOrder>(newOrder)

  const router = useRouter()

  useEffect(() => {
    setLoadProvidersStatus(pendingRequest)

    const dt = DateTime.now().toISODate()

    const branchId = getBranchId()

    if (branchId) {
      setOrder({ ...order, branchId: branchId, creationDate: dt })
    }

    getProviders()
      .then((res) => {
        setProviders(res)
        setLoadProvidersStatus(initialStatus)
      })
      .catch(() => {
        setLoadProvidersStatus(failedRequest)
      })

  }, [])

  const handleNewOrder = async () => {
    setSubmitStatus(pendingRequest)
    await saveOrder(order)
      .then((res) => {
        setOrder(res)
        router.push(`/orders/${res.id}`)
        setSubmitStatus(initialStatus)
      })
      .catch(() => {
        setSubmitStatus(failedRequest)
      })
  }

  return (
    <div className="w-10/12 flex flex-col items-center justify-center">
      <p># Sucursal: <span className="text-mp-blue">{order.branchId}</span></p>
      <>
        {
          loadProvidersStatus.onLoading ? <LuLoaderCircle className="animate-spin" /> :
            <>
              <label htmlFor="providerId" className="text-slate-600 mt-4 text-sm">Selecciona un proveedor</label>
              <select
                name="providerId" id="providerId"
                className="mb-4 w-2/3 p-2 focus:border-none border text-mp-dark border-mp-soft-dark rounded border-opacity-20"
                onChange={(e) => setOrder({ ...order, providerId: parseInt(e.currentTarget.value) })}
              >
                <option value={0}>-Proveedor</option>
                {providers.map((provider) => <option value={provider.id} key={`provider-id-${provider.id}`} >{provider.name}</option>)}
              </select>
            </>
        }
      </>

      <button
        className="ring-offset-background focus-visible:ring-ring flex w-1/3 items-center 
                    justify-center whitespace-nowrap rounded-md bg-mp-green p-4 text-sm font-medium 
                    text-mp-white transition-colors hover:bg-mp-light-green focus-visible:outline-none 
                    focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none 
                    disabled:opacity-50 mb-4"
        onClick={handleNewOrder}
        disabled={order.providerId == 0}
      >
        {submitStatus.onLoading ? <Spinner /> : 'Registrar'}
      </button>
      {submitStatus.onError && <p>No fue posible completar el registro inténtalo más tarde </p>}
    </div>
  )
}
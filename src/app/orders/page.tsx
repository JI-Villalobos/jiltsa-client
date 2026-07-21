'use client'

import { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import Modal from "../components/shared/Modal";
import { CreatePurchaseForm } from "./components/CreatePurchaseForm";
import { getOrders, Order } from "../services/api/orders";
import { failedRequest, initialStatus, pendingRequest } from "../services";
import { getBranchId } from "@/utils/appStorage";
import { Purchase } from "./components/Purchase";

export default function Orders() {
  const [showModal, setShowModal] = useState(false)
  const [orders, setOrders] = useState<Order[]>([])
  const [status, setStatus] = useState(initialStatus)

  useEffect(() => {
    const branchId = getBranchId()
    if (branchId) {
      setStatus(pendingRequest)
      getOrders(branchId)
        .then((res) => {
          setOrders(res)
          setStatus(initialStatus)
        })
        .catch(() => {
          setStatus(failedRequest)
        })
    }
  }, [])

  return (
    <Layout>
      <div className="w-full flex flex-col items-center justify-center">
        <button className="transition delay-150 duration-300 ease-in-out  
                            hover:-translate-y-1 hover:scale-110 text-mp-white 
                            text-center bg-gradient-to-r from-mp-green to-mp-blue  
                            p-2 rounded mt-6"
          onClick={() => setShowModal(true)}
        >
          Crear Orden
        </button>
        <div className="flex flex-col items-center justify-center w-8/12 ">
          <p className="text-slate-700 mt-4 text-mp-green">Ordenes abiertas</p>
          {
            orders.map((order) => <Purchase key={`id-key-${order.id}`} order={order} />)
          }
        </div>
      </div>
      {
        showModal &&
        <Modal onClose={() => setShowModal(false)}>
          <CreatePurchaseForm />
        </Modal>
      }
    </Layout>
  )
}
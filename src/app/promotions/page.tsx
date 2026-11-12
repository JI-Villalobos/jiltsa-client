'use client'

import { useCallback, useEffect, useState } from "react"
import { LuLoaderCircle } from "react-icons/lu"
import Layout from "../layouts/Layout"
import Modal from "../components/shared/Modal"
import { failedRequestFrom, initialStatus, pendingRequest } from "../services"
import { getActivePromotions, Promotion } from "../services/api/promotions"
import { getBranchId } from "@/utils/appStorage"
import { CreatePromotionForm } from "./components/CreatePromotionForm"
import { PromotionCard } from "./components/PromotionCard"

const LOAD_ERROR = 'No se pudieron cargar las promociones. Intenta nuevamente más tarde.'

export default function Promotions() {
  const [showModal, setShowModal] = useState(false)
  const [promotions, setPromotions] = useState<Promotion[]>([])
  const [status, setStatus] = useState(initialStatus)

  const loadPromotions = useCallback(() => {
    const branchId = getBranchId()
    if (!branchId) return
    setStatus(pendingRequest)
    getActivePromotions(branchId)
      .then((res) => {
        setPromotions(res)
        setStatus(initialStatus)
      })
      .catch((e) => {
        setStatus(failedRequestFrom(e, LOAD_ERROR))
      })
  }, [])

  useEffect(() => {
    loadPromotions()
  }, [loadPromotions])

  return (
    <Layout>
      <div className="w-full flex flex-col items-center justify-center">
        <button
          className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 text-mp-white
                     text-center bg-gradient-to-r from-mp-green to-mp-blue p-2 rounded mt-6"
          onClick={() => setShowModal(true)}
        >
          Crear Promoción
        </button>
        <div className="flex flex-col items-center justify-center w-8/12">
          <p className="mt-4 text-mp-green">Promociones activas</p>
          {status.onLoading ? (
            <div className="mt-6 flex items-center gap-2 text-mp-green">
              <LuLoaderCircle className="animate-spin" size={20} />
              <span>Cargando promociones...</span>
            </div>
          ) : status.onError ? (
            <p className="mt-6 text-sm text-mp-error">{status.message ?? LOAD_ERROR}</p>
          ) : promotions.length === 0 ? (
            <p className="mt-6 text-sm text-mp-soft-dark">No hay promociones activas en esta sucursal</p>
          ) : (
            promotions.map((promotion) => (
              <PromotionCard key={`promotion-${promotion.id}`} promotion={promotion} onClosed={loadPromotions} />
            ))
          )}
        </div>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreatePromotionForm />
        </Modal>
      )}
    </Layout>
  )
}

'use client'

import Layout from "@/app/layouts/Layout"
import Skeleton from "@/app/components/Skeleton"
import Error from "@/app/components/shared/Error"
import Modal from "@/app/components/shared/Modal"
import { failedRequestFrom, initialStatus, pendingRequest } from "@/app/services"
import { getFilesByPromotion, PromotionFiles, StoredFile } from "@/app/services/api/files"
import { getLossByPromotion, RecordingLossExpiration } from "@/app/services/api/expirationLosses"
import { estimatedLoss, getPromotion, Promotion, PromotionItem } from "@/app/services/api/promotions"
import { useXLSXPromotionItemsStore } from "@/app/hooks/useXLSXPromotionItemsStore"
import { formatAmount } from "@/utils/formatAmount"
import { mapPromotionItems } from "@/utils/mapper"
import { generateTemplate, PROMOTION_ITEM_SCHEMA, xlsxReader } from "@/utils/xlsx-utils"
import { use, useCallback, useEffect, useState } from "react"
import { LuFileSpreadsheet, LuFolder, LuPlus } from "react-icons/lu"
import { ClosePromotionModal } from "../components/ClosePromotionModal"
import { ItemPhotos } from "../components/ItemPhotos"
import { PromotionItemForm } from "../components/PromotionItemForm"
import { PromotionItemRow } from "../components/PromotionItemRow"
import { PromotionItemsPreviewModal } from "../components/PromotionItemsPreviewModal"
import { PromotionStepper } from "../components/PromotionStepper"

const LOAD_ERROR = 'No fue posible cargar la promoción'
const TEMPLATE_NAME = 'plantilla-promocion.xlsx'

export default function PromotionId({ params }: { params: Promise<{ promotionId: string }> }) {
  const { promotionId } = use(params)
  const id = parseInt(promotionId)

  const [promotion, setPromotion] = useState<Promotion>()
  const [files, setFiles] = useState<PromotionFiles>()
  const [loss, setLoss] = useState<RecordingLossExpiration>()
  const [status, setStatus] = useState(initialStatus)
  const [xlsxError, setXlsxError] = useState('')
  const [showItemForm, setShowItemForm] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [showCloseModal, setShowCloseModal] = useState(false)

  const { setItems: setXlsxItems } = useXLSXPromotionItemsStore()

  const loadFiles = useCallback(() => {
    getFilesByPromotion(id)
      .then(setFiles)
      .catch(() => setFiles(undefined))
  }, [id])

  const loadPromotion = useCallback(() => {
    setStatus(pendingRequest)
    getPromotion(id)
      .then((res) => {
        setPromotion(res)
        setStatus(initialStatus)
        loadFiles()
        if (res.active === false) {
          getLossByPromotion(id).then(setLoss).catch(() => setLoss(undefined))
        }
      })
      .catch((e) => {
        setStatus(failedRequestFrom(e, LOAD_ERROR))
      })
  }, [id, loadFiles])

  useEffect(() => {
    loadPromotion()
  }, [loadPromotion])

  const items = promotion?.items ?? []
  const active = promotion?.active !== false
  const filesByItem = new Map<number, StoredFile[]>(
    (files?.items ?? []).map((entry) => [entry.itemId ?? -1, entry.files ?? []])
  )
  const photosOf = (item: PromotionItem) => filesByItem.get(item.id ?? -1) ?? []
  const totalPhotos = files?.files ?? 0
  const currentStep = items.length === 0 ? 2 : totalPhotos === 0 ? 3 : 4

  const handleReadXlsx = async (file: File) => {
    setXlsxError('')
    try {
      const rows = await xlsxReader(file)
      const mapped = mapPromotionItems(rows)
      if (mapped.length === 0) {
        setXlsxError('El archivo no tiene artículos. Descarga la plantilla y respeta sus columnas.')
        return
      }
      setXlsxItems(mapped)
      setShowPreview(true)
    } catch {
      setXlsxError('No fue posible leer el archivo')
    }
  }

  const handleItemsAdded = (added: PromotionItem[]) => {
    if (!promotion) return
    setPromotion({ ...promotion, items: [...items, ...added] })
    setShowItemForm(false)
    setShowPreview(false)
  }

  const handleItemSold = (updated: PromotionItem) => {
    if (!promotion) return
    setPromotion({ ...promotion, items: items.map((item) => item.id === updated.id ? updated : item) })
  }

  const handleClosed = (recorded: RecordingLossExpiration) => {
    setShowCloseModal(false)
    setLoss(recorded)
    if (promotion) setPromotion({ ...promotion, active: false })
  }

  const xlsxInput = (
    <input
      type="file"
      accept=".xlsx"
      className="absolute inset-0 h-full w-full opacity-0 cursor-pointer"
      onChange={(e) => {
        const selected = e.target.files
        if (selected && selected.length > 0) handleReadXlsx(selected[0])
        e.target.value = ''
      }}
    />
  )

  return (
    <Layout>
      <div className="w-10/12 flex flex-col justify-center items-center py-4 gap-4">
        {status.onLoading && <Skeleton />}
        {status.onError && <Error message={status.message} />}
        {promotion && !status.onLoading && !status.onError && (
          <>
            {active && <PromotionStepper current={currentStep} />}

            <div className="w-full max-w-3xl rounded-2xl border border-mp-green/20 bg-white p-2 shadow-sm">
              <div className="flex items-center justify-between border-b border-mp-green/10 pb-2">
                <div className="flex flex-row items-center gap-1 text-sm">
                  <p className="text-mp-dark">Promoción</p>
                  <h2 className="font-semibold text-mp-green">#{promotion.id}</h2>
                  <p className="text-mp-blue ml-2">{promotion.promotionName}</p>
                </div>
                <div className="flex flex-row items-center gap-2">
                  {active && (
                    <button
                      className="rounded bg-gradient-to-r from-mp-green to-mp-blue px-3 py-1 text-sm text-mp-white"
                      onClick={() => setShowCloseModal(true)}
                    >
                      Cerrar promoción
                    </button>
                  )}
                  <span className="rounded-full bg-mp-green/10 px-3 py-1 text-sm text-mp-green">
                    {active ? 'Activa' : 'Cerrada'}
                  </span>
                </div>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-4 text-sm">
                <div className="flex flex-row items-center gap-1">
                  <p className="text-mp-dark">Creada:</p>
                  <p className="text-mp-dark">{promotion.creationDate ?? '—'}</p>
                </div>
                <div className="flex flex-row items-center gap-1">
                  <p className="text-mp-dark">Termina:</p>
                  <p className="text-mp-green">{promotion.promotionEndDate}</p>
                </div>
                <div className="flex flex-row items-center gap-1">
                  <p className="text-mp-dark">Artículos:</p>
                  <p className="text-mp-blue">{items.length}</p>
                </div>
                <div className="flex flex-row items-center gap-1">
                  <p className="text-mp-dark">{loss ? 'Pérdida registrada:' : 'Pérdida estimada:'}</p>
                  <p className="text-mp-strong-red">{formatAmount(loss?.totalLoss ?? estimatedLoss(items))}</p>
                </div>
              </div>
              {loss && (
                <p className="mt-2 text-xs text-mp-soft-dark">
                  Pérdida por caducidad #{loss.id} registrada el {loss.creationDate}
                </p>
              )}
            </div>

            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center w-8/12">
                <p className="text-mp-soft-dark">No hay artículos</p>
                {active && (
                  <>
                    <div className="flex flex-row items-center gap-4 text-sm p-2">
                      <button className="text-mp-green underline hover:text-mp-light-green" onClick={() => setShowItemForm(true)}>
                        Agregar manualmente
                      </button>
                      <button className="text-mp-green underline hover:text-mp-light-green" onClick={() => generateTemplate(PROMOTION_ITEM_SCHEMA, TEMPLATE_NAME)}>
                        Descargar plantilla
                      </button>
                    </div>
                    <div className="relative h-48 w-8/12 rounded-lg border-dashed border-2 border-mp-dark/25 bg-mp-dark/5 flex justify-center items-center">
                      <div className="flex flex-col items-center">
                        <LuFolder size={60} className="text-mp-dark/25" />
                        <span className="block text-mp-dark/25 font-normal">Agrega los artículos desde un xlsx</span>
                        <span className="block text-xs text-mp-dark/25">Caducidad en formato AAAA-MM-DD</span>
                      </div>
                      {xlsxInput}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="w-full flex flex-col gap-2">
                {active && (
                  <div className="flex flex-row items-center justify-end gap-3 text-xs">
                    <button className="flex items-center gap-1 text-mp-green hover:text-mp-light-green" onClick={() => setShowItemForm(true)}>
                      <LuPlus size={16} /> Agregar artículo
                    </button>
                    <button className="flex items-center gap-1 text-mp-green hover:text-mp-light-green" onClick={() => generateTemplate(PROMOTION_ITEM_SCHEMA, TEMPLATE_NAME)}>
                      <LuFileSpreadsheet size={16} /> Descargar plantilla
                    </button>
                    <span className="relative flex items-center gap-1 text-mp-blue hover:text-mp-green cursor-pointer">
                      <LuFolder size={16} /> Cargar xlsx
                      {xlsxInput}
                    </span>
                  </div>
                )}
                <div className="w-full p-1 grid grid-cols-20 gap-1 text-xs rounded bg-gradient-to-r from-mp-green to-mp-blue text-mp-white">
                  <p className="col-span-2">Clave</p>
                  <p className="col-span-5">Descripción</p>
                  <p className="col-span-1 text-center">Cant.</p>
                  <p className="col-span-2">Normal</p>
                  <p className="col-span-2">Promo</p>
                  <p className="col-span-2">Compra</p>
                  <p className="col-span-2">Caducidad</p>
                  <p className="col-span-2">Pérdida</p>
                  <p className="col-span-1 text-center">Fotos</p>
                  <p className="col-span-1"></p>
                </div>
                {items.map((item) => (
                  <PromotionItemRow key={item.id} item={item} active={active} photos={photosOf(item).length} onSold={handleItemSold} />
                ))}
              </div>
            )}
            {xlsxError && <p className="text-sm text-mp-error">{xlsxError}</p>}

            {items.length > 0 && (
              <div className="w-full flex flex-col gap-2 mt-2">
                <p className="text-mp-green">Fotografías</p>
                {items.map((item) => (
                  <ItemPhotos key={`photos-${item.id}`} item={item} files={photosOf(item)} active={active} onUploaded={loadFiles} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
      {showItemForm && promotion && (
        <Modal onClose={() => setShowItemForm(false)}>
          <PromotionItemForm promotionId={promotion.id!} onAdded={(item) => handleItemsAdded([item])} />
        </Modal>
      )}
      {showPreview && promotion && (
        <Modal onClose={() => setShowPreview(false)}>
          <PromotionItemsPreviewModal promotionId={promotion.id!} onSaved={handleItemsAdded} />
        </Modal>
      )}
      {showCloseModal && promotion && (
        <Modal onClose={() => setShowCloseModal(false)}>
          <ClosePromotionModal promotion={promotion} onClosed={handleClosed} />
        </Modal>
      )}
    </Layout>
  )
}

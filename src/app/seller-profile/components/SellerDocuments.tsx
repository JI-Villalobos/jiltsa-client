'use client'

import { failedRequestFrom, initialStatus, pendingRequest, RequestStatus } from "@/app/services"
import { DocumentType, StoredFile, uploadFile } from "@/app/services/api/files"
import { useState } from "react"
import { LuCircleCheck, LuLoaderCircle, LuUpload } from "react-icons/lu"

const UPLOAD_ERROR = 'No fue posible subir el documento, inténtalo de nuevo'

export const REQUIRED_DOCUMENTS: { type: DocumentType, label: string }[] = [
  { type: 'INE_FRONT', label: 'INE (frente)' },
  { type: 'INE_BACK', label: 'INE (reverso)' },
  { type: 'ADDRESS_PROOF', label: 'Comprobante de domicilio' }
]

const formatSize = (bytes?: number) => {
  if (bytes === undefined) return ''
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

interface Props {
  profileId: number
  /** File records of the profile; only their metadata is shown, nothing is fetched from the bucket. */
  files: StoredFile[]
  onUploaded: () => void
}

interface DocumentRowProps {
  profileId: number
  type: DocumentType
  label: string
  file?: StoredFile
  onUploaded: () => void
}

const DocumentRow = ({ profileId, type, label, file, onUploaded }: DocumentRowProps) => {
  const [status, setStatus] = useState<RequestStatus>(initialStatus)

  const handleFile = async (selected: FileList | null) => {
    if (!selected || selected.length === 0) return
    setStatus(pendingRequest)
    try {
      await uploadFile(selected[0], 'SELLER_PROFILE', profileId, type)
      setStatus(initialStatus)
      onUploaded()
    } catch (e) {
      setStatus(failedRequestFrom(e, e instanceof Error ? e.message : UPLOAD_ERROR))
    }
  }

  return (
    <div className="flex flex-row items-center justify-between gap-2 rounded border border-mp-green/20 p-2 text-xs">
      <div className="flex flex-row items-center gap-2 min-w-0">
        {file
          ? <LuCircleCheck className="shrink-0 text-mp-green" size={18} />
          : <LuUpload className="shrink-0 text-mp-soft-dark/50" size={18} />}
        <div className="flex flex-col min-w-0">
          <span className="text-sm text-mp-dark">{label}</span>
          {file ? (
            <span className="text-mp-soft-dark truncate" title={file.fileName}>
              {file.fileName} · {formatSize(file.sizeBytes)} · {file.uploadedAt?.slice(0, 10) ?? file.createdAt?.slice(0, 10)}
              {file.uploadedBy ? ` · ${file.uploadedBy}` : ''}
            </span>
          ) : (
            <span className="text-mp-strong-red">Pendiente de subir</span>
          )}
        </div>
      </div>
      {!file && (
        <label className="relative shrink-0 flex items-center gap-1 rounded bg-gradient-to-r from-mp-green to-mp-blue px-3 py-1 text-mp-white cursor-pointer">
          {status.onLoading ? <LuLoaderCircle className="animate-spin" size={14} /> : <LuUpload size={14} />}
          Subir
          <input
            type="file"
            accept="image/*,.pdf"
            className="absolute inset-0 opacity-0 cursor-pointer"
            disabled={status.onLoading}
            onChange={(e) => {
              handleFile(e.target.files)
              e.target.value = ''
            }}
          />
        </label>
      )}
      {status.onError && <p className="text-mp-error">{status.message ?? UPLOAD_ERROR}</p>}
    </div>
  )
}

export const SellerDocuments = ({ profileId, files, onUploaded }: Props) => {
  const uploadedOf = (type: DocumentType) =>
    files.find((file) => file.documentType === type && file.status === 'UPLOADED')
  const missing = REQUIRED_DOCUMENTS.filter((doc) => !uploadedOf(doc.type)).length

  return (
    <div className="w-full max-w-3xl rounded-2xl border border-mp-green/20 bg-white p-4 shadow-sm flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="text-mp-green">Documentos</h3>
        <span className={missing === 0 ? "text-xs text-mp-green" : "text-xs text-mp-strong-red"}>
          {missing === 0 ? 'Expediente completo' : `${missing} pendiente${missing === 1 ? '' : 's'}`}
        </span>
      </div>
      {REQUIRED_DOCUMENTS.map((doc) => (
        <DocumentRow key={doc.type} profileId={profileId} type={doc.type} label={doc.label} file={uploadedOf(doc.type)} onUploaded={onUploaded} />
      ))}
    </div>
  )
}

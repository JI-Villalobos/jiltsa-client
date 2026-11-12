import axios from "axios"
import { authOptions, endPoints } from ".."

export type FileOwnerType = 'PROMOTION_ITEM' | 'SELLER_PROFILE'
export type FileStatus = 'PENDING' | 'UPLOADED'
/** Documents a seller profile must have. Promotion item photos carry no document type. */
export type DocumentType = 'INE_FRONT' | 'INE_BACK' | 'ADDRESS_PROOF'

export interface StoredFile {
  id?: number
  fileName?: string
  contentType?: string
  sizeBytes?: number
  status?: FileStatus
  ownerType?: FileOwnerType
  ownerId?: number
  documentType?: DocumentType
  uploadedBy?: string
  createdAt?: string
  uploadedAt?: string
  /** Presigned URL, present once the file is UPLOADED. */
  downloadUrl?: string
  downloadUrlExpiresAt?: string
}

export interface UploadRequest {
  fileName: string
  contentType: string
  sizeBytes: number
  ownerType: FileOwnerType
  ownerId: number
  documentType?: DocumentType
}

export interface UploadUrl {
  fileId?: number
  objectKey?: string
  method?: string
  uploadUrl?: string
  headers?: Record<string, string>
  expiresAt?: string
}

export interface PromotionItemFiles {
  itemId?: number
  key?: string
  description?: string
  files?: StoredFile[]
}

export interface PromotionFiles {
  promotionId?: number
  promotionName?: string
  files?: number
  items?: PromotionItemFiles[]
}

export const requestUpload = async (request: UploadRequest) => {
  const { data } = await axios.post<UploadUrl>(endPoints.files.requestUpload, request, authOptions())

  return data
}

export const confirmUpload = async (fileId: number) => {
  const { data } = await axios.post<StoredFile>(endPoints.files.confirm(fileId), null, authOptions())

  return data
}

export const getFilesByPromotion = async (promotionId: number) => {
  const { data } = await axios.get<PromotionFiles>(endPoints.files.getByPromotion(promotionId), authOptions())

  return data
}

/** Uploaded files of an entity, newest first. Each carries a presigned download URL the caller may ignore. */
export const getFilesByOwner = async (ownerType: FileOwnerType, ownerId: number) => {
  const { data } = await axios.get<StoredFile[]>(endPoints.files.getByOwner(ownerType, ownerId), authOptions())

  return data
}

export const deleteFile = async (fileId: number) => {
  await axios.delete(endPoints.files.byId(fileId), authOptions())
}

/**
 * Full upload flow: ask the API for a presigned URL, PUT the file to the bucket
 * with exactly the headers the API returned (no Authorization header, it is S3),
 * then confirm so the record goes from PENDING to UPLOADED.
 */
export const uploadFile = async (
  file: File,
  ownerType: FileOwnerType,
  ownerId: number,
  documentType?: DocumentType
): Promise<StoredFile> => {
  const upload = await requestUpload({
    fileName: file.name,
    contentType: file.type || 'application/octet-stream',
    sizeBytes: file.size,
    ownerType,
    ownerId,
    documentType
  })

  if (!upload.uploadUrl || upload.fileId === undefined) {
    throw new Error('La API no devolvió una URL de carga')
  }

  const response = await fetch(upload.uploadUrl, {
    method: upload.method ?? 'PUT',
    headers: upload.headers ?? {},
    body: file
  })
  if (!response.ok) {
    throw new Error(`No fue posible subir ${file.name} al almacenamiento (HTTP ${response.status})`)
  }

  return confirmUpload(upload.fileId)
}

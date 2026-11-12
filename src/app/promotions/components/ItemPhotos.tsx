'use client'

import { failedRequestFrom, initialStatus, pendingRequest, RequestStatus } from "@/app/services"
import { StoredFile, uploadFile } from "@/app/services/api/files"
import { PromotionItem } from "@/app/services/api/promotions"
import Image from "next/image"
import { useState } from "react"
import { LuImagePlus, LuLoaderCircle } from "react-icons/lu"

const UPLOAD_ERROR = 'No fue posible subir la fotografía, inténtalo de nuevo'

interface Props {
  item: PromotionItem
  files: StoredFile[]
  /** Uploads are only allowed while the promotion is active. */
  active: boolean
  onUploaded: () => void
}

export const ItemPhotos = ({ item, files, active, onUploaded }: Props) => {
  const [status, setStatus] = useState<RequestStatus>(initialStatus)
  const [progress, setProgress] = useState('')
  const uploaded = files.filter((file) => file.status === 'UPLOADED' && file.downloadUrl)

  const handleFiles = async (selected: FileList | null) => {
    if (!selected || selected.length === 0) return
    setStatus(pendingRequest)
    try {
      const list = Array.from(selected)
      for (let index = 0; index < list.length; index++) {
        setProgress(`${index + 1}/${list.length}`)
        await uploadFile(list[index], 'PROMOTION_ITEM', item.id!)
      }
      setStatus(initialStatus)
      onUploaded()
    } catch (e) {
      setStatus(failedRequestFrom(e, e instanceof Error ? e.message : UPLOAD_ERROR))
    } finally {
      setProgress('')
    }
  }

  return (
    <div className="w-full rounded border border-mp-green/20 p-2 flex flex-col gap-2">
      <div className="flex flex-row items-center justify-between text-xs">
        <p className="text-mp-dark truncate">
          <span className="text-mp-green">{item.key}</span>{item.description ? ` · ${item.description}` : ''}
        </p>
        <span className="text-mp-soft-dark">{uploaded.length} foto{uploaded.length === 1 ? '' : 's'}</span>
      </div>
      <div className="flex flex-row flex-wrap gap-2">
        {uploaded.map((file) => (
          <a
            key={file.id}
            href={file.downloadUrl}
            target="_blank"
            rel="noreferrer"
            title={file.fileName}
            className="relative h-24 w-24 overflow-hidden rounded border border-mp-green/20"
          >
            <Image src={file.downloadUrl!} alt={file.fileName ?? item.key} fill sizes="96px" className="object-cover" />
          </a>
        ))}
        {active && (
          <label
            className="relative h-24 w-24 flex flex-col items-center justify-center rounded border-2 border-dashed border-mp-dark/25
                       bg-mp-dark/5 text-mp-dark/40 hover:text-mp-blue hover:border-mp-blue cursor-pointer text-xs"
            title="Agregar fotografías"
          >
            {status.onLoading
              ? <><LuLoaderCircle className="animate-spin" size={22} /><span>{progress}</span></>
              : <><LuImagePlus size={22} /><span>Agregar</span></>}
            <input
              type="file"
              accept="image/*"
              multiple
              className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
              disabled={status.onLoading}
              onChange={(e) => {
                handleFiles(e.target.files)
                e.target.value = ''
              }}
            />
          </label>
        )}
      </div>
      {status.onError && <p className="text-xs text-mp-error">{status.message ?? UPLOAD_ERROR}</p>}
    </div>
  )
}

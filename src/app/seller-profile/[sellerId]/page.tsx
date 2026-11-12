'use client'

import Layout from "@/app/layouts/Layout"
import Skeleton from "@/app/components/Skeleton"
import Error from "@/app/components/shared/Error"
import { failedRequestFrom, initialStatus, pendingRequest } from "@/app/services"
import { getFilesByOwner, StoredFile } from "@/app/services/api/files"
import { getProfileBySeller, SellerProfile } from "@/app/services/api/sellerProfiles"
import { getCurrentAccounting } from "@/utils/appStorage"
import Link from "next/link"
import { use, useCallback, useEffect, useState } from "react"
import { SellerDocuments } from "../components/SellerDocuments"
import { SellerProfileDetails } from "../components/SellerProfileDetails"
import { SellerProfileForm } from "../components/SellerProfileForm"

const LOAD_ERROR = 'No fue posible cargar el expediente de la vendedora'

export default function SellerProfilePage({ params }: { params: Promise<{ sellerId: string }> }) {
  const { sellerId } = use(params)
  const id = parseInt(sellerId)

  const [sellerName, setSellerName] = useState('')
  const [profile, setProfile] = useState<SellerProfile>()
  const [files, setFiles] = useState<StoredFile[]>([])
  const [status, setStatus] = useState(initialStatus)

  const loadFiles = useCallback((profileId: number) => {
    getFilesByOwner('SELLER_PROFILE', profileId)
      .then(setFiles)
      .catch(() => setFiles([]))
  }, [])

  useEffect(() => {
    // The seller of the open shift is the only one this page knows by name; the API still answers for any seller id.
    const accounting = getCurrentAccounting()
    if (accounting && accounting.sellerId === id) setSellerName(accounting.seller)

    setStatus(pendingRequest)
    getProfileBySeller(id)
      .then((found) => {
        setProfile(found)
        setStatus(initialStatus)
        if (found?.id !== undefined) loadFiles(found.id)
      })
      .catch((e) => {
        setStatus(failedRequestFrom(e, LOAD_ERROR))
      })
  }, [id, loadFiles])

  const handleCreated = (created: SellerProfile) => {
    setProfile(created)
    if (created.id !== undefined) loadFiles(created.id)
  }

  return (
    <Layout>
      <div className="w-10/12 flex flex-col justify-center items-center py-4 gap-4">
        <Link href="/seller-home" className="self-start text-xs text-mp-blue hover:text-mp-green">← Volver</Link>
        {status.onLoading && <Skeleton />}
        {status.onError && <Error message={status.message} />}
        {!status.onLoading && !status.onError && (
          profile ? (
            <>
              <SellerProfileDetails profile={profile} />
              {profile.id !== undefined && (
                <SellerDocuments profileId={profile.id} files={files} onUploaded={() => loadFiles(profile.id!)} />
              )}
            </>
          ) : sellerName ? (
            <SellerProfileForm sellerId={id} sellerName={sellerName} onCreated={handleCreated} />
          ) : (
            <p className="text-sm text-mp-soft-dark text-center">
              La vendedora #{id} no tiene expediente y no es la del turno abierto, así que no se puede crear desde aquí.
            </p>
          )
        )}
      </div>
    </Layout>
  )
}

'use client'

import { SellerProfile } from "@/app/services/api/sellerProfiles"
import { formatAmount } from "@/utils/formatAmount"
import { LuUserCheck } from "react-icons/lu"

interface Props {
  profile: SellerProfile
}

const Item = ({ label, value }: { label: string, value?: string | number }) => (
  <div className="flex flex-col">
    <span className="text-xs text-mp-soft-dark">{label}</span>
    <span className="text-sm text-mp-dark">{value === undefined || value === '' ? '—' : value}</span>
  </div>
)

export const SellerProfileDetails = ({ profile }: Props) => (
  <div className="w-full max-w-3xl rounded-2xl border border-mp-green/20 bg-white p-4 shadow-sm">
    <div className="flex items-center justify-between border-b border-mp-green/10 pb-2">
      <div className="flex flex-row items-center gap-2">
        <LuUserCheck className="text-mp-green" size={20} />
        <h2 className="text-mp-blue text-lg">{profile.fullName}</h2>
      </div>
      <span className="rounded-full bg-mp-green/10 px-3 py-1 text-xs text-mp-green">Expediente #{profile.id}</span>
    </div>
    <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
      <Item label="Puesto" value={profile.position} />
      <Item label="Fecha de ingreso" value={profile.hireDate} />
      <Item label="Salario" value={formatAmount(profile.salary)} />
      <Item label="Fecha de nacimiento" value={profile.birthDate} />
      <Item label="Teléfono" value={profile.phone} />
      <Item label="Sucursal" value={profile.branchId} />
      <Item label="RFC" value={profile.rfc} />
      <Item label="CURP" value={profile.curp} />
      <Item label="Vendedora" value={`#${profile.sellerId}`} />
      <Item label="Contacto de emergencia" value={profile.emergencyContactName} />
      <Item label="Teléfono de emergencia" value={profile.emergencyContactPhone} />
      <Item label="Aviso de privacidad" value={profile.privacyNoticeAccepted ? `Aceptado ${profile.privacyNoticeAcceptedAt?.slice(0, 10) ?? ''}` : 'No aceptado'} />
    </div>
    <p className="mt-4 text-xs text-mp-soft-dark">
      Registrado por {profile.registeredBy ?? '—'} el {profile.createdAt?.slice(0, 10) ?? '—'}
    </p>
  </div>
)

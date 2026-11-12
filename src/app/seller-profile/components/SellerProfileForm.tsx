'use client'

import { failedRequestFrom, initialStatus, pendingRequest } from "@/app/services"
import { createProfile, CreateSellerProfile, CURP_PATTERN, PHONE_PATTERN, RFC_PATTERN, SellerProfile } from "@/app/services/api/sellerProfiles"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { DateTime } from "luxon"
import { useState } from "react"
import { LuLoaderCircle } from "react-icons/lu"
import * as Yup from "yup"

const SUBMIT_ERROR = 'No fue posible registrar el expediente, inténtalo más tarde'

const inputClass = "w-full rounded-lg border border-mp-gray-soft p-2 text-sm shadow-sm"

interface Props {
  sellerId: number
  /** Name of the seller as the session knows it; read-only in the form. */
  sellerName: string
  onCreated: (profile: SellerProfile) => void
}

interface Values {
  birthDate: string
  phone: string
  rfc: string
  curp: string
  emergencyContactName: string
  emergencyContactPhone: string
  hireDate: string
  position: string
  salary: string
  privacyNoticeAccepted: boolean
}

const today = () => DateTime.now().toISODate()

const validationSchema = Yup.object({
  birthDate: Yup.string().required('Ingresa la fecha de nacimiento')
    .test('past', 'La fecha de nacimiento debe ser anterior a hoy', (v) => !!v && v < today()),
  phone: Yup.string().trim().matches(PHONE_PATTERN, 'Teléfono inválido (solo dígitos, espacios, paréntesis o guiones)').required('Ingresa el teléfono'),
  rfc: Yup.string().trim().matches(RFC_PATTERN, { message: 'RFC inválido', excludeEmptyString: true }),
  curp: Yup.string().trim().matches(CURP_PATTERN, { message: 'CURP inválida', excludeEmptyString: true }),
  emergencyContactName: Yup.string().trim().max(255, 'Máximo 255 caracteres').required('Ingresa el contacto de emergencia'),
  emergencyContactPhone: Yup.string().trim().matches(PHONE_PATTERN, 'Teléfono inválido').required('Ingresa el teléfono de emergencia'),
  hireDate: Yup.string().required('Ingresa la fecha de ingreso')
    .test('not-future', 'La fecha de ingreso no puede ser futura', (v) => !!v && v <= today()),
  position: Yup.string().trim().max(255, 'Máximo 255 caracteres').required('Ingresa el puesto'),
  salary: Yup.number().typeError('Ingresa el salario').min(0, 'No puede ser negativo').required('Ingresa el salario'),
  privacyNoticeAccepted: Yup.boolean().oneOf([true], 'Debes aceptar el aviso de privacidad')
})

const Text = ({ name, label, placeholder, type = 'text', ...rest }: { name: keyof Values, label: string, placeholder?: string, type?: string, [k: string]: unknown }) => (
  <div>
    <label htmlFor={name} className="text-sm text-mp-strong-gray">{label}</label>
    <Field id={name} name={name} type={type} placeholder={placeholder} className={inputClass} {...rest} />
    <ErrorMessage name={name} component="p" className="text-xs text-mp-error" />
  </div>
)

export const SellerProfileForm = ({ sellerId, sellerName, onCreated }: Props) => {
  const [status, setStatus] = useState(initialStatus)

  const initialValues: Values = {
    birthDate: '', phone: '', rfc: '', curp: '', emergencyContactName: '', emergencyContactPhone: '',
    hireDate: '', position: '', salary: '', privacyNoticeAccepted: false
  }

  const handleSubmit = async (values: Values) => {
    setStatus(pendingRequest)
    const profile: CreateSellerProfile = {
      sellerId,
      fullName: sellerName,
      birthDate: values.birthDate,
      phone: values.phone.trim(),
      rfc: values.rfc.trim().toUpperCase() || undefined,
      curp: values.curp.trim().toUpperCase() || undefined,
      emergencyContactName: values.emergencyContactName.trim(),
      emergencyContactPhone: values.emergencyContactPhone.trim(),
      hireDate: values.hireDate,
      position: values.position.trim(),
      salary: Number(values.salary),
      privacyNoticeAccepted: values.privacyNoticeAccepted
    }
    await createProfile(profile)
      .then((created) => {
        setStatus(initialStatus)
        onCreated(created)
      })
      .catch((e) => {
        setStatus(failedRequestFrom(e, SUBMIT_ERROR))
      })
  }

  return (
    <div className="w-full max-w-3xl rounded-2xl border border-mp-green/20 bg-white p-4 shadow-sm flex flex-col items-center">
      <h2 className="text-mp-blue text-lg">Expediente de la vendedora</h2>
      <p className="text-xs text-mp-soft-dark mb-3 text-center">
        Aún no existe un expediente para <span className="text-mp-green">{sellerName}</span>. Llena el formulario para crearlo.
      </p>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-sm text-mp-strong-gray">Nombre completo</label>
            <input value={sellerName} readOnly className={`${inputClass} bg-mp-gray-soft text-mp-soft-dark`} />
          </div>
          <Text name="birthDate" label="Fecha de nacimiento" type="date" max={today()} />
          <Text name="phone" label="Teléfono" placeholder="871 123 4567" />
          <Text name="position" label="Puesto" placeholder="Vendedora" />
          <Text name="rfc" label="RFC (opcional)" placeholder="ABCD900101XXX" />
          <Text name="curp" label="CURP (opcional)" placeholder="ABCD900101MCLXXX00" />
          <Text name="hireDate" label="Fecha de ingreso" type="date" max={today()} />
          <Text name="salary" label="Salario $" type="number" min="0" step="0.01" placeholder="0.00" />
          <Text name="emergencyContactName" label="Contacto de emergencia" placeholder="Nombre" />
          <Text name="emergencyContactPhone" label="Teléfono de emergencia" placeholder="871 123 4567" />
          <div className="md:col-span-2">
            <label className="flex flex-row items-start gap-2 text-xs text-mp-dark cursor-pointer">
              <Field type="checkbox" name="privacyNoticeAccepted" className="mt-0.5" />
              <span>
                La vendedora acepta el aviso de privacidad: sus datos personales y documentos se usan únicamente
                para integrar su expediente laboral y se resguardan conforme a la ley.
              </span>
            </label>
            <ErrorMessage name="privacyNoticeAccepted" component="p" className="text-xs text-mp-error" />
          </div>
          <div className="md:col-span-2 flex flex-col items-center gap-2">
            <button
              type="submit"
              className="flex items-center justify-center text-mp-white bg-gradient-to-r from-mp-green to-mp-blue rounded p-2 w-40 disabled:opacity-50"
              disabled={status.onLoading}
            >
              {status.onLoading ? <LuLoaderCircle className="animate-spin" /> : 'Crear expediente'}
            </button>
            {status.onError && <p className="text-center text-sm text-mp-error">{status.message ?? SUBMIT_ERROR}</p>}
          </div>
        </Form>
      </Formik>
    </div>
  )
}

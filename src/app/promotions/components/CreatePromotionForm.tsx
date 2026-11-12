'use client'

import { failedRequestFrom, initialStatus, pendingRequest } from "@/app/services"
import { createPromotion, CreatePromotion } from "@/app/services/api/promotions"
import { getBranchId } from "@/utils/appStorage"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { DateTime } from "luxon"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { LuLoaderCircle } from "react-icons/lu"
import * as Yup from "yup"

const SUBMIT_ERROR = 'No fue posible abrir la promoción, inténtalo más tarde'

const inputClass = "w-full rounded-lg border border-mp-gray-soft p-2 text-sm shadow-sm"

interface Values {
  promotionName: string
  promotionEndDate: string
}

const today = () => DateTime.now().toISODate()

const validationSchema = Yup.object({
  promotionName: Yup.string().trim().max(255, 'Máximo 255 caracteres').required('Ingresa el nombre de la promoción'),
  promotionEndDate: Yup.string()
    .required('Selecciona la fecha de término')
    .test('not-past', 'La fecha de término no puede ser anterior a hoy', (value) => !!value && value >= today())
})

export const CreatePromotionForm = () => {
  const [status, setStatus] = useState(initialStatus)
  const router = useRouter()
  const branchId = getBranchId()

  const handleSubmit = async (values: Values) => {
    if (!branchId) {
      setStatus(failedRequestFrom(undefined, 'No se encontró la sucursal de la sesión'))
      return
    }
    setStatus(pendingRequest)
    const promotion: CreatePromotion = {
      promotionName: values.promotionName.trim(),
      promotionEndDate: values.promotionEndDate,
      branchId
    }
    await createPromotion(promotion)
      .then((created) => {
        router.push(`/promotions/${created.id}`)
      })
      .catch((e) => {
        setStatus(failedRequestFrom(e, SUBMIT_ERROR))
      })
  }

  return (
    <div className="w-10/12 flex flex-col items-center justify-center pb-4">
      <h2 className="text-mp-blue text-lg mb-1">Abrir promoción</h2>
      <p className="text-xs text-mp-soft-dark mb-3 text-center">
        Después podrás agregar los artículos y sus fotografías.
      </p>
      <Formik
        initialValues={{ promotionName: '', promotionEndDate: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="w-full flex flex-col gap-3">
          <div>
            <label htmlFor="promotionName" className="text-sm text-mp-strong-gray">Nombre</label>
            <Field id="promotionName" name="promotionName" className={inputClass} placeholder="Ej. Próximos a caducar noviembre" />
            <ErrorMessage name="promotionName" component="p" className="text-xs text-mp-error" />
          </div>
          <div>
            <label htmlFor="promotionEndDate" className="text-sm text-mp-strong-gray">Termina el</label>
            <Field id="promotionEndDate" name="promotionEndDate" type="date" min={today()} className={inputClass} />
            <ErrorMessage name="promotionEndDate" component="p" className="text-xs text-mp-error" />
          </div>
          <button
            type="submit"
            className="self-center flex items-center justify-center text-mp-white bg-gradient-to-r from-mp-green to-mp-blue rounded p-2 w-32 disabled:opacity-50"
            disabled={status.onLoading}
          >
            {status.onLoading ? <LuLoaderCircle className="animate-spin" /> : 'Abrir'}
          </button>
          {status.onError && <p className="text-center text-sm text-mp-error">{status.message ?? SUBMIT_ERROR}</p>}
        </Form>
      </Formik>
    </div>
  )
}

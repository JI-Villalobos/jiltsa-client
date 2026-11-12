'use client'

import { failedRequestFrom, initialStatus, pendingRequest } from "@/app/services"
import { addPromotionItem, CreatePromotionItem, PromotionItem } from "@/app/services/api/promotions"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useState } from "react"
import { LuLoaderCircle } from "react-icons/lu"
import * as Yup from "yup"

const SUBMIT_ERROR = 'No fue posible agregar el artículo, inténtalo más tarde'

const inputClass = "w-full rounded-lg border border-mp-gray-soft p-2 text-sm shadow-sm"

interface Props {
  promotionId: number
  onAdded: (item: PromotionItem) => void
}

interface Values {
  key: string
  description: string
  quantity: string
  normalPrice: string
  promotionPrice: string
  purchasePrice: string
  expirationDate: string
}

const price = (label: string) =>
  Yup.number().typeError(`Ingresa el ${label}`).min(0, 'No puede ser negativo').required(`Ingresa el ${label}`)

const validationSchema = Yup.object({
  key: Yup.string().trim().max(255, 'Máximo 255 caracteres').required('Ingresa la clave'),
  description: Yup.string().trim().max(255, 'Máximo 255 caracteres'),
  quantity: Yup.number().typeError('Ingresa la cantidad').integer('Debe ser un entero').min(1, 'Mínimo 1').required('Ingresa la cantidad'),
  normalPrice: price('precio normal'),
  promotionPrice: price('precio de promoción'),
  purchasePrice: price('precio de compra'),
  expirationDate: Yup.string().required('Selecciona la fecha de caducidad')
})

export const PromotionItemForm = ({ promotionId, onAdded }: Props) => {
  const [status, setStatus] = useState(initialStatus)

  const initialValues: Values = {
    key: '', description: '', quantity: '', normalPrice: '', promotionPrice: '', purchasePrice: '', expirationDate: ''
  }

  const handleSubmit = async (values: Values, { resetForm }: { resetForm: () => void }) => {
    setStatus(pendingRequest)
    const item: CreatePromotionItem = {
      promotionId,
      key: values.key.trim(),
      description: values.description.trim() || undefined,
      quantity: Number(values.quantity),
      normalPrice: Number(values.normalPrice),
      promotionPrice: Number(values.promotionPrice),
      purchasePrice: Number(values.purchasePrice),
      expirationDate: values.expirationDate
    }
    await addPromotionItem(item)
      .then((created) => {
        setStatus(initialStatus)
        resetForm()
        onAdded(created)
      })
      .catch((e) => {
        setStatus(failedRequestFrom(e, SUBMIT_ERROR))
      })
  }

  return (
    <div className="w-10/12 flex flex-col items-center justify-center pb-4">
      <h2 className="text-mp-blue text-lg mb-2">Agregar artículo</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form className="w-full grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="key" className="text-sm text-mp-strong-gray">Clave</label>
            <Field id="key" name="key" className={inputClass} placeholder="Clave del producto" />
            <ErrorMessage name="key" component="p" className="text-xs text-mp-error" />
          </div>
          <div>
            <label htmlFor="description" className="text-sm text-mp-strong-gray">Descripción</label>
            <Field id="description" name="description" className={inputClass} placeholder="Opcional" />
            <ErrorMessage name="description" component="p" className="text-xs text-mp-error" />
          </div>
          <div>
            <label htmlFor="quantity" className="text-sm text-mp-strong-gray">Cantidad</label>
            <Field id="quantity" name="quantity" type="number" min="1" step="1" className={inputClass} placeholder="0" />
            <ErrorMessage name="quantity" component="p" className="text-xs text-mp-error" />
          </div>
          <div>
            <label htmlFor="expirationDate" className="text-sm text-mp-strong-gray">Caducidad</label>
            <Field id="expirationDate" name="expirationDate" type="date" className={inputClass} />
            <ErrorMessage name="expirationDate" component="p" className="text-xs text-mp-error" />
          </div>
          <div>
            <label htmlFor="normalPrice" className="text-sm text-mp-strong-gray">Precio normal $</label>
            <Field id="normalPrice" name="normalPrice" type="number" min="0" step="0.01" className={inputClass} placeholder="0.00" />
            <ErrorMessage name="normalPrice" component="p" className="text-xs text-mp-error" />
          </div>
          <div>
            <label htmlFor="promotionPrice" className="text-sm text-mp-strong-gray">Precio promoción $</label>
            <Field id="promotionPrice" name="promotionPrice" type="number" min="0" step="0.01" className={inputClass} placeholder="0.00" />
            <ErrorMessage name="promotionPrice" component="p" className="text-xs text-mp-error" />
          </div>
          <div>
            <label htmlFor="purchasePrice" className="text-sm text-mp-strong-gray">Precio compra $</label>
            <Field id="purchasePrice" name="purchasePrice" type="number" min="0" step="0.01" className={inputClass} placeholder="0.00" />
            <ErrorMessage name="purchasePrice" component="p" className="text-xs text-mp-error" />
          </div>
          <div className="col-span-2 flex flex-col items-center gap-2">
            <button
              type="submit"
              className="flex items-center justify-center text-mp-white bg-gradient-to-r from-mp-green to-mp-blue rounded p-2 w-32 disabled:opacity-50"
              disabled={status.onLoading}
            >
              {status.onLoading ? <LuLoaderCircle className="animate-spin" /> : 'Agregar'}
            </button>
            {status.onError && <p className="text-center text-sm text-mp-error">{status.message ?? SUBMIT_ERROR}</p>}
          </div>
        </Form>
      </Formik>
    </div>
  )
}

'use client'

import { failedRequest, initialStatus, pendingRequest } from "@/app/services"
import { Order, updateOrder } from "@/app/services/api/orders"
import { OPERATIVE_EXPENSE_CATEGORIES, saveOperativeExpense } from "@/app/services/api/operativeExpenses"
import { getCurrentDate } from "@/utils/dateOperations"
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useState } from "react"
import { LuLoaderCircle } from "react-icons/lu"
import * as Yup from 'yup'

interface Props {
  order: Order
}

interface CloseOrderValues {
  notStocked: boolean
  invoice: string
  concept: string
  category: string
  amount: number
}

const expenseField = (schema: Yup.Schema) =>
  Yup.mixed().when('notStocked', {
    is: false,
    then: () => schema,
    otherwise: (s) => s.notRequired()
  })

const validationSchema = Yup.object({
  notStocked: Yup.boolean(),
  invoice: Yup.string(),
  concept: expenseField(Yup.string().trim().required('Ingresa un concepto')),
  category: expenseField(Yup.string().oneOf(OPERATIVE_EXPENSE_CATEGORIES).required('Selecciona una categoría')),
  amount: expenseField(Yup.number().typeError('Ingresa un monto válido').positive('El monto debe ser mayor a 0').required('Ingresa un monto'))
})

const inputClass = "w-full rounded-lg border border-mp-gray-soft p-2 text-sm shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"

export const CloseOrderModal = ({ order }: Props) => {
  const [status, setStatus] = useState(initialStatus)
  // Avoids registering the expense twice if closing the order fails and the user retries
  const [expenseSaved, setExpenseSaved] = useState(false)

  const initialValues: CloseOrderValues = {
    notStocked: false,
    invoice: '',
    concept: `Orden #${order.id}`,
    category: '',
    amount: order.realCost
  }

  const handleSubmit = async (values: CloseOrderValues) => {
    setStatus(pendingRequest)
    try {
      if (!values.notStocked && !expenseSaved) {
        await saveOperativeExpense({
          branchId: order.branchId,
          providerId: order.providerId,
          expenseDate: getCurrentDate(),
          invoice: values.invoice.trim() || undefined,
          concept: values.concept.trim(),
          category: values.category,
          amount: Number(values.amount)
        })
        setExpenseSaved(true)
      }

      const { items, ...orderData } = order
      await updateOrder({ ...orderData, isOpen: false })

      window.location.reload()
    } catch {
      setStatus(failedRequest)
    }
  }

  return (
    <div className="w-10/12 flex flex-col items-center justify-center pb-4">
      <h2 className="text-mp-blue text-lg mb-2">Cerrar orden #{order.id}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className="w-full flex flex-col gap-3">
            <label className="flex flex-row items-center gap-2 text-sm text-mp-dark cursor-pointer">
              <Field type="checkbox" name="notStocked" />
              Cerrar orden no surtida
            </label>

            <fieldset
              disabled={values.notStocked}
              className="flex flex-col gap-3 rounded border border-mp-green/20 p-3 disabled:opacity-50"
            >
              <legend className="px-1 text-sm text-mp-green">Gasto operativo</legend>

              <div>
                <label htmlFor="category" className="text-sm text-mp-strong-gray">Categoría</label>
                <Field as="select" id="category" name="category" className={inputClass}>
                  <option value="">-Selecciona una categoría</option>
                  {OPERATIVE_EXPENSE_CATEGORIES.map((category) => (
                    <option value={category} key={category}>{category}</option>
                  ))}
                </Field>
                <ErrorMessage name="category" component="p" className="text-xs text-mp-error" />
              </div>

              <div>
                <label htmlFor="concept" className="text-sm text-mp-strong-gray">Concepto</label>
                <Field id="concept" name="concept" className={inputClass} placeholder="Concepto" />
                <ErrorMessage name="concept" component="p" className="text-xs text-mp-error" />
              </div>

              <div>
                <label htmlFor="invoice" className="text-sm text-mp-strong-gray">Factura</label>
                <Field id="invoice" name="invoice" className={inputClass} placeholder="Folio de factura (opcional)" />
              </div>

              <div>
                <label htmlFor="amount" className="text-sm text-mp-strong-gray">Monto $</label>
                <Field id="amount" name="amount" type="number" step="0.01" className={inputClass} placeholder="0.00" />
                <ErrorMessage name="amount" component="p" className="text-xs text-mp-error" />
              </div>
            </fieldset>

            <button
              type="submit"
              className="self-center flex items-center justify-center text-mp-white bg-gradient-to-r from-mp-green to-mp-blue rounded p-2 w-32 disabled:opacity-50"
              disabled={status.onLoading}
            >
              {status.onLoading ? <LuLoaderCircle className="animate-spin" /> : 'Cerrar orden'}
            </button>
            {
              status.onError &&
              <p className="text-center text-sm text-mp-error">
                No fue posible cerrar la orden, inténtalo más tarde
              </p>
            }
          </Form>
        )}
      </Formik>
    </div>
  )
}

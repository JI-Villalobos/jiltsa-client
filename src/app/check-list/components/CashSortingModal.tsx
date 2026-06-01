'use client'

import { failedRequest, initialStatus, pendingRequest } from "@/app/services"
import { CashSorting, saveCashSorting } from "@/app/services/api/cashSorting"
import { deleteAccounting, getBranchId, getStoredCashSorting, storeCashSorting } from "@/utils/appStorage"
import { calculateTotalAmount, compare } from "@/utils/cashSortingUtils"
import { getCurrentDate } from "@/utils/dateOperations"
import { formatAmount } from "@/utils/formatAmount"
import { useRouter } from "next/navigation"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { LuLoader, LuLoaderCircle, LuRefreshCcw } from "react-icons/lu"

interface Props {
  mode: 'CHECK_IN' | 'CHECK_OUT'
  accountingId: number
  showContinueButton: Dispatch<SetStateAction<boolean>>
  showModal: Dispatch<SetStateAction<boolean>>
  continueButton: boolean
  balance: number | undefined
}

const defaultCashSorting: CashSorting = {
  accountingId: 0, branchId: 0, cashDate: getCurrentDate(),
  bt1000: 0, bt500: 0, bt200: 0,
  bt100: 0, bt50: 0, bt20: 0,
  md20: 0, md10: 0, md5: 0,
  md2: 0, md1: 0, md005: 0,
  bls10: 0, bls5: 0,
  bls2: 0, bls1: 0
}


export const CashSortingModal = ({ mode, accountingId, showContinueButton, showModal, continueButton, balance }: Props) => {
  const [cashSorting, setCashSorting] = useState<CashSorting>(defaultCashSorting)
  const [storedCashSorting, setStoredCashSorting] = useState<CashSorting>()
  const [submitStatus, setSubmitStatus] = useState(initialStatus)
  const [isCachSortingMatched, setIsCashSortingMatched] = useState(true)
  const [counted, setCounted] = useState(0)
  const [unmatch, setUnmatch] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const cs = getStoredCashSorting()
    const branchId = getBranchId()
    if (cs && branchId) {
      setStoredCashSorting(cs)
      setCashSorting({ ...cashSorting, accountingId: accountingId, branchId: branchId })
    }
  }, [])

  const handleRedirect = () => {
    if (mode == "CHECK_OUT") {
      deleteAccounting()
      router.push("/seller-home")
    }

    router.push("/seller-home")
  }

  const handleSubmit = async () => {
    setCounted(calculateTotalAmount(cashSorting))
    setUnmatch(counted != balance)

    if (counted == balance) {
      setSubmitStatus(pendingRequest)
      if (mode == 'CHECK_OUT') {
        await saveCashSorting(cashSorting)
          .then((res) => {
            setStoredCashSorting(res)
            storeCashSorting(res)
            setSubmitStatus(initialStatus)
            showContinueButton(!continueButton)
            handleRedirect()
            showModal(false)
          })
          .catch((e) => {
            console.log(e);

            setSubmitStatus(failedRequest)
          })
      } else {
        if (storedCashSorting) {
          const isMatched = compare(cashSorting, storedCashSorting)
          setIsCashSortingMatched(isMatched)

          if (isMatched) {
            await saveCashSorting(cashSorting)
              .then((res) => {
                console.log(res);
                storeCashSorting(res)
                setStoredCashSorting(res)
                setSubmitStatus(initialStatus)
                showContinueButton(!continueButton)
                handleRedirect()
                showModal(false)
              })
              .catch(() => {
                setSubmitStatus(failedRequest)
              })
          } else {
            setSubmitStatus(failedRequest)
          }
        }
      }
    }
  }

  return (
    <div>
      <form action="" className="flex flex-col items-center justify-center">
        {
          !isCachSortingMatched &&
          <p className="text-mp-error text-sm mb-2">El conteo no coincide con el registro realizado en el corte anterior</p>
        }
        <p className="text-mp-green">Ordena y cuenta el efectivo disponible</p>
        <p className="text-mp-dark text-sm mt-2">Conteo de billetes</p>
        <div className="grid grid-cols-2 gap-4 mt-2 mb-2 border border-mp-strong-gray rounded border-opacity-60 p-2">
          <div className="flex flex-col items-start justify-center">
            <label htmlFor="" className="text-xs text-mp-soft-dark">Billetes de $1,000</label>
            <input
              type="number" name="" id=""
              className="p-2 border border-mp-green border-opacity-40 rounded"
              onChange={(e) => setCashSorting({ ...cashSorting, bt1000: parseInt(e.currentTarget.value) })}
            />
          </div>
          <div className="flex flex-col items-start justify-center">
            <label htmlFor="" className="text-xs text-mp-soft-dark">Billetes de $500</label>
            <input
              type="number" name="" id=""
              className="p-2 border border-mp-green border-opacity-40 rounded"
              onChange={(e) => setCashSorting({ ...cashSorting, bt500: parseInt(e.currentTarget.value) })}
            />
          </div>
          <div className="flex flex-col items-start justify-center">
            <label htmlFor="" className="text-xs text-mp-soft-dark">Billetes de $200</label>
            <input
              type="number" name="" id=""
              className="p-2 border border-mp-green border-opacity-40 rounded"
              onChange={(e) => setCashSorting({ ...cashSorting, bt200: parseInt(e.currentTarget.value) })}
            />
          </div>
          <div className="flex flex-col items-start justify-center">
            <label htmlFor="" className="text-xs text-mp-soft-dark">Billetes de $100</label>
            <input
              type="number" name="" id=""
              className="p-2 border border-mp-green border-opacity-40 rounded"
              onChange={(e) => setCashSorting({ ...cashSorting, bt100: parseInt(e.currentTarget.value) })}
            />
          </div>
          <div className="flex flex-col items-start justify-center">
            <label htmlFor="" className="text-xs text-mp-soft-dark">Billetes de $50</label>
            <input
              type="number" name="" id=""
              className="p-2 border border-mp-green border-opacity-40 rounded"
              onChange={(e) => setCashSorting({ ...cashSorting, bt50: parseInt(e.currentTarget.value) })}
            />
          </div>
          <div className="flex flex-col items-start justify-center">
            <label htmlFor="" className="text-xs text-mp-soft-dark">Billetes de $20</label>
            <input
              type="number" name="" id=""
              className="p-2 border border-mp-green border-opacity-40 rounded"
              onChange={(e) => setCashSorting({ ...cashSorting, bt20: parseInt(e.currentTarget.value) })}
            />
          </div>
        </div>
        <p className="text-mp-dark text-sm mt-2">Conteo de monedas</p>
        <div className="grid grid-cols-2 gap-4 mt-2 mb-2 border border-mp-strong-gray rounded border-opacity-60 p-2">
          <div className="flex flex-col items-start justify-center">
            <label htmlFor="" className="text-xs text-mp-soft-dark">Monedas de $20</label>
            <input
              type="number" name="" id=""
              className="p-2 border border-mp-green border-opacity-40 rounded"
              onChange={(e) => setCashSorting({ ...cashSorting, md20: parseInt(e.currentTarget.value) })}
            />
          </div>
          <div className="flex flex-col items-start justify-center">
            <label htmlFor="" className="text-xs text-mp-soft-dark">Monedas de $10</label>
            <input
              type="number" name="" id=""
              className="p-2 border border-mp-green border-opacity-40 rounded"
              onChange={(e) => setCashSorting({ ...cashSorting, md10: parseInt(e.currentTarget.value) })}
            />
          </div>
          <div className="flex flex-col items-start justify-center">
            <label htmlFor="" className="text-xs text-mp-soft-dark">Monedas de $5</label>
            <input
              type="number" name="" id=""
              className="p-2 border border-mp-green border-opacity-40 rounded"
              onChange={(e) => setCashSorting({ ...cashSorting, md5: parseInt(e.currentTarget.value) })}
            />
          </div>
          <div className="flex flex-col items-start justify-center">
            <label htmlFor="" className="text-xs text-mp-soft-dark">Monedas de $2</label>
            <input
              type="number" name="" id=""
              className="p-2 border border-mp-green border-opacity-40 rounded"
              onChange={(e) => setCashSorting({ ...cashSorting, md2: parseInt(e.currentTarget.value) })}
            />
          </div>
          <div className="flex flex-col items-start justify-center">
            <label htmlFor="" className="text-xs text-mp-soft-dark">Monedas de $1</label>
            <input
              type="number" name="" id=""
              className="p-2 border border-mp-green border-opacity-40 rounded"
              onChange={(e) => setCashSorting({ ...cashSorting, md1: parseInt(e.currentTarget.value) })}
            />
          </div>
          <div className="flex flex-col items-start justify-center">
            <label htmlFor="" className="text-xs text-mp-soft-dark">Monedas de $.50</label>
            <input
              type="number" name="" id=""
              className="p-2 border border-mp-green border-opacity-40 rounded"
              onChange={(e) => setCashSorting({ ...cashSorting, md005: parseInt(e.currentTarget.value) })}
            />
          </div>
        </div>
        <p className="text-mp-dark text-sm mt-2">Conteo de bolsas o paquetes de monedas</p>
        <div className="grid grid-cols-2 gap-4 mt-2 mb-2 border border-mp-strong-gray rounded border-opacity-60 p-2">
          <div className="flex flex-col items-start justify-center">
            <label htmlFor="" className="text-xs text-mp-soft-dark">Bolsas de $10</label>
            <input
              type="number" name="" id=""
              className="p-2 border border-mp-green border-opacity-40 rounded"
              onChange={(e) => setCashSorting({ ...cashSorting, bls10: parseInt(e.currentTarget.value) })}
            />
          </div>
          <div className="flex flex-col items-start justify-center">
            <label htmlFor="" className="text-xs text-mp-soft-dark">Bolsas de $5</label>
            <input
              type="number" name="" id=""
              className="p-2 border border-mp-green border-opacity-40 rounded"
              onChange={(e) => setCashSorting({ ...cashSorting, bls5: parseInt(e.currentTarget.value) })}
            />
          </div>
          <div className="flex flex-col items-start justify-center">
            <label htmlFor="" className="text-xs text-mp-soft-dark">Bolsas de $2</label>
            <input
              type="number" name="" id=""
              className="p-2 border border-mp-green border-opacity-40 rounded"
              onChange={(e) => setCashSorting({ ...cashSorting, bls2: parseInt(e.currentTarget.value) })}
            />
          </div>
          <div className="flex flex-col items-start justify-center">
            <label htmlFor="" className="text-xs text-mp-soft-dark">Bolsas de $1</label>
            <input
              type="number" name="" id=""
              className="p-2 border border-mp-green border-opacity-40 rounded"
              onChange={(e) => setCashSorting({ ...cashSorting, bls1: parseInt(e.currentTarget.value) })}
            />
          </div>
        </div>
        <button
          className="w-32 p-2 bg-gradient-to-r from-mp-green to-mp-blue text-mp-white rounded mb-4 flex items-center justify-center"
          disabled={submitStatus.onLoading}
          type="button"
          onClick={handleSubmit}
        >
          {
            submitStatus.onLoading ? <LuLoaderCircle className="animate-spin" /> : submitStatus.onError ? <LuRefreshCcw /> : 'Continuar'
          }
        </button>
        {
          submitStatus.onError && <p className="text-mp-error text-sm">Error al guardar el conteo de efectivo, intenta de nuevo</p>
        }
        {
          unmatch && <p className="text-mp-error text-sm mb-2">El monto contado no coincide con el total, contado: {formatAmount(counted)}</p>
        }
      </form>
    </div>
  )
}
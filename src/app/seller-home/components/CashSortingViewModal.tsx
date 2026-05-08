'use client'

import { CashSorting } from "@/app/services/api/cashSorting"
import { getStoredCashSorting } from "@/utils/appStorage"
import { calculateTotalAmount, checkPlaceholderWord } from "@/utils/cashSortingUtils"
import { useEffect, useState } from "react"

interface Props {
  balance: number | undefined
}

export const CashSortingViewModal = ({ balance }: Props) => {
  const [cashSorting, setCashSorting] = useState<CashSorting>()
  const [adminAccess, setAdminAccess] = useState(false)
  const [total, setTotal] = useState(0)
  const [placeholderWord, setPlaceholderWord] = useState("")

  useEffect(() => {
    const cs = getStoredCashSorting()
    setCashSorting(cs)

    if (cs) {
      setTotal(calculateTotalAmount(cs))
    }
  }, [])

  const handleShowStoredCashSorting = () => {
    setAdminAccess(checkPlaceholderWord(placeholderWord))
  }

  return (
    <div className="w-full flex flex-col  items-center justify-center">
      <h2 className="text-lg font-bold text-mp-green mb-4">Detalles del conteo de caja</h2>
      <p className="text-mp-dark text-sm mt-2">Conteo de billetes</p>
      {
        adminAccess ?
          <>
            <div className="grid grid-cols-2 gap-4 mt-2 mb-2 border border-mp-strong-gray rounded border-opacity-60 p-2 w-2/3">
              <div className="flex flex-row items-center justify-start gap-2">
                <label htmlFor="" className="text-xs text-mp-soft-dark">Billetes de $1,000 = </label>
                <input
                  type="number" name="" id=""
                  className="w-10 bg-mp-transparent text-xs text-mp-blue"
                  readOnly
                  value={cashSorting?.bt1000}
                />
              </div>
              <div className="flex flex-row items-center justify-start gap-2">
                <label htmlFor="" className="text-xs text-mp-soft-dark">Billetes de $500 = </label>
                <input
                  type="number" name="" id=""
                  className="w-10 bg-mp-transparent text-xs text-mp-blue"
                  readOnly
                  value={cashSorting?.bt500}
                />
              </div>
              <div className="flex flex-row items-center justify-start gap-2">
                <label htmlFor="" className="text-xs text-mp-soft-dark">Billetes de $200 = </label>
                <input
                  type="number" name="" id=""
                  className="w-10 bg-mp-transparent text-xs text-mp-blue"
                  readOnly
                  value={cashSorting?.bt200}
                />
              </div>
              <div className="flex flex-row items-center justify-start gap-2">
                <label htmlFor="" className="text-xs text-mp-soft-dark">Billetes de $100 = </label>
                <input
                  type="number" name="" id=""
                  className="w-10 bg-mp-transparent text-xs text-mp-blue"
                  readOnly
                  value={cashSorting?.bt100}
                />
              </div>
              <div className="flex flex-row items-center justify-start gap-2">
                <label htmlFor="" className="text-xs text-mp-soft-dark">Billetes de $50 = </label>
                <input
                  type="number" name="" id=""
                  className="w-10 bg-mp-transparent text-xs text-mp-blue"
                  readOnly
                  value={cashSorting?.bt50}
                />
              </div>
              <div className="flex flex-row items-center justify-start gap-2">
                <label htmlFor="" className="text-xs text-mp-soft-dark">Billetes de $20 = </label>
                <input
                  type="number" name="" id=""
                  className="w-10 bg-mp-transparent text-xs text-mp-blue"
                  readOnly
                  value={cashSorting?.bt20}
                />
              </div>
            </div>
            <p className="text-mp-dark text-sm mt-2">Conteo de monedas</p>
            <div className="grid grid-cols-2 gap-4 mt-2 mb-2 border border-mp-strong-gray rounded border-opacity-60 p-2 w-2/3">
              <div className="flex flex-row items-center justify-start gap-2">
                <label htmlFor="" className="text-xs text-mp-soft-dark">Monedas de $20 = </label>
                <input
                  type="number" name="" id=""
                  className="w-10 bg-mp-transparent text-xs text-mp-blue"
                  readOnly
                  value={cashSorting?.md20}
                />
              </div>
              <div className="flex flex-row items-center justify-start gap-2">
                <label htmlFor="" className="text-xs text-mp-soft-dark">Monedas de $10 = </label>
                <input
                  type="number" name="" id=""
                  className="w-10 bg-mp-transparent text-xs text-mp-blue"
                  readOnly
                  value={cashSorting?.md10}
                />
              </div>
              <div className="flex flex-row items-center justify-start gap-2">
                <label htmlFor="" className="text-xs text-mp-soft-dark">Monedas de $5 = </label>
                <input
                  type="number" name="" id=""
                  className="w-10 bg-mp-transparent text-xs text-mp-blue"
                  readOnly
                  value={cashSorting?.md5}
                />
              </div>
              <div className="flex flex-row items-center justify-start gap-2">
                <label htmlFor="" className="text-xs text-mp-soft-dark">Monedas de $2 = </label>
                <input
                  type="number" name="" id=""
                  className="w-10 bg-mp-transparent text-xs text-mp-blue"
                  readOnly
                  value={cashSorting?.md2}
                />
              </div>
              <div className="flex flex-row items-center justify-start gap-2">
                <label htmlFor="" className="text-xs text-mp-soft-dark">Monedas de $1 = </label>
                <input
                  type="number" name="" id=""
                  className="w-10 bg-mp-transparent text-xs text-mp-blue"
                  readOnly
                  value={cashSorting?.md1}
                />
              </div>
              <div className="flex flex-row items-center justify-start gap-2">
                <label htmlFor="" className="text-xs text-mp-soft-dark">Monedas de $.50 = </label>
                <input
                  type="number" name="" id=""
                  className="w-10 bg-mp-transparent text-xs text-mp-blue"
                  readOnly
                  value={cashSorting?.md005}
                />
              </div>
            </div>
            <p className="text-mp-dark text-sm mt-2">Conteo de bolsas o paquetes de monedas</p>
            <div className="grid grid-cols-2 gap-4 mt-2 mb-2 border border-mp-strong-gray rounded border-opacity-60 p-2 w-2/3">
              <div className="flex flex-row items-center justify-start gap-2">
                <label htmlFor="" className="text-xs text-mp-soft-dark">Bolsas de $10 = </label>
                <input
                  type="number" name="" id=""
                  className="w-10 bg-mp-transparent text-xs text-mp-blue"
                  readOnly
                  value={cashSorting?.bls10}
                />
              </div>
              <div className="flex flex-row items-center justify-start gap-2">
                <label htmlFor="" className="text-xs text-mp-soft-dark">Bolsas de $5 = </label>
                <input
                  type="number" name="" id=""
                  className="w-10 bg-mp-transparent text-xs text-mp-blue"
                  readOnly
                  value={cashSorting?.bls5}
                />
              </div>
              <div className="flex flex-row items-center justify-start gap-2">
                <label htmlFor="" className="text-xs text-mp-soft-dark">Bolsas de $2 = </label>
                <input
                  type="number" name="" id=""
                  className="w-10 bg-mp-transparent text-xs text-mp-blue"
                  readOnly
                  value={cashSorting?.bls2}
                />
              </div>
              <div className="flex flex-row items-center justify-start gap-2">
                <label htmlFor="" className="text-xs text-mp-soft-dark">Bolsas de $1 = </label>
                <input
                  type="number" name="" id=""
                  className="w-10 bg-mp-transparent text-xs text-mp-blue"
                  readOnly
                  value={cashSorting?.bls1}
                />
              </div>
            </div>
            <div className="mt-2 mb-4">
              <p className="text-mp-dark text-sm mt-2">Total contado: <span className="font-bold text-mp-blue">${total}</span></p>
              <p className="text-mp-dark text-sm mt-1">Diferencia con saldo en caja: <span className={`font-bold ${total === balance ? "text-mp-green" : "text-mp-red"}`}>${balance !== undefined ? Math.abs(balance - total) : "N/A"}</span></p>
            </div>
          </> :
          <div className="w-full flex flex-col items-center justify-center mt-2 mb-4">
            <p className="text-mp-dark text-sm mt-2">Ingresa clave de acceso </p>
            <div className="flex flex-col items-center justify-center mt-2 mb-2">
              <div className="flex flex-row items-center justify-center gap-4">
                <input
                  type="password"
                  className="ml-2 p-2 rounded text-mp-green border border-mp-dark border-opacity-25"
                  onChange={(e) => setPlaceholderWord(e.currentTarget.value)}
                />
                <button
                  className="ml-2 p-2 bg-mp-green text-mp-white rounded text-xs hover:bg-mp-light-green"
                  onClick={handleShowStoredCashSorting}
                >
                  Acceder
                </button>
              </div>
            </div>
          </div>
      }
    </div>
  )
}
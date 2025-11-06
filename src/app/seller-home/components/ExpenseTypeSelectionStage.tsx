'use client'

import { useExpenseRegistryStore } from "@/app/store/useExpenseRegistryStore"
import { ExpenseStages } from "@/utils/variables"
import { LuHandCoins, LuHandshake, LuTicket, LuWallet } from "react-icons/lu"

export const ExpenseTypeSelectionStage = () => {
  const { setStage } = useExpenseRegistryStore()

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <p className="text-md text-mp-dark p-2">Selecciona el tipo de gasto</p>
      <div className="mb-2 h-1 w-11/12 rounded shadow bg-gradient-to-r from-mp-green to-mp-blue">
      </div>
      <div className="w-full flex flex-col items-center justify-center mt-2 mb-6 gap-4">
        <button
          className="flex flex-row items-center p-2 justify-center gap-2 rounded shadow-md 
                      shadow-mp-strong-gray border border-mp-blue border-opacity-5 transition-all 
                      hover:bg-mp-gray-soft w-1/2 text-mp-dark"
          onClick={() => setStage(ExpenseStages.PROVIDER_SELECTION)}
        >
          <LuHandCoins />
          Proveedores
        </button>
        <button
          className="flex flex-row items-center p-2 justify-center gap-2 rounded shadow-md 
                      shadow-mp-strong-gray border border-mp-blue border-opacity-5 transition-all 
                      hover:bg-mp-gray-soft w-1/2 text-mp-dark"
        >
          <LuHandshake />
          Servicios
        </button>
        <button
          className="flex flex-row items-center p-2 justify-center gap-2 rounded shadow-md 
                      shadow-mp-strong-gray border border-mp-blue border-opacity-5 transition-all 
                      hover:bg-mp-gray-soft w-1/2 text-mp-dark"
        >
          <LuWallet />
          Sueldos
        </button>
        <button
          className="flex flex-row items-center p-2 justify-center gap-2 rounded shadow-md 
                      shadow-mp-strong-gray border border-mp-blue border-opacity-5 transition-all 
                      hover:bg-mp-gray-soft w-1/2 text-mp-dark"
        >
          <LuTicket />
          Otros
        </button>
      </div>
    </div>
  )
}
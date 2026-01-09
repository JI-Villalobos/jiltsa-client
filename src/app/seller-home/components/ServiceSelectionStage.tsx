'use client'

import { CreateExpenseRegistry } from "@/app/services/api/expenses"
import { useExpenseRegistryStore } from "@/app/store/useExpenseRegistryStore"
import { ExpenseStages } from "@/utils/variables"
import { LuArrowLeftFromLine, LuDroplets, LuHouse, LuLightbulb } from "react-icons/lu"

export const ServiceSelectionStage = () => {
  const { expense, setExpense, setStage } = useExpenseRegistryStore()

  const handleStage = (service: string) => {
    const updatedExpense: CreateExpenseRegistry = { ...expense, description: service }
    setExpense(updatedExpense)
    setStage(ExpenseStages.FINALIZE_EXPENSE_REGISTRY)
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <p className="text-mp-dark">Seleccina el servicio</p>
      <div className="grid grid-cols-3 gap-2 p-4 mb-6 mt-4">
        <button
          className="p-4 flex flex-row items-center text-mp-dark justify-center gap-2 rounded shadow-md hover:bg-gradient-to-r from-mp-green to-mp-blue hover:text-mp-white"
          onClick={() => handleStage("LUZ ELECTRICA")}
        >
          <LuLightbulb className="text-mp-blue" />
          Luz Elec.
        </button>
        <button
          className="p-4 flex flex-row items-center text-mp-dark justify-center gap-2 rounded shadow-md hover:bg-gradient-to-r from-mp-green to-mp-blue hover:text-mp-white"
          onClick={() => handleStage("AGUA")}
        >
          <LuDroplets className="text-mp-blue" />
          Agua
        </button>
        <button
          className="p-4 flex flex-row items-center text-mp-dark justify-center gap-2 rounded shadow-md hover:bg-gradient-to-r from-mp-green to-mp-blue hover:text-mp-white"
          onClick={() => handleStage("RENTA")}
        >
          <LuHouse className="text-mp-blue" />
          Renta
        </button>
      </div>
      <div className="w-full mb-4 flex items-center justify-center">
        <button
          className="flex flex-row items-center justify-center p-2 rounded shadow hover:text-mp-green text-mp-dark"
          onClick={() => setStage(ExpenseStages.SELECT_EXPENSE_TYPE)}
        >
          <LuArrowLeftFromLine className="mr-2" />
          Regresar
        </button>
      </div>
    </div>
  )
}
'use client'

import { useExpenseRegistryStore } from "@/app/store/useExpenseRegistryStore"
import { ExpenseStages } from "@/utils/variables"
import { LuArrowLeftFromLine, LuCandy, LuCookie, LuFlaskRound, LuPopcorn, LuSalad } from "react-icons/lu"

export const ProviderSelectionstage = () => {
  const { setStage } = useExpenseRegistryStore()

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <p className="text-mp-dark">Selecciona el proveedor</p>
      <div className="grid grid-cols-3 gap-2 p-4 mb-6 mt-4">
        <button
          className="p-4 flex flex-row items-center text-mp-dark justify-center gap-2 rounded shadow-md hover:bg-gradient-to-r from-mp-green to-mp-blue hover:text-mp-white"
          onClick={() => setStage(ExpenseStages.FINALIZE_EXPENSE_REGISTRY)}
        >
          <LuPopcorn className="text-mp-blue" />
          Sabritas
        </button>
        <button
          className="p-4 flex flex-row items-center text-mp-dark justify-center gap-2 rounded shadow-md hover:bg-gradient-to-r from-mp-green to-mp-blue hover:text-mp-white"
          onClick={() => setStage(ExpenseStages.FINALIZE_EXPENSE_REGISTRY)}
        >
          <LuCandy className="text-mp-blue" />
          Ricolino
        </button>
        <button
          className="p-4 flex flex-row items-center text-mp-dark justify-center gap-2 rounded shadow-md hover:bg-gradient-to-r from-mp-green to-mp-blue hover:text-mp-white"
          onClick={() => setStage(ExpenseStages.FINALIZE_EXPENSE_REGISTRY)}
        >
          <LuSalad className="text-mp-blue" />
          B. Leo
        </button>
        <button
          className="p-4 flex flex-row items-center text-mp-dark justify-center gap-2 rounded shadow-md hover:bg-gradient-to-r from-mp-green to-mp-blue hover:text-mp-white"
          onClick={() => setStage(ExpenseStages.FINALIZE_EXPENSE_REGISTRY)}
        >
          <LuCookie className="text-mp-blue" />
          Gamesa
        </button>
        <button
          className="p-4 flex flex-row items-center text-mp-dark justify-center gap-2 rounded shadow-md hover:bg-gradient-to-r from-mp-green to-mp-blue hover:text-mp-white"
          onClick={() => setStage(ExpenseStages.FINALIZE_EXPENSE_REGISTRY)}
        >
          <LuFlaskRound className="text-mp-blue" />
          Pharmaceutix
        </button>
        <button
          className="p-4 flex flex-row items-center text-mp-dark justify-center gap-2 rounded shadow-md hover:bg-gradient-to-r from-mp-green to-mp-blue hover:text-mp-white"
          onClick={() => setStage(ExpenseStages.FINALIZE_EXPENSE_REGISTRY)}
        >
          <LuPopcorn className="text-mp-blue" />
          Barcel
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
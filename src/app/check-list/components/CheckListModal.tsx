'use client'

import { LuSmartphone } from "react-icons/lu"

export const CheckListModal = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center w-full">
        <p className="text-mp-blue">Condiciones del celular</p>
        <div>
          <label htmlFor="" className="flex flex-row items-center justify-center gap-2 text-mp-soft-dark text-sm">Carga del celular(%)<LuSmartphone className="text-mp-green" /></label>
          <input type="number" name="" id="" className="p-2 w-32 shadow mt-2 mb-2 rounded text-mp-dark" />
        </div>
        <div className="flex flex-row items-center justify-center gap-2">
          <label htmlFor="" className="flex flex-row items-center justify-center gap-2 text-mp-soft-dark text-sm">Condiciones</label>
          <input type="checkbox" name="" id="" className="" />
        </div>
        <div className="flex flex-col items-center justify-center gap-2 mt-4 w-full">
          <label htmlFor="" className="flex flex-row items-center justify-center gap-2 text-mp-soft-dark text-sm">Observaciones</label>
          <input type="text" name="" id="" className="p-2 w-10/12 shadow mt-1 mb-2 rounded text-mp-dark h-28" />
        </div>
      </div>
      <div className="w-10/12 h-1 rounded bg-mp-strong-gray mt-2 mb-2"></div>
      <div className="flex flex-col items-center justify-center w-full border-opacity-30">
        <p className="text-mp-blue">Condiciones del mobiliario y equipo</p>
        <div className="flex flex-row justify-end text-xs text-mp-soft-dark">
          <>
            <label htmlFor="" className="m-2">BIEN</label>
            <input type="radio" name="furnitureCleanConditions" id="furnitureCleanConditions" className="mr-8" value={1} />
          </>
          <>
            <label htmlFor="" className="m-2">REGULAR</label>
            <input type="radio" name="furnitureCleanConditions" id="furnitureCleanConditions" className="mr-8" value={2} />
          </>
          <>
            <label htmlFor="" className="m-2">MAL</label>
            <input type="radio" name="furnitureCleanConditions" id="furnitureCleanConditions" className="mr-8" value={3} defaultChecked />
          </>
        </div>
        <div className="flex flex-row items-center justify-center gap-2">
          <label htmlFor="" className="flex flex-row items-center justify-center gap-2 text-mp-soft-dark text-sm">Revisado</label>
          <input type="checkbox" name="" id="" className="" />
        </div>
        <div className="flex flex-col items-center justify-center gap-2 mt-4 w-full">
          <label htmlFor="" className="flex flex-row items-center justify-center gap-2 text-mp-soft-dark text-sm">Observaciones</label>
          <input type="text" name="" id="" className="p-2 w-10/12 shadow mt-1 mb-2 rounded text-mp-dark h-28" />
        </div>
      </div>
      <button
        className="p-2 text-mp-white bg-mp-blue rounded mb-2 mt-2"
      >
        Continuar
      </button>
      <div>

      </div>
    </div>
  )
}
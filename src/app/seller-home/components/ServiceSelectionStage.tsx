'use client'

import { LuDroplets, LuHouse, LuLightbulb } from "react-icons/lu"

export const ServiceSelectionStage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <p className="text-mp-dark">Seleccina el servicio</p>
      <div className="grid grid-cols-3 gap-2 p-4 mb-6 mt-4">
        <button
          className="p-4 flex flex-row items-center text-mp-dark justify-center gap-2 rounded shadow-md hover:bg-gradient-to-r from-mp-green to-mp-blue hover:text-mp-white"
        >
          <LuLightbulb className="text-mp-blue" />
          Luz Elec.
        </button>
        <button
          className="p-4 flex flex-row items-center text-mp-dark justify-center gap-2 rounded shadow-md hover:bg-gradient-to-r from-mp-green to-mp-blue hover:text-mp-white"
        >
          <LuDroplets className="text-mp-blue" />
          Agua
        </button>
        <button
          className="p-4 flex flex-row items-center text-mp-dark justify-center gap-2 rounded shadow-md hover:bg-gradient-to-r from-mp-green to-mp-blue hover:text-mp-white"
        >
          <LuHouse className="text-mp-blue" />
          Renta
        </button>
      </div>
    </div>
  )
}
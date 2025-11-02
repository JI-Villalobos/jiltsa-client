'use client'

import { LuCandy, LuCookie, LuFlaskRound, LuPopcorn, LuSalad } from "react-icons/lu"

export const ProviderSelectionstage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <p className="text-mp-dark">Selecciona el proveedor</p>
      <div className="grid grid-cols-3 gap-2 p-4 mb-6 mt-4">
        <button
          className="p-4 flex flex-row items-center text-mp-dark justify-center gap-2 rounded shadow-md hover:bg-gradient-to-r from-mp-green to-mp-blue hover:text-mp-white"
        >
          <LuPopcorn className="text-mp-blue" />
          Sabritas
        </button>
        <button
          className="p-4 flex flex-row items-center text-mp-dark justify-center gap-2 rounded shadow-md hover:bg-gradient-to-r from-mp-green to-mp-blue hover:text-mp-white"
        >
          <LuCandy className="text-mp-blue" />
          Ricolino
        </button>
        <button
          className="p-4 flex flex-row items-center text-mp-dark justify-center gap-2 rounded shadow-md hover:bg-gradient-to-r from-mp-green to-mp-blue hover:text-mp-white"
        >
          <LuSalad className="text-mp-blue" />
          B. Leo
        </button>
        <button
          className="p-4 flex flex-row items-center text-mp-dark justify-center gap-2 rounded shadow-md hover:bg-gradient-to-r from-mp-green to-mp-blue hover:text-mp-white"
        >
          <LuCookie className="text-mp-blue" />
          Gamesa
        </button>
        <button
          className="p-4 flex flex-row items-center text-mp-dark justify-center gap-2 rounded shadow-md hover:bg-gradient-to-r from-mp-green to-mp-blue hover:text-mp-white"
        >
          <LuFlaskRound className="text-mp-blue" />
          Pharmaceutix
        </button>
        <button
          className="p-4 flex flex-row items-center text-mp-dark justify-center gap-2 rounded shadow-md hover:bg-gradient-to-r from-mp-green to-mp-blue hover:text-mp-white"
        >
          <LuPopcorn className="text-mp-blue" />
          Barcel
        </button>
      </div>
    </div>
  )
}
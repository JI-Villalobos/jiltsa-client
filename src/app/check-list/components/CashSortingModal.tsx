'use client'

interface Props {
  mode: 'CHECK_IN' | 'CHECK_OUT'
}

export const CashSortingModal = ({ mode }: Props) => {


  return (
    <div>
      <form action="" className="flex flex-col items-center justify-center">
        <p className="text-mp-green">Ordena y cuenta el efectivo disponible</p>
        <p className="text-mp-dark text-sm mt-2">Conteo de billetes</p>
        <div className="grid grid-cols-2 gap-4 mt-2 mb-2 border border-mp-strong-gray rounded border-opacity-60 p-2">
          <div className="flex flex-col items-start justify-center">
            <label htmlFor="" className="text-xs text-mp-soft-dark">Billetes de $1,000</label>
            <input type="number" name="" id="" className="p-2 border border-mp-green border-opacity-40 rounded" />
          </div>
          <div className="flex flex-col items-start justify-center">
            <label htmlFor="" className="text-xs text-mp-soft-dark">Billetes de $500</label>
            <input type="number" name="" id="" className="p-2 border border-mp-green border-opacity-40 rounded" />
          </div>
          <div className="flex flex-col items-start justify-center">
            <label htmlFor="" className="text-xs text-mp-soft-dark">Billetes de $200</label>
            <input type="number" name="" id="" className="p-2 border border-mp-green border-opacity-40 rounded" />
          </div>
          <div className="flex flex-col items-start justify-center">
            <label htmlFor="" className="text-xs text-mp-soft-dark">Billetes de $100</label>
            <input type="number" name="" id="" className="p-2 border border-mp-green border-opacity-40 rounded" />
          </div>
          <div className="flex flex-col items-start justify-center">
            <label htmlFor="" className="text-xs text-mp-soft-dark">Billetes de $50</label>
            <input type="number" name="" id="" className="p-2 border border-mp-green border-opacity-40 rounded" />
          </div>
          <div className="flex flex-col items-start justify-center">
            <label htmlFor="" className="text-xs text-mp-soft-dark">Billetes de $20</label>
            <input type="number" name="" id="" className="p-2 border border-mp-green border-opacity-40 rounded" />
          </div>
        </div>
        <p className="text-mp-dark text-sm mt-2">Conteo de monedas</p>
        <div className="grid grid-cols-2 gap-4 mt-2 mb-2 border border-mp-strong-gray rounded border-opacity-60 p-2">
          <div className="flex flex-col items-start justify-center">
            <label htmlFor="" className="text-xs text-mp-soft-dark">Monedas de $20</label>
            <input type="number" name="" id="" className="p-2 border border-mp-green border-opacity-40 rounded" />
          </div>
          <div className="flex flex-col items-start justify-center">
            <label htmlFor="" className="text-xs text-mp-soft-dark">Monedas de $10</label>
            <input type="number" name="" id="" className="p-2 border border-mp-green border-opacity-40 rounded" />
          </div>
          <div className="flex flex-col items-start justify-center">
            <label htmlFor="" className="text-xs text-mp-soft-dark">Monedas de $5</label>
            <input type="number" name="" id="" className="p-2 border border-mp-green border-opacity-40 rounded" />
          </div>
          <div className="flex flex-col items-start justify-center">
            <label htmlFor="" className="text-xs text-mp-soft-dark">Monedas de $2</label>
            <input type="number" name="" id="" className="p-2 border border-mp-green border-opacity-40 rounded" />
          </div>
          <div className="flex flex-col items-start justify-center">
            <label htmlFor="" className="text-xs text-mp-soft-dark">Monedas de $1</label>
            <input type="number" name="" id="" className="p-2 border border-mp-green border-opacity-40 rounded" />
          </div>
          <div className="flex flex-col items-start justify-center">
            <label htmlFor="" className="text-xs text-mp-soft-dark">Monedas de $.50</label>
            <input type="number" name="" id="" className="p-2 border border-mp-green border-opacity-40 rounded" />
          </div>
        </div>
        <p className="text-mp-dark text-sm mt-2">Conteo de bolsas o paquetes de monedas</p>
        <div className="grid grid-cols-2 gap-4 mt-2 mb-2 border border-mp-strong-gray rounded border-opacity-60 p-2">
          <div className="flex flex-col items-start justify-center">
            <label htmlFor="" className="text-xs text-mp-soft-dark">Bolsas de $10</label>
            <input type="number" name="" id="" className="p-2 border border-mp-green border-opacity-40 rounded" />
          </div>
          <div className="flex flex-col items-start justify-center">
            <label htmlFor="" className="text-xs text-mp-soft-dark">Bolsas de $5</label>
            <input type="number" name="" id="" className="p-2 border border-mp-green border-opacity-40 rounded" />
          </div>
          <div className="flex flex-col items-start justify-center">
            <label htmlFor="" className="text-xs text-mp-soft-dark">Bolsas de $2</label>
            <input type="number" name="" id="" className="p-2 border border-mp-green border-opacity-40 rounded" />
          </div>
          <div className="flex flex-col items-start justify-center">
            <label htmlFor="" className="text-xs text-mp-soft-dark">Bolsas de $1</label>
            <input type="number" name="" id="" className="p-2 border border-mp-green border-opacity-40 rounded" />
          </div>
        </div>
        <button
          className="w-32 p-2 bg-gradient-to-r from-mp-green to-mp-blue text-mp-white rounded mb-4"
        >
          Revisar
        </button>
      </form>
    </div>
  )
}
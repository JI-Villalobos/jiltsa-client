export default function CheckListForm() : JSX.Element {
    return (
        <div>
            <p>Check List cambio de turno</p>
            <form action="" className="">
                <div>
                    <p>Turno: <span></span></p>
                    <p>Fecha: <span>23-04-28</span></p>
                </div>
                <select name="" id="">
                    <option value="">ENTRADA</option>
                    <option value="">SALIDA</option>
                </select>
                <div>

                    <label htmlFor="number" className="text-xs text-center text-mp-dark">Carga Celular %</label>
                    <div className="relative">
                        <input
                            type="number"
                            className="w-full rounded-lg border-mp-soft-dark bg-mp-gray-soft text-mp-soft-dark p-4 pe-12 text-sm shadow-sm"
                            placeholder="Carga"
                        />
                    </div>
                    <label htmlFor="number" className="text-xs text-center text-mp-dark">Estado del Celular</label>
                    <div className="relative">
                    <label htmlFor="number" className="text-xs text-center text-mp-dark">Condiciones</label>
                        <input type="checkbox" name="" id="" />
                        <label htmlFor="number" className="text-xs text-center text-mp-dark">Observaciones</label>
                        <input
                            type="text"
                            className="w-full rounded-lg border-mp-soft-dark bg-mp-gray-soft text-mp-soft-dark p-4 pe-12 text-sm shadow-sm"
                            placeholder="Observaciones"
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}
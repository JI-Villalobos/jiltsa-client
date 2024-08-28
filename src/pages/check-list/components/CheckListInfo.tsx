import { BiError, BiBattery } from "react-icons/bi"

export const CheckListInfo = (): JSX.Element => {
    return (
        <form action="">
            <div className="w-full m-8 flex flex-col items-center">
                <div className="flex flex-col items-center justify-center w-1/3 text-base font-normal border border-mp-dark rounded border-opacity-20 m-4 p-2">
                    <BiError color="orange" size={30} />
                    <p className="text-mp-dark text-center">Recuerda tomar captura de pantalla y compartirla en el grupo</p>
                </div>
                <p className="text-2xl text-mp-soft-dark font-semibold">CHECK LIST CAMBIO DE TURNO</p>
                <div className="flex flex-row w-3/6 p-2 shadow-sm bg-mp-strong-gray rounded items-center justify-between">
                    <select name="" id="" className="font-medium text-mp-dark w-1/3 rounded focus:border-none bg-none">
                        <option value="">ENTRADA</option>
                        <option value="">SALIDA</option>
                    </select>
                    <p className="w-1/6 text-mp-green font-medium">27-08-2024</p>
                    <p className="text-mp-dark">TURNO: DIANA</p>
                </div>
                <div className="rounded-sm shadow-sm w-3/6 flex flex-row justify-between m-2">
                    <div className="flex flex-row w-1/3 items-center justify-between">
                        <p className="text-mp-dark">DINERO EN CAJA (ABAJO)</p>
                        <input
                            type="number"
                            className="rounded-lg border border-mp-dark border-opacity-40 text-mp-green font-semibold p-2 text-sm w-2/6"
                            placeholder="Saldo"
                        />
                    </div>
                    <div className="flex flex-row w-1/3 items-center justify-between">
                        <p className="text-mp-dark">SALDO EN PRONTIPAGOS</p>
                        <input
                            type="number"
                            className="rounded-lg border border-mp-dark border-opacity-40 text-mp-green font-semibold p-2 text-sm w-2/6"
                            placeholder="Saldo"
                        />
                    </div>
                </div>
                <div className="flex flex-row w-3/6 p-2 shadow-sm bg-mp-strong-gray rounded items-center justify-start mt-4">
                    <p className="w-4/6 font-medium text-mp-dark">CONDICIONES DE CELULAR</p>
                </div>
                <div className="rounded-sm shadow-sm w-3/6 flex flex-row justify-between m-2">
                    <div className="flex flex-row w-1/3 items-center justify-between text-mp-green">
                        <p className="text-mp-dark">CARGA CELULAR % </p>
                        <BiBattery />
                        <input
                            type="number"
                            className="rounded-lg border border-mp-dark border-opacity-40 text-mp-green font-semibold p-2 text-sm w-1/6"
                            placeholder="%"
                        />
                    </div>
                    <div className="flex flex-row w-1/3 items-center justify-between">
                        <p className="text-mp-dark"></p>
                        <p className="text-mp-green font-semibold"></p>
                    </div>
                </div>
                <div className="rounded-sm shadow-sm w-3/6 flex flex-row justify-between m-2">
                    <div className="flex flex-row w-1/3 items-center justify-between">
                        <p className="text-mp-dark">ESTADO OK?</p>
                        <input
                            type="checkbox"
                            className="rounded-lg border border-mp-dark border-opacity-40 text-mp-green font-semibold p-2 text-sm w-1/6"
                            placeholder="%"
                        />
                    </div>
                    <div className="flex flex-row w-2/3 items-center justify-center">
                        <p className="text-mp-dark w-1/3 ml-8 border-r-2">OBSERVACIONES</p>
                        <input
                            type="text"
                            className="rounded-lg border border-mp-dark border-opacity-10 text-mp-green ml-2 font-semibold p-2 text-sm w-full"
                            placeholder=""
                        />
                    </div>
                </div>
                <div className="flex flex-row w-3/6 p-2 shadow-sm bg-mp-strong-gray rounded items-center justify-start mt-4">
                    <p className="w-4/6 font-medium text-mp-dark">CONDICIONES DEl MOBILIARIO Y EQUIPO</p>
                </div>
                <div className="flex flex-row w-1/2 items-center justify-between shadow-sm">
                    <p className="text-mp-dark mr-7">LIMPIEZA (ESTANTES, VITRINAS Y PISO)</p>
                    <div className="flex flex-row justify-end">
                        <>
                            <label htmlFor="" className="m-2">BIEN</label>
                            <input type="radio" name="state" id="" className="mr-8" />
                        </>
                        <>
                            <label htmlFor="" className="m-2">REGULAR</label>
                            <input type="radio" name="state" id="" className="mr-8" />
                        </>
                        <>
                            <label htmlFor="" className="m-2">MAL</label>
                            <input type="radio" name="state" id="" className="mr-8" />
                        </>
                    </div>
                </div>
                <div className="rounded-sm shadow-sm w-3/6 flex flex-row justify-between m-2">
                    <div className="flex flex-row w-1/3 items-center justify-between">
                        <p className="text-mp-dark">ESTADO OK?</p>
                        <input
                            type="checkbox"
                            className="rounded-lg border border-mp-dark border-opacity-40 text-mp-green font-semibold p-2 text-sm w-1/6"
                            placeholder="%"
                        />
                    </div>
                    <div className="flex flex-row w-2/3 items-center justify-center">
                        <p className="text-mp-dark w-1/3 ml-8 border-r-2">OBSERVACIONES</p>
                        <input
                            type="text"
                            className="rounded-lg border border-mp-dark border-opacity-10 text-mp-green ml-2 font-semibold p-2 text-sm w-full"
                            placeholder=""
                        />
                    </div>
                </div>
                <div className="w-3/6 flex justify-center m-6">
                    <button className="rounded bg-mp-dark text-mp-white p-2 hover:bg-mp-soft-dark">Terminar</button>
                </div>
            </div>
        </form>
    )
}
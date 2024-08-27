import { BiError } from "react-icons/bi";


export default function CheckList(): JSX.Element {
    return (
        <div className="w-full m-8 flex flex-col items-center">
            <div className="flex flex-col items-center justify-center w-1/3 text-base font-normal border border-mp-dark rounded border-opacity-20 m-4 p-2">
                <BiError color="orange" size={30}/>
                <p className="text-mp-dark text-center">Recuerda tomar captura de pantalla y compartirla en el grupo</p>
            </div>
            <p className="text-2xl text-mp-soft-dark font-semibold">CHECK LIST CAMBIO DE TURNO</p>
            <div className="flex flex-row w-3/6 p-2 shadow-sm bg-mp-strong-gray rounded items-center justify-center">
                <p className="w-4/6 font-medium text-mp-dark">ENTRADA</p>
                <p className="w-1/6 text-mp-green font-medium">27-08-2024</p>
                <p className="text-mp-dark">TURNO: DIANA</p>
            </div>
        </div>
    )
}
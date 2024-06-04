import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { STAGES } from "./Expenses";
import Link from "next/link";

interface Props {
    setStage: Dispatch<SetStateAction<number>>
}

export default function SuccessExpenseRegistry({ setStage }: Props): JSX.Element {

    const nextStage = (): void => {
        setTimeout(() => {
          setStage(STAGES.NEW)
        }, 1000)
        setStage(STAGES.LOADING)
    }

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-center text-2xl font-bold text-mp-blue sm:text-3xl">Registro Exitoso!</h1>
            <button className="bg-none text-mp-green underline text-center m-1" onClick={nextStage}>Registrar nuevo gasto</button>
            <Link className="text-mp-blue underline" href="/seller-home">Regresar</Link>
        </div>
    )
}
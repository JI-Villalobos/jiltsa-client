import { STAGES } from "@/app/components/Expenses"
import { clearIncomesregistered } from "@/utils/appStorage"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction } from "react"

interface Props {
    setStage: Dispatch<SetStateAction<number>>
}

export default function ConfirmSummary({ setStage }: Props): JSX.Element {
    const router = useRouter()

    return (
        <div className="flex flex-col mt-20 border border-mp-gray-soft shadow-md rounded p-8">
            <p className="text-center text-mp-dark m-2">
                Asegúrate de tomar captura de pantalla y compartirla en el grupo.
            </p>
            <div className="flex flex-row items-center justify-center">
                <button
                    className="border border-mp-blue p-2 rounded text-mp-blue 
                                font-bold m-4 hover:bg-mp-gray-soft"
                    onClick={() => setStage(STAGES.SUCCESS)}
                >
                    Regresar y tomar captura
                </button>
                <button
                    className="bg-mp-dark text-mp-white p-2 rounded m-4 
                                hover:bg-mp-soft-dark"
                    onClick={() => {
                        clearIncomesregistered()
                        router.push("/check-list")
                    }}
                >
                    Ya lo hice, quiero cerrar turno
                </button>
            </div>
        </div>
    )
}
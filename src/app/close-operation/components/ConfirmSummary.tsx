'use client'

import { clearIncomesregistered } from "@/utils/appStorage"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction } from "react"

interface Props {
    //this prop will be removed at the end of the migration
    setStage?: Dispatch<SetStateAction<number>>
    //this prop wont be optional at the end of the migration
    setShowModal?: Dispatch<SetStateAction<boolean>>
}

export default function ConfirmSummary({ setStage, setShowModal }: Props): JSX.Element {
    const router = useRouter()


    //this handler wont be neccesary when setShowModal is not optional
    const handleShowModal = () => {
        if (setShowModal) {
            setShowModal(false)
        }
    }

    return (
        <div className="flex flex-col p-8">
            <p className="text-center text-mp-dark m-2">
                Asegúrate de tomar captura de pantalla y compartirla en el grupo.
            </p>
            <div className="flex flex-row items-center justify-center">
                <button
                    className="border border-mp-blue p-2 rounded text-mp-blue 
                                font-bold m-4 hover:bg-mp-gray-soft"
                    onClick={handleShowModal}
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
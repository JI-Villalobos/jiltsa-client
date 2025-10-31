'use client'

import { useState } from "react"
import Modal from "./shared/Modal"

export default function NotRegisteredSessionInfo(): JSX.Element{
    const [showModal, setShowModal] = useState(false)

    return(
        <div className="rounded border-s-4 shadow-lg border-mp-error bg-mp-white p-4 w-3/4 m-6">
            <strong className="block font-medium text-mp-strong-red"> Turno No Registrado </strong>
            <div className="flex flex-col items-center">
                <p className="mt-2 text-sm text-mp-strong-red">
                    Aún no se ha registrado un nuevo turno, para registrar gastos, ventas y demás acciones
                    es necesario tener un turno registrado abierto. 
                </p>
                <button
                    className="transition delay-150 duration-300 ease-in-out  
                                hover:-translate-y-1 hover:scale-110 mt-2 text-mp-white 
                                text-center bg-gradient-to-r from-mp-green to-mp-blue  
                                p-2 rounded w-1/4"
                    onClick={() => setShowModal(true)}
                >
                    Abrir turno
                </button>
            </div>
            {
                showModal &&
                <Modal onClose={() => setShowModal(false)}>
                    <p></p>
                </Modal>
            }
        </div>
    )
}

/**
 * TODO: the route handled by this link could be deprecated
 * <Link 
                    href='/operation' 
                    className="transition delay-150 duration-300 ease-in-out  
                                hover:-translate-y-1 hover:scale-110 mt-2 text-mp-white 
                                text-center bg-gradient-to-r from-mp-green to-mp-blue  
                                p-2 rounded w-1/4"
                >
                    Abrir turno
                </Link>
 */
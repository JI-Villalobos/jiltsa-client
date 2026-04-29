'use client'

import { useState } from "react"
import { CheckListInfo } from "./components/CheckListInfo"
import Modal from "../components/shared/Modal"
import { CheckListModal } from "./components/CheckListModal"


export default function CheckList() {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="w-full h-72 flex flex-col items-center justify-center">
            <p className="text-mp-soft-dark">Selecciona la opción de check-list</p>
            <button
                className="bg-mp-dark text-mp-white w-32 text-sm p-2 rounded mb-2 mt-2 hover:bg-mp-soft-dark"
                onClick={() => setShowModal(true)}
            >
                Entrada
            </button>
            <button
                className="bg-mp-green text-mp-white w-32 text-sm p-2 rounded mb-2 mt-2 hover:bg-mp-light-green"
                onClick={() => setShowModal(true)}
            >
                Salida
            </button>
            {
                showModal &&
                <Modal onClose={() => setShowModal(false)}>
                    <CheckListModal />
                </Modal>
            }
        </div>
    )
}
'use client'

import { useState } from "react";
import { LuFolderClosed } from "react-icons/lu";
import Modal from "./Modal";
import { IncomeRegistryModal } from "@/app/seller-home/components/IncomeRegistryModal";

export default function CloseOperationButton() {
    const [showCloseOperationModal, setshowCloseOperationModal] = useState(false)

    return (
        <>
            <button 
                className="bg-mp-blue flex flex-row p-2 items-center justify-center rounded text-mp-gray-soft text-sm"
                onClick={() => setshowCloseOperationModal(true)}
            >
                <LuFolderClosed />
                <span className="ml-1"></span>
                Cerrar Turno
            </button>
            {
                showCloseOperationModal &&
                <Modal 
                    onClose={() => setshowCloseOperationModal(false)}
                    title="Registro de ventas"
                >
                    <IncomeRegistryModal showModal={setshowCloseOperationModal}/>
                </Modal>
            }
        </>
    )
}
'use client'

import Link from "next/link";
import { LuFolderClosed } from "react-icons/lu";

export default function CloseOperationButton() {
    return (
        <Link href="/close-operation" className="bg-mp-blue flex flex-row p-2 items-center justify-center rounded text-mp-gray-soft text-sm">
            <LuFolderClosed />
            <span className="ml-1"></span>
            Cerrar Turno
        </Link>
    )
}
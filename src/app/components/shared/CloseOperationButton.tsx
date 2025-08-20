'use client'

import Image from "next/image";
import Link from "next/link";

export default function CloseOperationButton() {
    return (
        <Link href="/close-operation" className="bg-mp-blue flex flex-row p-2 rounded text-mp-gray-soft">
            <Image src="/casher.svg" alt="cashier icon" width={20} height={20} />
            <span className="ml-1"></span>
            Cerrar Turno
        </Link>
    )
}
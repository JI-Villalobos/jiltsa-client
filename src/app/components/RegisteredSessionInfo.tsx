'use client'

import { deleteAccounting } from "@/utils/appStorage"
import { useRouter } from "next/navigation"
import { LuFolderOpen, LuUserCheck } from "react-icons/lu"
import TotalBalanceItem from "./TotalBalanceItem"

interface Props {
    accountingId: number
    seller: string
}

export default function RegisteredSessionInfo({ accountingId, seller }: Props): JSX.Element {
    const router = useRouter()
    
    return(
        <div className="rounded border-s-4 border-mp-green bg-mp-white shadow-md p-4 m-6 flex flex-col items-center">
            <strong className="block font-medium text-mp-green text-sm"> Información del turno actual </strong>
            <div className="flex flex-row mt-2 items-center gap-1 ">
                <LuFolderOpen className="text-mp-green"/>
                <p className='text-mp-dark font-coda text-sm mr-4'>
                Corte: <span className='text-mp-blue'>{accountingId } </span>
                </p>
                <LuUserCheck className="text-mp-green"/>
                <p className='text-mp-dark font-coda text-sm'>Vendedora: <span className='text-mp-blue'>{seller}</span></p>
                <TotalBalanceItem />
            </div>
            <button 
                className="mt-2 text-sm text-mp-green hover:text-mp-blue"
                onClick={() => {
                    deleteAccounting()
                    router.refresh()
                }}
            >¿Este no es tu turno?</button>
        </ div>
    )
}
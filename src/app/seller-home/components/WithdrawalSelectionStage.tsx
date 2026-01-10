'use client'

import { useWithdrawalRegistryStore } from "@/app/store/useWithdrawalRegistryStore"
import { conceptList, WithdrawalStages } from "@/utils/variables"

export const WithdrawalSelectionStage = () => {
    const { setStage, setWithdrawal, withdrawal } = useWithdrawalRegistryStore()

    const handleUpdateWithdrawal = (concept: string) => {
        setWithdrawal({ ...withdrawal, concept: concept })
        setStage(WithdrawalStages.FINALIZE_WITHDRAWAL_STAGE)
    }

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <p className="text-md text-mp-dark p-2">Selecciona el concepto del retiro</p>
            <div className="mb-2 h-1 w-11/12 rounded shadow bg-gradient-to-r from-mp-green to-mp-blue">
            </div>
            <div className="w-full items-center justify-center grid grid-cols-3 gap-2 mt-2 mb-6">
                {
                    conceptList.map((concept, idx) => (
                        <div className="flex flex-col items-center justify-center w-full" key={idx}>
                            <button 
                                className="w-24 rounded p-2 shadow shadow-mp-green text-center text-xs text-mp-dark 
                                                hover:bg-gradient-to-r from-mp-green to-mp-blue hover:text-mp-white ransition delay-150 duration-300 ease-in-out  
                                                hover:-translate-y-1 hover:scale-110"
                                onClick={() => handleUpdateWithdrawal(concept)}
                                >   
                                {concept}
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
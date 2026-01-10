'use client'

import { failedRequest, initialStatus, pendingRequest, successfullRequest } from "@/app/services"
import { createCashRegistry } from "@/app/services/api/withdrawals"
import { useWithdrawalRegistryStore } from "@/app/store/useWithdrawalRegistryStore"
import { formatAmount } from "@/utils/formatAmount"
import { WithdrawalStages } from "@/utils/variables"
import { useState } from "react"
import { LuLoaderCircle } from "react-icons/lu"

export const FinalizeWithdrawalRegistry = () => {
    const [withdrawalRegistryStatus, setWithdrawalRegistryStatus] = useState(initialStatus)
    const { setStage, withdrawal, setWithdrawal, setUpdateFlag } = useWithdrawalRegistryStore()


    const handleWithdrawalRegistry = async () => {
        setWithdrawalRegistryStatus(pendingRequest)
        await createCashRegistry(withdrawal)
            .then(() => {
                setWithdrawalRegistryStatus(successfullRequest)
                setUpdateFlag()
                setStage(WithdrawalStages.SELECT_WITHDRAWAL_STAGE)
            })
            .catch(() => {
                setWithdrawalRegistryStatus(failedRequest)
            })
    }

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="p-1 rounedd w-2/3 shadow flex flex-col items-center justify-center text-left">
                <p className="text-sm text-mp-dark">Vendedora: <span className="text-mp-blue">{withdrawal.sellerName}</span></p>
                <p className="text-sm text-mp-dark">Concepto: <span className="text-mp-blue">{withdrawal.concept}</span></p>
                <p className="text-sm text-mp-dark">Monto: <span className="text-mp-green">{formatAmount(withdrawal.amount)}</span></p>
            </div>
            <div className="flex flex-col items-center justify-center mt-4 mb-4 w-full">
                <label htmlFor="" className="text-center text-sm text-mp-dark">Monto</label>
                <input
                    type="number"
                    placeholder="0.00"
                    className="p-2 rounded shadow w-1/3 text-mp-green text-center"
                    onChange={(e) => setWithdrawal({ ...withdrawal, amount: parseFloat(e.currentTarget.value) })}
                />
                <button
                    className="p-2 text-mp-white bg-gradient-to-r from-mp-green to-mp-blue mt-2 w-28 rounded shadow flex items-center justify-center"
                    onClick={handleWithdrawalRegistry}
                >
                    {withdrawalRegistryStatus.onLoading ? <LuLoaderCircle className="animate-spin" /> : 'Confirmar'}
                </button>
            </div>
            {
                withdrawalRegistryStatus.onSuccess &&
                <p className="text-xs text-mp-green mt-2 mb-2">Registro de deposito finalizado exitosamente</p>
            }
            {
                withdrawalRegistryStatus.onError &&
                <p className="text-xs text-mp-error mt-2 mb-2">Error al registrar el deposito intentalo nuevamente</p>
            }
        </div>
    )
}
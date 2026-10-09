'use client'

import { useEffect } from "react"
import { WithdrawalSelectionStage } from "./WithdrawalSelectionStage"
import { getBranchId, getBranchName, getCurrentAccounting } from "@/utils/appStorage"
import { useWithdrawalRegistryStore } from "@/app/store/useWithdrawalRegistryStore"
import { WithdrawalStages } from "@/utils/variables"
import { FinalizeWithdrawalRegistry } from "./FinalizeWithdrawalRegistry"

export const NewCashWithdrawalModal = () => {

    const { stage, withdrawal, setWithdrawal} = useWithdrawalRegistryStore()

    useEffect(() => {
        const branchId = getBranchId()
        const branchName = getBranchName()
        const currentAccounting = getCurrentAccounting()

        if (currentAccounting && branchId && branchName) {
            setWithdrawal({ ...withdrawal, branchId, branch: branchName, sellerName: currentAccounting.seller })
        }
    }, [])

    return (
        <>
            { stage === WithdrawalStages.SELECT_WITHDRAWAL_STAGE && <WithdrawalSelectionStage /> }
            { stage === WithdrawalStages.FINALIZE_WITHDRAWAL_STAGE && <FinalizeWithdrawalRegistry /> }
        </>
    )
}
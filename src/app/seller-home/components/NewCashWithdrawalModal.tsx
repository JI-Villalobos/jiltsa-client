'use client'

import { useEffect } from "react"
import { WithdrawalSelectionStage } from "./WithdrawalSelectionStage"
import { getBranchName, getCurrentAccounting } from "@/utils/appStorage"
import { useWithdrawalRegistryStore } from "@/app/store/useWithdrawalRegistryStore"
import { WithdrawalStages } from "@/utils/variables"
import { FinalizeWithdrawalRegistry } from "./FinalizeWithdrawalRegistry"

export const NewCashWithdrawalModal = () => {

    const { stage, withdrawal, setWithdrawal} = useWithdrawalRegistryStore()

    useEffect(() => {
        const branchName = getBranchName()
        const currentAccounting = getCurrentAccounting()

        if (currentAccounting && branchName) {
            setWithdrawal({ ...withdrawal, branch: branchName, sellerName: currentAccounting.seller })
        }
    }, [])

    return (
        <>
            { stage === WithdrawalStages.SELECT_WITHDRAWAL_STAGE && <WithdrawalSelectionStage /> }
            { stage === WithdrawalStages.FINALIZE_WITHDRAWAL_STAGE && <FinalizeWithdrawalRegistry /> }
        </>
    )
}
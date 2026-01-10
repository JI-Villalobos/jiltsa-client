import { WithdrawalStages } from "@/utils/variables"
import { CreateCashWithdrawalDto } from "../services/api/withdrawals"
import { create } from "zustand"

type State = {
    stage : WithdrawalStages
    withdrawal: CreateCashWithdrawalDto
    updateFlag: boolean
}

type Action = {
    setStage: (stage: WithdrawalStages) => void
    setWithdrawal: (withdrawal: CreateCashWithdrawalDto) => void
    setUpdateFlag: () => void
}

export const defaullWithdrawal: CreateCashWithdrawalDto = {
    amount: 0,
    branch: '',
    concept: '',
    sellerName: ''
}

export const useWithdrawalRegistryStore = create<State & Action>((set) => ({
    stage: WithdrawalStages.SELECT_WITHDRAWAL_STAGE,
    withdrawal: defaullWithdrawal,
    updateFlag: false,
    setStage: (stage: WithdrawalStages) => set(() => ({ stage: stage })),
    setWithdrawal: (withdrawal: CreateCashWithdrawalDto) => set(() => ({ withdrawal: withdrawal })),
    setUpdateFlag: () => set((state) => ({ updateFlag: !state.updateFlag }))
}))
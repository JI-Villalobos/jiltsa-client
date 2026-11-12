import axios from "axios"
import { authOptions, endPoints } from ".."

export interface RecordingLossExpiration {
  id?: number
  promotionId?: number
  branchId?: number
  totalLoss?: number
  /** yyyy-MM-dd */
  creationDate?: string
}

export const getLossByPromotion = async (promotionId: number) => {
  const { data } = await axios.get<RecordingLossExpiration>(endPoints.expirationLosses.getByPromotion(promotionId), authOptions())

  return data
}

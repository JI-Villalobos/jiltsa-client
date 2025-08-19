import axios from "axios"
import { endPoints } from ".."
import { setUserCredentials } from "@/utils/appStorage"

export type AuthResponse = {
  branchId: number,
  token: string,
  role: string
}

export type AuthRequest = {
  email: string,
  pass: string
}
// accept: '*/*',
export const authenticate = async (auth: AuthRequest) => {
  const options = {
    headers: {
      'Content-Type': 'application/json',
    }
  }

  await axios.post(endPoints.auth.authentication, auth, options).then(({ data }) => {
    setUserCredentials(data)
  })
}
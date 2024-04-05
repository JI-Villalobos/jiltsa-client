import Cookies from "js-cookie"
import { createContext } from "react";

export const AuthContext = createContext(false);

export function useProviderAuth(): boolean {

  if (Cookies.get('token')) {
    return true
  } else {
    return false
  }
}
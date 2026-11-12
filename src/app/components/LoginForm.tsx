'use client'

import React, { useState } from "react"
import { failedRequestFrom, initialStatus, pendingRequest, RequestStatus, successfullRequest } from "../services"

const LOGIN_ERROR = 'No fue posible Iniciar Sesión revisa que tus datos sean correctos'
import { authenticate, AuthRequest } from "../services/api/auth"
import { useRouter } from "next/navigation"
import { LuLoaderCircle } from "react-icons/lu"

export default function LoginForm(): JSX.Element {
  const [mail, setMail] = useState<string>('')
  const [pass, setPass] = useState<string>('')
  const [status, setStatus] = useState<RequestStatus>(initialStatus)
  const router = useRouter()

  const request: AuthRequest = {
    email: mail,
    pass: pass
  }

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    setStatus(pendingRequest)
    e.preventDefault()
    await authenticate(request).then(
      () => {
        setStatus(successfullRequest)
        router.push('/')
      }
    ).catch((e) => {
      setStatus(failedRequestFrom(e, LOGIN_ERROR))
    })
  }

  return (
    <form onSubmit={handleAuth} className="flex flex-col items-center justify-center mt-6 shadow-lg rounded w-1/2 h-1/3">
      <p className="font-coda text-mp-green font-semibold">Por favor ingresa tu usuario y contraseña</p>
      <input
        placeholder="Usuario"
        type="text"
        className="m-2 border border-mp-dark/70 outline-0 focus:bg-mp-gray-soft text-mp-dark rounded text-center w-2/3 p-2"
        value={mail}
        onChange={(e: React.FormEvent<HTMLInputElement>): void => {
          setMail(e.currentTarget.value)
        }}
      />
      <input
        placeholder="Contraseña"
        type="password"
        className="m-2 border border-mp-dark/70 outline-0 focus:bg-mp-gray-soft text-mp-dark rounded text-center w-2/3 p-2"
        value={pass}
        onChange={(e: React.FormEvent<HTMLInputElement>): void => {
          setPass(e.currentTarget.value)
        }}
      />
      <button 
        type="submit" 
        className="rounded bg-gradient-to-r from-mp-green to-mp-blue transition-all text-mp-gray-soft w-2/3 m-2 flex items-center justify-center p-2">
        {status.onLoading ? <LuLoaderCircle className="animate-spin m-1"/> : 'Iniciar Sesion'}
      </button>
      {
        status.onError ? (<p className="text-sm text-mp-error text-center w-full mt-6">
          {status.message ?? LOGIN_ERROR}
        </p>)
          : <p className="text-sm text-mp-blue text-center w-1/2 mt-6">
            *La autenticación en este portal solo es posible a travez de  personal con credenciales de administrador
          </p>
      }
    </form>
  )
}
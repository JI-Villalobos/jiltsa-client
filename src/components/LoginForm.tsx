import { AuthRequest, authenticate } from "@/services/api/auth"
import React, { useState } from "react"
import Spinner from "./Spinner"
import { RequestStatus } from "@/services"
import { useRouter } from "next/router"

export default function LoginForm(): JSX.Element {
  const req: RequestStatus = {
    onLoading: false,
    onSuccess: false,
    onError: false
  }
  const [mail, setMail] = useState<string>('')
  const [pass, setPass] = useState<string>('')
  const [status, setStatus] = useState<RequestStatus>(req)
  const router = useRouter()

  const request: AuthRequest = {
    email: mail,
    pass: pass
  }

  const handleAuth = async (e: React.FormEvent<HTMLButtonElement>) => {
    setStatus({
      ...req,
      onLoading: true
    })
    e.preventDefault()
    await authenticate(request).then(
      () => {
        setStatus({
          ...req,
          onLoading: false
        })
        router.push('/')
      }
    ).catch(() => {
      setStatus({
        ...req,
        onError: true
      })
    })
  }

  return (
    <div className="flex flex-col items-center mt-6">
      <p className="font-medium text-xl font-coda text-mp-dark">Por favor ingresa tu usuario y contraseña</p>
      <input
        placeholder="Usuario"
        type="text"
        className="m-2 border border-mp-dark/70 outline-0 focus:bg-mp-gray-soft text-mp-dark rounded text-center h-8  w-5/12"
        value={mail}
        onChange={(e: React.FormEvent<HTMLInputElement>): void => {
          setMail(e.currentTarget.value)
        }}
      />
      <input
        placeholder="Contraseña"
        type="password"
        className="m-2 border border-mp-dark/70 outline-0 focus:bg-mp-gray-soft text-mp-dark rounded text-center h-8  w-5/12"
        value={pass}
        onChange={(e: React.FormEvent<HTMLInputElement>): void => {
          setPass(e.currentTarget.value)
        }}
      />
      <button type="button" className="rounded bg-mp-green text-mp-gray-soft w-5/12 h-9 m-2 flex items-center justify-center" onClick={handleAuth}>
        {status.onLoading ? <Spinner /> : 'Iniciar Sesion'}
      </button>
      {
        status.onError ? (<p className="text-sm text-mp-error text-center w-1/2 mt-6">
          No fue posible Iniciar Sesión revisa que tus datos sean correctos
        </p>)
          : <p className="text-sm text-mp-blue text-center w-1/2 mt-6">
            *La autenticación en este portal solo es posible a travez de  personal con credenciales de administrador
          </p>
      }
    </div>
  )
}
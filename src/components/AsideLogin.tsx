import Image from "next/image";

export default function AsideLogin(): JSX.Element {
  return (
    <div className="flex flex-col bg-mp-gray-soft w-1/2 h-screen items-center justify-center">
      <Image src="/secure_login.svg" alt="secure login image" width={448} height={351} />
      <p className="text-2xl text-mp-dark font-coda font-medium text-center">Es necesario Iniciar Sesión para ingresar al portal</p>
      <p className="text-xs text-mp-dark font-coda">fmipueblito_version: 0.9.1</p>
    </div>
  )
}
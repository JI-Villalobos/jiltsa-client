import Image from "next/image";

interface Props {
  message?: string
}

const DEFAULT_MESSAGE = 'Ocurrio un error al intentar cargar la información, revisa tu conexión a internet o contacta con tu supervisor'

export default function Error({ message }: Props): JSX.Element {
  return(
    <div className="flex flex-col items-center mt-8">
      <Image src='/undraw_server_down_s-4-lk.svg' alt='Error loading info' width={264} height={264}/>
      <p className="text-sm mt-2 text-center font-coda text-mp-dark w-1/2">{message ?? DEFAULT_MESSAGE}</p>
    </div>
  )
}
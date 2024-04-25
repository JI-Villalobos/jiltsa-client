import Link from "next/link";

export default function NotRegisteredSessionInfo(): JSX.Element{
    return(
        <div className="rounded border-s-4 border-mp-error bg-mp-soft-red p-4 w-3/4 m-6">
            <strong className="block font-medium text-mp-strong-red"> Turno No Registrado </strong>
            <div className="flex flex-col items-center">
                <p className="mt-2 text-sm text-mp-strong-red">
                    Aún no se ha registrado un nuevo turno, para registrar gastos ventas y denás acciones
                    es necesario tener un turo registrado abierto. 
                </p>
                <Link href='/operation' className="mt-2 text-mp-blue text-center border border-mp-strong-red p-2 rounded w-1/4">Abrir turno</Link>
            </div>
        </div>
    )
}
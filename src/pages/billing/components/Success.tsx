import Link from "next/link";

export default function Success(): JSX.Element {
  return (
    <div role="alert" className="rounded-xl border border-mp-soft-dark  p-4 mt-6">
      <div className="flex items-start gap-4">
        <span className="text-mp-green">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </span>

        <div className="flex-1">
          <strong className="block font-medium text-mp-green"> Operación exitosa </strong>

          <p className="mt-1 text-sm text-mp-soft-dark">Se actualizo la fecha de recepción correctamente</p>

          <div className="mt-4 flex gap-2">
            <Link
              href="/billing"
              className="inline-flex items-center gap-2 rounded-lg bg-mp-blue px-4 py-2 text-mp-gray-soft"
            >
              <span className="text-sm">Regresar</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
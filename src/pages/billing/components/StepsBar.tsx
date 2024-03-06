import { Dispatch, SetStateAction } from "react"

type Props = {
  step: number
  setStep: Dispatch<SetStateAction<number>>
}

export default function StepsBar({ step, setStep }: Props): JSX.Element {

  return (
    <div className="w-8/12">
      <h2 className="text-center text-sm text-mp-dark m-4">Confirmar Recepción</h2>

      <div>
        <div className="overflow-hidden rounded-full bg-mp-gray-soft">
          <div className={
            step == 1 ? 'h-2 w-1 rounded-full bg-mp-blue'
              : step == 2 ? 'h-2 w-1/2 rounded-full bg-mp-blue'
                : 'h-2 w-full rounded-full bg-mp-blue'
          }></div>
        </div>

        <ol className="mt-4 grid grid-cols-3 text-sm font-medium text-mp-strong-gray">
          <li className="flex items-center justify-start text-mp-blue sm:gap-1.5">
            <span className="hidden sm:inline"> Detalles </span>

            <svg
              className="w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
              />
            </svg>
          </li>

          <li className={
            step == 1 ? 'flex items-center justify-center text-mp-strong-gray sm:gap-1.5'
              : 'flex items-center justify-center text-mp-blue sm:gap-1.5 '
          }>
            <span className="hidden sm:inline"> Recepción </span>

            <svg
              className="w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>

          </li>

          <li className={
            step == 3 ? 'flex items-center text-mp-blue sm:gap-1.5 justify-end'
              : 'flex items-center text-mp-strong-gray sm:gap-1.5 justify-end'
          }>
            <span className="hidden sm:inline"> Confirmación </span>

            <svg
              className="w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>


          </li>
        </ol>
      </div>
    </div>
  )
}
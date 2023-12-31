import { useState } from "react"
import Spinner from "./Spinner"
import NewExpense from "./NewExpense"

export default function Expenses(): JSX.Element {
  const [onNewRegister, setOnNewRegister] = useState<boolean>(false)
  const [onLoading, setOnLoading] = useState<boolean>(false)
  const nextStage = (): void => {
    setOnLoading(true)
    setTimeout(() => {
      setOnNewRegister(true)
    }, 1000)
  }
  return (
    <div className="bg-mp-gray-soft border border-mp-dark rounded flex flex-col items-center mt-10 w-8/12">
      <p className="text-mp-green font-coda p-2 font-semibold">Gastos</p>
      <div className="h-40 w-full flex items-center justify-center">
        {
          onNewRegister ? <NewExpense />
            : onLoading ? (
              <Spinner bgBlank/>
            )
              : (<button className="bg-mp-dark text-mp-gray-soft w-20 rounded border-none hover:cursor-pointer" onClick={nextStage}>
                +Nuevo
              </button>)
        }
      </div>
    </div>
  )
}
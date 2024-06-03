import { useState } from "react"
import Spinner from "./Spinner"
import NewExpense from "./NewExpense"
import SuccessExpenseRegistry from "./SuccessExpenseRegistry"
import ErrorMessage from "./ErrorMessage"

export enum STAGES {
  DEFAULT = 0,
  NEW = 1,
  SUCCESS = 2,
  FAILED = 3,
  LOADING = 4,
  CONFIRM = 5
}

export default function Expenses(): JSX.Element {
  const [stages, setStages] = useState<number>(STAGES.DEFAULT)
  
  const nextStage = (): void => {
    setTimeout(() => {
      setStages(STAGES.NEW)
    }, 1000)
    setStages(STAGES.LOADING)
  }

  return (
    <div className="flex flex-col items-center w-8/12">
      <div className="w-full flex items-center justify-center">
        {
          stages == STAGES.DEFAULT
            ? <button className="bg-mp-dark text-mp-gray-soft rounded border-none hover:cursor-pointer p-4" 
                onClick={nextStage}
              >
                +Nuevo Gasto
              </button>
          : stages == STAGES.NEW 
            ? <NewExpense setStage={setStages}/>
          : stages == STAGES.SUCCESS
            ? <SuccessExpenseRegistry setStage={setStages}/>
          : stages == STAGES.FAILED
            ? <ErrorMessage setStage={setStages} title="Opss! ocurrio un error" description="No fue posible completar el registro, intentalo nuevamente"/>
          : <Spinner bgBlank />  
        }
      </div>
    </div>
  )
}
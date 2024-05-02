import { Dispatch, SetStateAction } from "react"
import { STAGES } from "./Expenses"

interface Props {
    setStage?: Dispatch<SetStateAction<number>>
    title: string
    description: string
}

export default function ErrorMessage({ setStage, title, description }: Props): JSX.Element {

    const nextStage = (): void => {
        if (setStage) {
            setTimeout(() => {
                setStage(STAGES.NEW)
            }, 1000)
            setStage(STAGES.LOADING)
        }    
    }

    return(
        <div className="rounded border-s-4 border-mp-error bg-mp-soft-red p-4 w-3/4 m-6">
            <strong className="block font-medium text-mp-strong-red"> {title} </strong>
            <div className="flex flex-col items-center">
                <p className="mt-2 text-sm text-mp-strong-red">
                    {description} 
                </p>
                {
                   setStage && <button className="mt-2 text-mp-blue text-center border border-mp-strong-red p-2 rounded w-1/4" onClick={nextStage}>Reintentar</button>
                }
            </div>
        </div>
    )
}
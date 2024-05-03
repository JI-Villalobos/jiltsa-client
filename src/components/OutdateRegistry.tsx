import Expenses, { STAGES } from "./Expenses";
import SessionInfo from "./SessionInfo";
import Incomes from "./Incomes";
import { useState } from "react";
import Summary from "@/pages/close-operation/components/Summary";

export default function OutdateRegistry(): JSX.Element {
    const [stage, setStage] = useState(STAGES.DEFAULT)

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <p>Registro extemporaneo</p>
            {
                stage != STAGES.SUCCESS && <SessionInfo />
            }
            {
                stage == STAGES.DEFAULT && 
                    <button 
                        className="bg-none text-mp-blue p-4 m-2" 
                        onClick={() => setStage(STAGES.NEW)}
                    >
                             Continuar a Ingresos
                    </button>
            }
            {
                stage == STAGES.NEW ? <Incomes setStage={setStage}/>
                : stage == STAGES.SUCCESS ? <Summary />
                : <Expenses />
            }
          </div>
    )
}
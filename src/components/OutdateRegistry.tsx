import Expenses, { STAGES } from "./Expenses";
import SessionInfo from "./SessionInfo";
import Incomes from "./Incomes";
import { useState } from "react";
import Summary from "@/pages/close-operation/components/Summary";

//TODO: the stage component should be more clear
export default function OutdateRegistry(): JSX.Element {
    const [stage, setStage] = useState(STAGES.DEFAULT)

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <p>Registro extemporaneo</p>
            {
                stage != STAGES.SUCCESS && <SessionInfo />
            }
            {
                //TODO: remove this
                stage == STAGES.NEW ? <Incomes setStage={setStage}/>
                : stage == STAGES.SUCCESS ? <Summary setStage={setStage}/>
                : <Expenses />
            }
          </div>
    )
}
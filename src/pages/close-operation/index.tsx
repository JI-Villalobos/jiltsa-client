import { STAGES } from "@/components/Expenses";
import Layout from "@/layouts/Layout";
import { useState } from "react";
import Summary from "./components/Summary";
import ErrorMessage from "@/components/ErrorMessage";
import IncomesRegistry from "@/components/shared/IncomesRegistry";
import ConfirmSummary from "./components/ConfirmSummary";

export default function CloseOperation(): JSX.Element {
    const [stage, setStage] = useState(STAGES.DEFAULT)

    return(
        <Layout>
            <div className="mt-10 w-full flex justify-center items-center">
                {
                   stage == STAGES.DEFAULT ? <IncomesRegistry setStage={setStage}/>
                   : stage == STAGES.SUCCESS ? <Summary setStage={setStage}/>
                   : stage == STAGES.CONFIRM ? <ConfirmSummary setStage={setStage} />
                   : <ErrorMessage title="Oppss! Error inesperado" description="No te preocupes estamos trabajando para resolverlo"/>
                }    
            </div>
        </Layout>
    )
}
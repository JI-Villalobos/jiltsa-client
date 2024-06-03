import { STAGES } from "@/components/Expenses";
import Incomes from "@/components/Incomes";
import Layout from "@/layouts/Layout";
import { useState } from "react";
import Summary from "./components/Summary";
import ErrorMessage from "@/components/ErrorMessage";
import IncomesRestry from "@/components/shared/IncomesRegistry";

export default function CloseOperation(): JSX.Element {
    const [stage, setStage] = useState(STAGES.DEFAULT)

    return(
        <Layout>
            <div className="mt-10 w-full flex justify-center items-center">
                {
                   stage == STAGES.DEFAULT ? <IncomesRestry setStage={setStage}/>
                   : stage == STAGES.SUCCESS ? <Summary />
                   : <ErrorMessage title="Oppss! Error inesperado" description="No te preocupes estamos trabajando para resolverlo"/>
                }    
            </div>
        </Layout>
    )
}
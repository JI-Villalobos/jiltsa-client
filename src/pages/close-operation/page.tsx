'use client'

import { useState } from "react";
import ConfirmSummary from "./components/ConfirmSummary";
import { STAGES } from "@/app/components/Expenses";
import Layout from "@/app/layouts/Layout";
import IncomesRegistry from "@/app/components/shared/IncomesRegistry";
import Summary from "./components/Summary";
import ErrorMessage from "@/app/components/shared/ErrorMessage";

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
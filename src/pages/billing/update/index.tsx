import Layout from "@/layouts/Layout";
import StepsBar from "../components/StepsBar";
import { useState } from "react";
import BillsSelected from "../components/BillsSelected";
import ConfirmReceptionForm from "../components/ConfirmReceptionForm";
import Success from "../components/Success";

export default function Update(): JSX.Element {
  const [step, setstep] = useState(1)

  return(
    <Layout>
      <StepsBar step={step} setStep={setstep}/>
      {
        step == 1 ? (<BillsSelected setStep={setstep}/>)
        : step == 2 ? (<ConfirmReceptionForm setStep={setstep} />)
        : <Success />
      }
    </Layout>
  )
}
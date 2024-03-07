import Layout from "@/layouts/Layout";
import StepsBar from "../components/StepsBar";
import { useState } from "react";
import BillsSelected from "../components/BillsSelected";
import ConfirmReceptionForm from "../components/ConfirmReceptionForm";
import Success from "../components/Success";
import PaymentForm from "../components/PaymentForm";
import { useRouter } from "next/router";

export default function Update(): JSX.Element {
  const [step, setstep] = useState(1)

  const router = useRouter()
  const payment = router.query.payment
  
  return(
    <Layout>
      <StepsBar step={step} setStep={setstep}/>
      {
        step == 1 ? (<BillsSelected setStep={setstep}/>)
        : step == 2 ? (<>
          {
            payment ? <PaymentForm setStep={setstep}/>
            : <ConfirmReceptionForm setStep={setstep}/>
          }
        </>)
        : <Success />
      }
    </Layout>
  )
}
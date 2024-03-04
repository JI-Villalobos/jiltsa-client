import Layout from "@/layouts/Layout";
import NewBillForm from "../components/NewBillForm";
import { useRouter } from "next/router";
import Link from "next/link";

export default function NewBill(): JSX.Element {
  const route = useRouter()

  return (
    <Layout>
      <button onClick={() => route.push("/billing")} className="text-mp-blue"> 
        Regresar
      </button>
      <NewBillForm />
    </Layout>
  )
}
import BranchConfigCollection from "@/components/BranchConfigCollection";
import ExpenseTypeCollection from "@/components/ExpensetypeCollection";
import IncomeTypeCollection from "@/components/IncomeTypeCollection";
import Layout from "@/layouts/Layout";
import { isAuth } from "@/utils/appStorage";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Collections(): JSX.Element {

  const router = useRouter()

  useEffect(() => {
    if(!isAuth){
        router.push("/login")
    }
  }, [])

  return (
    <Layout>
      <>
        <IncomeTypeCollection />
        <ExpenseTypeCollection />
        <BranchConfigCollection />
      </>
    </Layout>
  )
}
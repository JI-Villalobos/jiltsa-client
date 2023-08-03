import BranchConfigCollection from "@/components/BranchConfigCollection";
import ExpenseTypeCollection from "@/components/ExpensetypeCollection";
import IncomeTypeCollection from "@/components/IncomeTypeCollection";
import Layout from "@/layouts/Layout";

export default function Collections(): JSX.Element {
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
import AsideMenu from "@/components/AsideMenu";
import ExpenseTypeCollection from "@/components/ExpensetypeCollection";
import Header from "@/components/Header";
import IncomeTypeCollection from "@/components/IncomeTypeCollection";
import Layout from "@/layouts/Layout";

export default function Collections(): JSX.Element {
  return (
    <Layout>
      <>
        <IncomeTypeCollection />
        <ExpenseTypeCollection />
      </>
    </Layout>
  )
}
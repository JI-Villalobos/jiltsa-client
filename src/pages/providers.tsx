import ProvidersWrapper from "@/components/ProvidersWrapper";
import Layout from "@/layouts/Layout";

export default function Providers(): JSX.Element {
  return(
    <Layout>
      <h1 className="text-mp-dark">Poveedores</h1>
      <ProvidersWrapper />
    </Layout>
  )
}
import ProvidersWrapper from "@/components/ProvidersWrapper";
import Layout from "@/layouts/Layout";
import { isAuth } from "@/utils/appStorage";
import { useRouter } from "next/router";
import { useEffect } from "react";

/**
 * 
 * @deprecated
 * this page will be removed soon
 */
export default function Providers(): JSX.Element {
  const router = useRouter()

  useEffect(() => {
    if (!isAuth()) {
      router.push("/login")
    }
  }, [])

  return(
    <Layout>
      <h1 className="text-mp-dark">Poveedores</h1>
      <ProvidersWrapper />
    </Layout>
  )
}
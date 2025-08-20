import Layout from "@/app/layouts/Layout";
import Link from "next/link";

export default function NotFound(): JSX.Element {
    return (
        <Layout>
            <div className="grid h-screen place-content-center px-4">
                <div className="text-center">
                    <h1 className="text-9xl font-black text-mp-soft-dark">404</h1>

                    <p className="text-2xl font-bold tracking-tight text-mp-dark sm:text-4xl">Uh-oh!</p>

                    <p className="mt-4 text-mp-green">Probablemente el recurso al que intentas acceder no esta disponible intentalo más tarde.</p>

                    <Link
                        href="/"
                        className="mt-6 inline-block rounded bg-mp-blue px-5 py-3 text-sm text-mp-white font-medium text-white hover:bg-mp-soft-dark focus:outline-none focus:ring"
                    >
                        Regresar
                    </Link>
                </div>
            </div>
        </Layout>
    )
}
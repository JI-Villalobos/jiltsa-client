import Layout from "@/layouts/Layout";

export default function CreditSales(): JSX.Element {
    return (
        <Layout>
            <div className="mt-10 w-full flex  flex-col justify-center items-center">
                <h3 className="text-xl text-mp-dark font-semibold">Administrador de apartados</h3>
                <div className="w-1/2 flex flex-row items-center justify-center m-8">
                    <div className="w-1/2">
                        <label className="block text-sm font-medium text-mp-soft-dark"> Consultar por: </label>

                        <select
                            name="HeadlineAct"
                            id="HeadlineAct"
                            className="mt-1.5 w-1/2 rounded-lg border border-mp-gray-soft text-mp-soft-dark sm:text-sm"
                        >

                            <option value="AK">Todas</option>
                            <option value="BBK">Pagadas</option>
                            <option value="BG">Pendientes</option>
                        </select>
                    </div>
                    <button className="bg-mp-dark flex flex-row p-2 rounded text-mp-white">

                        Nuevo Apartado
                    </button>
                </div>

                <div className="flex flex-row items-center w-2/4 justify-between shadow-lg p-2">
                    <div className="bg-mp-error text-mp-white text-xs text-center rounded p-1 flex w-1/12">Pendiente</div>
                    <div className="flex flex-row text-sm m-2">
                        <p className="text-mp-dark mr-1">Número de Apartado:</p>
                        <p className="text-mp-blue">1</p>
                    </div>
                    <div className="flex flex-col m-2">
                        <p className="text-mp-green font-semibold">ARBOL DE NARANJO INJERT</p>
                        <div className="flex flex-row text-sm">
                            <p className="text-mp-dark mr-1">Fecha apartado: </p>
                            <p className="text-mp-blue">2024-07-03</p>
                        </div>
                    </div>
                    <div className="flex flex-row items-center">
                        <p className="text-mp-green mr-1">Monto: </p>
                        <p className="text-mp-blue">175</p>
                    </div>
                    <button className="bg-mp-blue flex flex-row p-2 rounded text-mp-white">

                        Abonar
                    </button>
                </div>
                <div className="flex flex-row items-center w-2/4 justify-between shadow-lg p-2">
                    <div className="bg-mp-error text-mp-white text-xs text-center rounded p-1 flex w-1/12">Pendiente</div>
                    <div className="flex flex-row text-sm m-2">
                        <p className="text-mp-dark mr-1">Número de Apartado:</p>
                        <p className="text-mp-blue">1</p>
                    </div>
                    <div className="flex flex-col m-2">
                        <p className="text-mp-green font-semibold">ARBOL DE NARANJO INJERT</p>
                        <div className="flex flex-row text-sm">
                            <p className="text-mp-dark mr-1">Fecha apartado: </p>
                            <p className="text-mp-blue">2024-07-03</p>
                        </div>
                    </div>
                    <div className="flex flex-row items-center">
                        <p className="text-mp-green mr-1">Monto: </p>
                        <p className="text-mp-blue">175</p>
                    </div>
                    <button className="bg-mp-blue flex flex-row p-2 rounded text-mp-white">

                        Abonar
                    </button>
                </div>
                <div className="flex flex-row items-center w-2/4 justify-between shadow-lg p-2">
                    <div className="bg-mp-light-green text-mp-white text-xs text-center rounded p-1 flex w-1/12">Pagado</div>
                    <div className="flex flex-row text-sm m-2">
                        <p className="text-mp-dark mr-1">Número de Apartado:</p>
                        <p className="text-mp-blue">1</p>
                    </div>
                    <div className="flex flex-col m-2">
                        <p className="text-mp-green font-semibold">ARBOL DE NARANJO INJERT</p>
                        <div className="flex flex-row text-sm">
                            <p className="text-mp-dark mr-1">Fecha apartado: </p>
                            <p className="text-mp-blue">2024-07-03</p>
                        </div>
                    </div>
                    <div className="flex flex-row items-center">
                        <p className="text-mp-green mr-1">Monto: </p>
                        <p className="text-mp-blue">175</p>
                    </div>
                    <button className="bg-mp-blue flex flex-row p-2 rounded text-mp-white">

                        Abonar
                    </button>
                </div>
            </div>
        </Layout>
    )
}
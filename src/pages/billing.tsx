import Layout from "@/layouts/Layout";

export default function Billing(): JSX.Element {
  return (
    <Layout>
      <h1 className="text-mp-dark">Facturas</h1>
      <div className="w-8/12 mt-4 flex flex-row justify-between">
        <div className="w-4/12">
          <label htmlFor="searchBy" className="block text-sm font-medium text-mp-dark"> Mostrar por: </label>

          <select
            name="searchBy"
            id="searchBy"
            className="mt-1.5 w-full rounded-sm border-mp-strong-gray text-mp-soft-dark sm:text-sm"
          >
            <option value="pending">Pendientes de pago</option>
            <option value="all">Todas</option>
          </select>
        </div>
        <button
          className="block rounded-lg bg-mp-dark px-5 py-3 text-sm font-medium text-mp-gray-soft transition hover:bg-mp-soft-dark focus:outline-none focus:ring"
          type="button"
        >
          Nueva Factura
        </button>
      </div>
      <div>
        <div className="w-full mt-8 flex justify-end">
          <a
            href="#"
            className="inline-block rounded bg-mp-blue px-4 py-2 text-xs font-medium text-mp-gray-soft"
          >
            Pagar
          </a>
        </div>
        <div className="overflow-x-auto m-4">
          <table className="min-w-full divide-y-2 divide-mp-strong-gray text-sm">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="px-4 py-2">
                  <label htmlFor="SelectAll" className="sr-only">Select All</label>

                  <input type="checkbox" id="SelectAll" className="size-5 rounded border-gray-300" />
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-mp-dark">Sucursal</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-mp-dark">Fecha</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-mp-dark">Folio</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-mp-dark">Monto</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-mp-dark">Fecha Limite</th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-mp-dark"></th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-mp-strong-gray">
              <tr>
                <th className="px-4 py-2">
                  <label htmlFor="SelectAll" className="sr-only">Select All</label>

                  <input type="checkbox" id="SelectAll" className="size-5 rounded border-mp-soft-dark" />
                </th>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-mp-soft-dark">John Doe</td>
                <td className="whitespace-nowrap px-4 py-2 text-mp-soft-dark">24/05/1995</td>
                <td className="whitespace-nowrap px-4 py-2 text-mp-blue">5685457</td>
                <td className="whitespace-nowrap px-4 py-2 text-mp-green">$1200</td>
                <td className="whitespace-nowrap px-4 py-2 text-mp-soft-dark">24/05/1995</td>
                <td className="whitespace-nowrap px-4 py-2">
                  <a
                    href="#"
                    className="inline-block rounded bg-mp-dark px-4 py-2 text-xs font-medium text-mp-gray-soft hover:bg-mp-soft-dark"
                  >
                    View
                  </a>
                </td>
              </tr>

              <tr>
                <th className="px-4 py-2">
                  <label htmlFor="SelectAll" className="sr-only">Select All</label>

                  <input type="checkbox" id="SelectAll" className="size-5 rounded border-mp-soft-dark" />
                </th>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-mp-soft-dark">John Doe</td>
                <td className="whitespace-nowrap px-4 py-2 text-mp-soft-dark">24/05/1995</td>
                <td className="whitespace-nowrap px-4 py-2 text-mp-blue">5685457</td>
                <td className="whitespace-nowrap px-4 py-2 text-mp-green">$1200</td>
                <td className="whitespace-nowrap px-4 py-2 text-mp-soft-dark">24/05/1995</td>
                <td className="whitespace-nowrap px-4 py-2">
                  <a
                    href="#"
                    className="inline-block rounded bg-mp-dark px-4 py-2 text-xs font-medium text-mp-gray-soft hover:bg-mp-soft-dark"
                  >
                    View
                  </a>
                </td>
              </tr>

              <tr>
                <th className="px-4 py-2">
                  <label htmlFor="SelectAll" className="sr-only">Select All</label>

                  <input type="checkbox" id="SelectAll" className="size-5 rounded border-mp-soft-dark" />
                </th>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-mp-soft-dark">John Doe</td>
                <td className="whitespace-nowrap px-4 py-2 text-mp-soft-dark">24/05/1995</td>
                <td className="whitespace-nowrap px-4 py-2 text-mp-blue">5685457</td>
                <td className="whitespace-nowrap px-4 py-2 text-mp-green">$1200</td>
                <td className="whitespace-nowrap px-4 py-2 text-mp-soft-dark">24/05/1995</td>
                <td className="whitespace-nowrap px-4 py-2">
                  <a
                    href="#"
                    className="inline-block rounded bg-mp-dark px-4 py-2 text-xs font-medium text-mp-gray-soft hover:bg-mp-soft-dark"
                  >
                    View
                  </a>
                </td>
              </tr>

              <tr>
                <th className="px-4 py-2">
                  <label htmlFor="SelectAll" className="sr-only">Select All</label>

                  <input type="checkbox" id="SelectAll" className="size-5 rounded border-mp-soft-dark" />
                </th>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-mp-soft-dark">John Doe</td>
                <td className="whitespace-nowrap px-4 py-2 text-mp-soft-dark">24/05/1995</td>
                <td className="whitespace-nowrap px-4 py-2 text-mp-blue">5685457</td>
                <td className="whitespace-nowrap px-4 py-2 text-mp-green">$1200</td>
                <td className="whitespace-nowrap px-4 py-2 text-mp-soft-dark">24/05/1995</td>
                <td className="whitespace-nowrap px-4 py-2">
                  <a
                    href="#"
                    className="inline-block rounded bg-mp-dark px-4 py-2 text-xs font-medium text-mp-gray-soft hover:bg-mp-soft-dark"
                  >
                    View
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}
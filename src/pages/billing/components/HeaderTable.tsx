export default function HeaderTable(): JSX.Element {
  return (
    <thead className="ltr:text-left rtl:text-right">
      <tr>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-mp-dark">Selector</th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-mp-dark">Sucursal</th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-mp-dark">Fecha</th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-mp-dark">Folio</th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-mp-dark">Monto</th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-mp-dark">Fecha Limite</th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-mp-dark">Fecha Recepción</th>
        <th className="whitespace-nowrap px-4 py-2 font-medium text-mp-dark"></th>
        <th className="px-4 py-2"></th>
      </tr>
    </thead>
  )
}
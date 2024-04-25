interface Props {
    accountingId: number
    seller: string
}

export default function RegisteredSessionInfo({ accountingId, seller }: Props): JSX.Element {
    return(
        <div className="rounded border-s-4 border-mp-green bg-mp-gray-soft p-4 m-6 flex flex-col items-center">
            <strong className="block font-medium text-mp-green text-xl"> Información del turno actual </strong>
            <div className="flex flex-row">
                <p className='mt-4 text-mp-dark font-coda text-sm mr-4'>
                Corte Número: <span className='text-mp-blue'>{accountingId } </span>
                </p>
                <p className='mt-4 text-mp-dark font-coda text-sm'>Vendedora: <span className='text-mp-blue'>{seller}</span></p>
            </div>
        </ div>
    )
}
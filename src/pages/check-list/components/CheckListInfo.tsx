'use client'

import Spinner from "@/components/Spinner"
import { failedRequest, initialStatus, pendingRequest, successfullRequest } from "@/services"
import { getTotalBalance, TotalBalance } from "@/services/api/branches"
import { CreateCheckList, createCheckList } from "@/services/api/checklist"
import { CurrentAccounting, getCurrentAccounting, getUserCredentials } from "@/utils/appStorage"
import DateFormat from "@/utils/DateFormat"
import localDateFormat from "@/utils/localDateTime"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { BiError, BiBattery } from "react-icons/bi"

export const CheckListInfo = (): JSX.Element => {
    const [loadInfostatus, setLoadInfoStatus] = useState(initialStatus)
    const [submitstatus, setSubmitStatus] = useState(initialStatus)
    const [currentAccounting, setCurrentAccounting] = useState<CurrentAccounting>()
    const [balance, setBalance] = useState<TotalBalance>()
    const router = useRouter()

    useEffect(() => {
        setLoadInfoStatus(pendingRequest)
        const current = getCurrentAccounting()
        const profile = getUserCredentials()

        if (current && profile) {
            getTotalBalance(profile.branchId)
                .then((res) => {
                    setBalance(res)
                    setCurrentAccounting(current)

                    setLoadInfoStatus(successfullRequest)
                })
                .catch(() => {
                    setLoadInfoStatus(failedRequest)
                })
        } else {
            router.push("/seller-home")
        }
    }, [])

    const handleSubmit = async (event: { target: any, preventDefault: () => void }) => {
        event.preventDefault()
        setSubmitStatus(pendingRequest)
        const formData = new FormData(event.target)

        const checkType = formData.get('checkType')?.toString()!
        const cashBalance = formData.get('cashBalance')?.toString()!
        const tranboxBalance = formData.get('tranboxBalance')?.toString()!
        const cellphoneCharge = formData.get('cellphoneCharge')?.toString()!
        const cellphoneCondition = formData.get('cellphoneCondition')?.toString()!
        const cellphoneObservation = formData.get('cellphoneObservation')?.toString()!
        const furnitureCleanConditions = formData.get('furnitureCleanConditions')?.toString()!
        const installationState = formData.get('installationState')?.toString()!
        const installationStateObservation = formData.get('installationStateObservation')?.toString()!

        const phonCond = cellphoneCondition ? true : false
        const instState = installationState ? true : false

        const body: CreateCheckList = {
            checkType: checkType,
            date: localDateFormat(currentAccounting?.date!),
            cashBalance: parseInt(cashBalance),
            tranboxBalance: parseInt(tranboxBalance),
            cellphoneCharge: parseInt(cellphoneCharge),
            cellphoneCondition: phonCond,
            cellphoneObservation: cellphoneObservation,
            furnitureCleanConditions: parseInt(furnitureCleanConditions),
            installationState: instState,
            installationStateObservation: installationStateObservation,
            sellerId: currentAccounting?.sellerId!,
            accountingId: currentAccounting?.accountingId!
        }

        await createCheckList(body)
            .then((res) => {
                setSubmitStatus(successfullRequest)
            })
            .catch(() => {
                setSubmitStatus(failedRequest)                
            })

    }

    if (loadInfostatus.onLoading) {
        return (
            <div className="w-full h-52 m-8 flex items-center justify-center">
                <Spinner bgBlank />
            </div>
        )
    }

    return (
        <form action="" onSubmit={handleSubmit}>
            <div className="w-full m-8 flex flex-col items-center">
                {
                    submitstatus.onSuccess &&
                    <div className="flex flex-col items-center justify-center w-1/3 text-base font-normal border border-mp-dark rounded border-opacity-20 m-4 p-2">
                        <BiError color="green" size={30} />
                        <p className="text-mp-dark text-center">Tu check list se guardo exitosamente, presiona el boton de continuar para terminar tu registro.
                            Recuerda tomar captura de pantalla y compartirla en el grupo</p>
                    </div>
                }
                <Image src="/mp_logo.png" width={60} height={35} alt='mp logo' className='m-2' />
                <p className="text-2xl text-mp-soft-dark font-semibold">CHECK LIST CAMBIO DE TURNO</p>
                <div className="flex flex-row w-3/6 p-2 shadow-sm bg-mp-strong-gray rounded items-center justify-between">
                    <select name="checkType" id="checkType" className="font-medium text-mp-dark w-1/3 rounded focus:border-none bg-none">
                        <option value="CHECK_IN">ENTRADA</option>
                        <option value="CHECK_OUT">SALIDA</option>
                    </select>
                    <p className="w-1/6 text-mp-green font-medium">{DateFormat(currentAccounting?.date!)}</p>
                    <p className="text-mp-dark">TURNO: {currentAccounting?.seller}</p>
                </div>
                <div className="rounded-sm shadow-sm w-3/6 flex flex-row justify-between m-2">
                    <div className="flex flex-row w-1/3 items-center justify-between">
                        <p className="text-mp-dark">DINERO EN CAJA (ABAJO)</p>
                        <input
                            type="number"
                            id="cashBalance"
                            name="cashBalance"
                            className="rounded-lg border border-mp-dark border-opacity-40 text-mp-green font-semibold p-2 text-sm w-2/6"
                            placeholder="Saldo"
                        />
                    </div>
                    <div className="flex flex-row w-1/3 items-center justify-between">
                        <p className="text-mp-dark">SALDO EN PRONTIPAGOS</p>
                        <input
                            type="number"
                            name="tranboxBalance"
                            id="tranboxBalance"
                            className="rounded-lg border border-mp-dark border-opacity-40 text-mp-green font-semibold p-2 text-sm w-2/6"
                            placeholder="Saldo"
                        />
                    </div>
                </div>
                <div className="flex flex-row w-3/6 p-2 shadow-sm bg-mp-strong-gray rounded items-center justify-start mt-4">
                    <p className="w-4/6 font-medium text-mp-dark">CONDICIONES DE CELULAR</p>
                </div>
                <div className="rounded-sm shadow-sm w-3/6 flex flex-row justify-between m-2">
                    <div className="flex flex-row w-1/3 items-center justify-between text-mp-green">
                        <p className="text-mp-dark">CARGA CELULAR % </p>
                        <BiBattery />
                        <input
                            type="number"
                            id="cellphoneCharge"
                            name="cellphoneCharge"
                            className="rounded-lg border border-mp-dark border-opacity-40 text-mp-green font-semibold p-2 text-sm w-1/6"
                            placeholder="%"
                        />
                    </div>
                    <div className="flex flex-row w-1/3 items-center justify-between">
                        <p className="text-mp-dark"></p>
                        <p className="text-mp-green font-semibold"></p>
                    </div>
                </div>
                <div className="rounded-sm shadow-sm w-3/6 flex flex-row justify-between m-2">
                    <div className="flex flex-row w-1/3 items-center justify-between">
                        <p className="text-mp-dark">ESTADO OK?</p>
                        <input
                            type="checkbox"
                            id="cellphoneCondition"
                            name="cellphoneCondition"
                            className="rounded-lg border border-mp-dark border-opacity-40 text-mp-green font-semibold p-2 text-sm w-1/6"
                        />
                    </div>
                    <div className="flex flex-row w-2/3 items-center justify-center">
                        <p className="text-mp-dark w-1/3 ml-8 border-r-2">OBSERVACIONES</p>
                        <input
                            type="text"
                            id="cellphoneObservation"
                            name="cellphoneObservation"
                            className="rounded-lg border border-mp-dark border-opacity-10 text-mp-green ml-2 font-semibold p-2 text-sm w-full"
                            placeholder=""
                            defaultValue=""
                        />
                    </div>
                </div>
                <div className="flex flex-row w-3/6 p-2 shadow-sm bg-mp-strong-gray rounded items-center justify-start mt-4">
                    <p className="w-4/6 font-medium text-mp-dark">CONDICIONES DEl MOBILIARIO Y EQUIPO</p>
                </div>
                <div className="flex flex-row w-1/2 items-center justify-between shadow-sm">
                    <p className="text-mp-dark mr-7">LIMPIEZA (ESTANTES, VITRINAS Y PISO)</p>
                    <div className="flex flex-row justify-end">
                        <>
                            <label htmlFor="" className="m-2">BIEN</label>
                            <input type="radio" name="furnitureCleanConditions" id="furnitureCleanConditions" className="mr-8" value={1} />
                        </>
                        <>
                            <label htmlFor="" className="m-2">REGULAR</label>
                            <input type="radio" name="furnitureCleanConditions" id="furnitureCleanConditions" className="mr-8" value={2} />
                        </>
                        <>
                            <label htmlFor="" className="m-2">MAL</label>
                            <input type="radio" name="furnitureCleanConditions" id="furnitureCleanConditions" className="mr-8" value={3} defaultChecked />
                        </>
                    </div>
                </div>
                <div className="rounded-sm shadow-sm w-3/6 flex flex-row justify-between m-2">
                    <div className="flex flex-row w-1/3 items-center justify-between">
                        <p className="text-mp-dark">ESTADO OK?</p>
                        <input
                            type="checkbox"
                            id="installationState"
                            name="installationState"
                            className="rounded-lg border border-mp-dark border-opacity-40 text-mp-green font-semibold p-2 text-sm w-1/6"
                        />
                    </div>
                    <div className="flex flex-row w-2/3 items-center justify-center">
                        <p className="text-mp-dark w-1/3 ml-8 border-r-2">OBSERVACIONES</p>
                        <input
                            type="text"
                            id="installationStateObservation"
                            name="installationStateObservation"
                            className="rounded-lg border border-mp-dark border-opacity-10 text-mp-green ml-2 font-semibold p-2 text-sm w-full"
                            placeholder=""
                            defaultValue=""
                        />
                    </div>
                </div>
                <div className="w-3/6 flex flex-row justify-center m-6">
                    <button
                        className="rounded bg-mp-dark text-mp-white p-2 hover:bg-mp-soft-dark w-1/4 m-2"
                        type="submit"
                    >
                        {
                            submitstatus.onLoading ? <Spinner /> : 'Guardar'
                        }
                    </button>
                    {
                        submitstatus.onSuccess &&
                        <button
                            className="rounded bg-mp-green text-mp-white p-2 hover:bg-mp-light-green w-1/4 m-2"
                            type="submit"
                        >
                            Continuar
                        </button>
                    }
                </div>
            </div>
        </form>
    )
}
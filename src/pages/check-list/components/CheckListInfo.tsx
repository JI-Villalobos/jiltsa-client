'use client'

import Spinner from "@/components/Spinner"
import { failedRequest, initialStatus, pendingRequest, successfullRequest } from "@/services"
import { getTotalBalance, TotalBalance } from "@/services/api/branches"
import { CreateCheckList, createCheckList } from "@/services/api/checklist"
import { CurrentAccounting, deleteAccounting, getCheckMode, getCurrentAccounting, getUserCredentials, setCheckMode } from "@/utils/appStorage"
import DateFormat from "@/utils/DateFormat"
import localDateFormat from "@/utils/localDateTime"
import Image from "next/image"
import { useRouter } from "next/router"
import { KeyboardEvent, useEffect, useState } from "react"
import { BiError, BiBattery } from "react-icons/bi"

export default function CheckListInfo (): JSX.Element {
    const [loadInfostatus, setLoadInfoStatus] = useState(initialStatus)
    const [submitstatus, setSubmitStatus] = useState(initialStatus)
    const [matchedBalance, setMatchedBalance] = useState(true)
    const [currentAccounting, setCurrentAccounting] = useState<CurrentAccounting>()
    const [balance, setBalance] = useState<TotalBalance>()
    const [mode, setMode] = useState('CHECK_IN')
    const router = useRouter()

    useEffect(() => {
        setLoadInfoStatus(pendingRequest)
        const checkMode = getCheckMode()
        setMode(checkMode)
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
        }
    }, [])

    const matchBalance = (counted: number): boolean => {
        if (balance) {
            return balance.totals == counted
        } else {
            return false
        }
    }

    const handleRedirect = () => {
        if (mode == "CHECK_OUT") {
            deleteAccounting()
            router.push("/seller-home")
        }

        router.push("/seller-home")
    }

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

        if (matchBalance(parseInt(cashBalance))) {
            await createCheckList(body)
                .then((res) => {
                    setSubmitStatus(successfullRequest)
                    setMatchedBalance(true)
                    setCheckMode(mode)
                })
                .catch(() => {
                    setSubmitStatus(failedRequest)
                })
        } else {
            setMatchedBalance(false)
            setSubmitStatus(initialStatus)
        }

    }

    if (loadInfostatus.onLoading) {
        return (
            <div className="w-full h-52 m-8 flex items-center justify-center">
                <Spinner bgBlank />
            </div>
        )
    }

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          e.preventDefault();
        }
      };

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
                {
                    matchedBalance == false &&
                    <div className="flex flex-col items-center justify-center w-1/3 text-base font-normal border border-mp-error rounded border-opacity-20 m-4 p-2">
                        <BiError color="red" size={30} />
                        <p className="text-mp-dark text-center">
                            El saldo que ingresaste no coincide con el monto que el sistema tiene registrado.
                            Revisa que los datos sean correctos.
                        </p>
                    </div>
                }
                <Image src="/mp_logo.png" width={60} height={35} alt='mp logo' className='m-2' />
                <p className="text-2xl text-mp-soft-dark font-semibold">CHECK LIST CAMBIO DE TURNO</p>
                <div className="flex flex-col w-1/6 m-4 border border-mp-green rounded border-opacity-60 items-center justify-center">
                    <label htmlFor="checkType" className="text-mp-green">Selecciona Entrado o Salida</label>
                    <select name="checkType" id="checkType"
                        className="font-medium text-mp-dark w-2/3 m-1 border border-mp-dark border-opacity-30 p-2 rounded focus:border-none bg-none"
                        onChange={(e) => { setMode(e.currentTarget.value) }}
                        defaultValue={mode}
                    >
                        <option value="CHECK_IN">ENTRADA</option>
                        <option value="CHECK_OUT">SALIDA</option>
                    </select>
                </div>
                <div className="flex flex-row w-3/6 p-2 shadow-sm bg-mp-strong-gray rounded items-center justify-between">

                    <p className="w-1/6 text-mp-green font-medium">{DateFormat(currentAccounting?.date!)}</p>
                    <p className="text-mp-dark">TURNO: {currentAccounting?.seller}</p>
                </div>
                <div className="rounded-sm shadow-md w-3/6 flex flex-row justify-between m-2">
                    <div className="flex flex-row w-1/3 items-center justify-between">
                        <p className="text-mp-dark p-1">DINERO EN CAJA (ABAJO)</p>
                        <input
                            type="number"
                            id="cashBalance"
                            name="cashBalance"
                            className="rounded-lg border border-mp-dark border-opacity-40 text-mp-green font-semibold p-2 text-sm w-2/6"
                            placeholder="Saldo"
                        />
                    </div>
                    <div className="flex flex-row w-1/3 items-center justify-between">
                        <p className="text-mp-dark p-1">SALDO EN PRONTIPAGOS</p>
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
                <div className="rounded-sm shadow-md w-3/6 flex flex-row justify-between m-2">
                    <div className="flex flex-row w-1/3 items-center justify-between text-mp-green">
                        <p className="text-mp-dark p-1">CARGA CELULAR % </p>
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
                <div className="rounded-sm shadow-md w-3/6 flex flex-row justify-between m-2">
                    <div className="flex flex-row w-1/3 items-center justify-between">
                        <p className="text-mp-dark p-1">ESTADO OK?</p>
                        <input
                            type="checkbox"
                            id="cellphoneCondition"
                            name="cellphoneCondition"
                            className="rounded-lg border border-mp-dark border-opacity-40 text-mp-green font-semibold p-2 text-sm w-1/6"
                            onKeyDown={handleKeyPress}
                            onKeyUp={handleKeyPress}
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
                <div className="flex flex-row w-1/2 items-center justify-between shadow-md">
                    <p className="text-mp-dark mr-7 p-1">LIMPIEZA (ESTANTES, VITRINAS Y PISO)</p>
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
                <div className="rounded-sm shadow-md w-3/6 flex flex-row justify-between m-2">
                    <div className="flex flex-row w-1/3 items-center justify-between">
                        <p className="text-mp-dark p-1">ESTADO OK?</p>
                        <input
                            type="checkbox"
                            id="installationState"
                            name="installationState"
                            className="rounded-lg border border-mp-dark border-opacity-40 text-mp-green font-semibold p-2 text-sm w-1/6"
                            onKeyDown={handleKeyPress}
                            onKeyUp={handleKeyPress}
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
                        disabled={submitstatus.onSuccess}
                    >
                        {
                            submitstatus.onLoading ? <Spinner /> : 'Guardar'
                        }
                    </button>
                    {
                        submitstatus.onSuccess &&
                        <button
                            className="rounded bg-mp-green text-mp-white p-2 hover:bg-mp-light-green w-1/4 m-2"
                            type="button"
                            onClick={handleRedirect}
                        >
                            Continuar
                        </button>
                    }
                </div>
            </div>
        </form>
    )
}
'use client'

import { useEffect, useState } from "react";
import Layout from "@/app/layouts/Layout";
import { LuFolder, LuInbox, LuLoaderCircle } from "react-icons/lu";
import DateFormat from "@/utils/DateFormat";
import { CurrentAccounting, getCurrentAccounting } from "@/utils/appStorage";
import { Accounting, getAccounting } from "../services/api/accounts";
import { failedRequest, initialStatus, pendingRequest, successfullRequest } from "../services";
import IncomeSummary from "./components/IncomesSummary";
import ExpensesSummary from "./components/ExpensesSummary";
import CashWSummary from "./components/CashWSummary";
import Modal from "../components/shared/Modal";
import ConfirmSummary from "./components/ConfirmSummary";
import { SummarySkeleton } from "./components/SummarySkeleton";
import Cookies from "js-cookie";
import { getTotalBalance } from "../services/api/branches";
import { formatAmount } from "@/utils/formatAmount";

export default function CloseOperation(): JSX.Element {
    const [currentAccounting, setCurrentAccounting] = useState<CurrentAccounting>()
    const [getAccountStatus, setGetAccountStatus] = useState(initialStatus)
    const [account, setAccount] = useState<Accounting>()
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const [totals, setTotals] = useState<string>()
    const [balanceStatus, setBalanceStatus] = useState(initialStatus)

    useEffect(() => {
        const accounting = getCurrentAccounting()
        const branchId = Cookies.get('branchId')
        if (!accounting || !branchId) return
        setGetAccountStatus(pendingRequest)
        getAccounting(accounting.accountingId)
            .then((res) => {
                setAccount(res)
                setGetAccountStatus(successfullRequest)
            })
            .catch(() => {
                setGetAccountStatus(failedRequest)
            })
        getTotalBalance(parseInt(branchId)).then((result) => {
            setTotals(formatAmount(result.totals))
            setBalanceStatus(successfullRequest)
        }).catch(() => {
            setBalanceStatus(failedRequest)
        })
        setCurrentAccounting(accounting)
    }, [])

    return (
        <Layout>
            <div className="mt-10 w-full flex flex-col justify-center items-center">
                <p className="mb-2 text-mp-dark text-xl">Cierre de caja <span className="text-mp-blue">{currentAccounting ? DateFormat(currentAccounting.date) : ''}</span></p>
                {
                    getAccountStatus.onLoading ? <SummarySkeleton /> :
                        <div className="flow-root w-2/3 mb-6">
                            <dl className="divide-y divide-mp-strong-gray text-sm border border-mp-strong-gray rounded shadow">
                                <div className="grid gap-1 p-3 grid-cols-3 bg-mp-green rounded-t">
                                    <dt className="text-mp-white font-bold col-span-3">Resumen de corte</dt>
                                </div>
                                <div className="grid gap-1 p-3 grid-cols-4 sm:gap-4 bg-mp-gray-soft font-bold">
                                    <dt className="text-mp-green flex items-center gap-1"> <LuFolder /> Corte</dt>

                                    <dd className="text-mp-blue sm:col-span-1">2045</dd>

                                    <dt className=" text-mp-green flex items-center gap-1"><LuInbox />Saldo en caja </dt>

                                    <dd className="text-mp-blue sm:col-span-1">
                                        {
                                            balanceStatus.onLoading ? <LuLoaderCircle className="animate-spin"/> : totals
                                        }
                                    </dd>
                                </div>

                                <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-mp-dark">Vendedora</dt>

                                    <dd className="text-mp-blue sm:col-span-2">{currentAccounting?.seller}</dd>
                                </div>

                                {
                                    account &&
                                    <IncomeSummary incomes={account.incomeRegistries} />
                                }

                                {
                                    account &&
                                    <ExpensesSummary expenses={account.expenseRegistries} />
                                }
                            </dl>
                        </div>

                }
                <CashWSummary />
                <button
                    className="mt-4 text-mp-white p-2 rounded shadow bg-gradient-to-r from-mp-green to-mp-blue"
                    onClick={() => setShowConfirmationModal(true)}
                >
                    Terminar
                </button>
            </div>
            {
                showConfirmationModal &&
                <Modal onClose={() => setShowConfirmationModal(false)}>
                    <ConfirmSummary setShowModal={setShowConfirmationModal} />
                </Modal>
            }
        </Layout>
    )
}
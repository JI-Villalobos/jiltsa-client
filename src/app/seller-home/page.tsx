'use client'

import SessionInfo from "@/app/components/SessionInfo";
import CloseOperationButton from "@/app/components/shared/CloseOperationButton";
import Error from "@/app/components/shared/Error";
import Skeleton from "@/app/components/Skeleton";
import TableReport from "@/app/components/TableReport";
import Layout from "@/app/layouts/Layout";
import { failedRequest, initialStatus, pendingRequest, RequestStatus, successfullRequest } from "@/app/services";
import { Accounting, getLatestRegistries } from "@/app/services/api/accounts";
import { CurrentAccounting, getBranchId, getCurrentAccounting } from "@/utils/appStorage";
import { useEffect, useState } from "react";
import { isAuth } from "../hoc/isAuth";
import { LuReceipt, LuWalletCards } from "react-icons/lu";
import Modal from "../components/shared/Modal";
import { NewExpenseModal } from "./components/NewExpenseModal";

function SellerHome(): JSX.Element {
  const [status, setStatus] = useState<RequestStatus>(initialStatus)
  const [accounts, setAccounts] = useState<Accounting[]>([])
  const [showExpenseModal, setShowExpenseModal] = useState(false)
  const [currentAccount, setCurrentAccount] = useState<CurrentAccounting>()
  //const [showCashWithdrawalModal, setShowCashWithdrawalModal] = useState(false)

  useEffect(() => {
    const branchId = getBranchId()
    const account = getCurrentAccounting()
    setCurrentAccount(account)
    if (branchId) {
      setStatus(pendingRequest)
      getLatestRegistries(branchId).then((result) => {
        setAccounts(result)
        setStatus(successfullRequest)
      }).catch(() => {
        setStatus(failedRequest)
      })
    }
  }, [])

  return (
    <Layout>
      <>
        <SessionInfo />

        {
          currentAccount &&
          <div className="w-1/2 flex flex-row justify-center gap-4">
            <CloseOperationButton />
            <button
              className="rounded p-2 bg-mp-green text-mp-white text-sm flex flex-row items-center transition-all hover:bg-mp-light-green"
              onClick={() => setShowExpenseModal(true)}
            >
              <LuReceipt />
              Nuevo Gasto
            </button>
            <button className="rounded p-2 bg-mp-green text-mp-white text-sm flex flex-row items-center transition-all hover:bg-mp-light-green">
              <LuWalletCards />
              Nuevo Deposito
            </button>
          </div>
        }
        <p className='mt-2 text-xl text-mp-dark'>Actividad Reciente:</p>
        {status.onLoading ? <Skeleton /> : status.onError ? <Error /> : <TableReport accounts={accounts} />}
      </>
      {
        showExpenseModal &&
        <Modal onClose={() => setShowExpenseModal(false)}>
          <NewExpenseModal />
        </Modal>
      }
    </Layout>
  )
}

export default isAuth(SellerHome)
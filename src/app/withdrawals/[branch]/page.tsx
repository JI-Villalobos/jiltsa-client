'use client'

import ErrorMessage from "@/app/components/shared/ErrorMessage";
import Pagination from "@/app/components/shared/Pagination";
import Spinner from "@/app/components/shared/Spinner";
import Layout from "@/app/layouts/Layout";
import { failedRequest, initialStatus, pendingRequest, RequestStatus, successfullRequest } from "@/app/services";
import { getLatestCashRegistries, PageCashWithdrawal } from "@/app/services/api/withdrawals";
import { conceptList, WithdrawalStages } from "@/utils/variables";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CashWithdrawalTable } from "../components/CashWithdrawalsTable";
import SessionInfo from "@/app/components/SessionInfo";
import { NewCashWithdrawalModal } from "@/app/seller-home/components/NewCashWithdrawalModal";
import { LuWalletCards } from "react-icons/lu";
import Modal from "@/app/components/shared/Modal";
import { defaullWithdrawal, useWithdrawalRegistryStore } from "@/app/store/useWithdrawalRegistryStore";


export default function BranchWithdrawals(): JSX.Element {
  const [status, setStatus] = useState<RequestStatus>(initialStatus)
  const [page, setPage] = useState<PageCashWithdrawal>()
  const [pageNumber, setPageNumber] = useState(0)
  const [showCashWithdrawalModal, setShowCashWithdrawalModal] = useState(false)

  const { setWithdrawal, setStage: setWithdrawalStage, updateFlag } = useWithdrawalRegistryStore()

  const params = useParams<{ branch: string }>()

  useEffect(() => {
    setStatus(pendingRequest)
    if (typeof params?.branch === 'string') {
      getLatestCashRegistries(params.branch, pageNumber)
        .then((result) => {
          setPage(result)
          setStatus(successfullRequest)
        })
        .catch(() => {
          setStatus(failedRequest)
        })
    }
  }, [pageNumber, updateFlag])

  return (
    <Layout>
      <div className="mt-1 w-full flex flex-col items-center justify-center">
        <SessionInfo />
        <div className="w-full flex flex-row gap-4 justify-center items-center mb-2">
          <p className="text-sm text-mp-green m-2 font-semibold">Registro de retiros y depositos sucursal: <span className="text-mp-blue">{params?.branch}</span></p>
          <button
            className="rounded p-2 bg-mp-green text-mp-white text-sm flex flex-row items-center transition-all hover:bg-mp-light-green"
            onClick={() => setShowCashWithdrawalModal(true)}
          >
            <LuWalletCards />
            Nuevo Deposito
          </button>
        </div>
        {
          status.onLoading ? <Spinner bgBlank /> :
            status.onError ? <ErrorMessage
              title="Error"
              description="No fue posible cargar el registro de retiros, intentalo más tarde"
            /> :
              <></>
        }
        {
          page && <CashWithdrawalTable page={page} />
        }
        <div className="m-2">
          {
            page && <Pagination setNumberPage={setPageNumber} pages={page.totalPages} currentPage={pageNumber} />
          }
        </div>
      </div>
      {
        showCashWithdrawalModal &&
        <Modal onClose={() => {
          setWithdrawalStage(WithdrawalStages.SELECT_WITHDRAWAL_STAGE)
          setWithdrawal(defaullWithdrawal)
          setShowCashWithdrawalModal(false)
        }}>
          <NewCashWithdrawalModal />
        </Modal>
      }
    </Layout>
  )
}

/**
<div className="grid grid-cols-1 lg:grid-cols-4 w-1/2 p-1 bg-mp-green m-1 rounded text-mp-white">
          <div className="rounded-lg ">Fecha</div>
          <div className="rounded-lg ">Concepto</div>
          <div className="rounded-lg ">Monto</div>
          <div className="rounded-lg ">Registrado Por</div>
        </div>
        {
          status.onLoading ? <Spinner bgBlank />
            : page ?
              (page.content.map((cashWithdrawal) => (
                <div className="grid grid-cols-1 lg:grid-cols-4 w-1/2 p-1 border border-mp-gray-soft m-1" key={`cash-w-id-${cashWithdrawal.id}`}>
                  <div className="text-mp-green text-sm">{DateFormat(cashWithdrawal.date!)}</div>
                  <div
                    className={
                      cashWithdrawal.concept == conceptList[0] ?
                        `text-mp-white bg-mp-dark rounded-sm text-center text-sm w-2/3`
                        : match(cashWithdrawal.concept) ?
                          `text-mp-white bg-mp-blue rounded-sm text-center text-sm w-2/3`
                          : `text-mp-white bg-mp-soft-dark rounded-sm text-center text-sm w-2/3`

                    }
                  >
                    {cashWithdrawal.concept}
                  </div>
                  <div className="text-mp-blue text-sm">{formatAmount(cashWithdrawal.amount)}</div>
                  <div className="text-mp-dark text-sm">{cashWithdrawal.sellerName}</div>
                </div>
              )))
              : <ErrorMessage
                title="Error"
                description="No fue posible cargar el registro de retiros, intentalo más tarde"
              />
        }
     
 */
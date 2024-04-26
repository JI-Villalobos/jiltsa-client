import { useEffect, useState } from "react"
import ExpenseDetail from "./ExpenseDetail"
import ExpenseTicket from "./ExpenseTicket"
import { ExpenseType, getExpenseTypes } from "@/services/api/collections"
import { RequestStatus, failedRequest, initialStatus, pendingRequest, successfullRequest } from "@/services"
import Spinner from "./Spinner"
import ExpenseTypeItem from "./ExpenseTypeItem"
import { CreateExpenseRegistry, createExpense } from "@/services/api/expenses"
import { CurrentAccounting, getCurrentAccounting } from "@/utils/appStorage"
import { useRouter } from "next/router"

export default function NewExpense(): JSX.Element {
  const [selectedItem, setSelectedItem] = useState<boolean>(false)
  const [item, setItem] = useState<string>('')
  const [expenseTypes, setExpenseTypes] = useState<ExpenseType[]>([])
  const [successTransition, setSuccessTransition] = useState<boolean>(false)
  const [status, setStatus] = useState<RequestStatus>(initialStatus)
  const [expense, setExpense] = useState<CreateExpenseRegistry>({ accountingId: 0, amount: 0, description: '', expenseTypeId: 1 })
  const [currentAccount, setCurrentAccount] = useState<CurrentAccounting>({ accountingId: 0, seller: '' })

  const router = useRouter()

  useEffect(() => {
    setStatus(pendingRequest)
    const accounting = getCurrentAccounting()
    if (accounting) {
      setCurrentAccount(accounting)
      setExpense({ ...expense, accountingId: accounting.accountingId })
    }
    getExpenseTypes()
      .then((result) => {
        setExpenseTypes(result)
        setStatus(successfullRequest)
      })
      .catch(() => {
        setStatus(failedRequest)
      })
  }, [])

  const handleNewExpense = async (e: React.FormEvent<HTMLButtonElement>) => {
    setStatus({ ...status, onLoading: true })
    e.preventDefault()

    await createExpense(expense)
      .then(() => {
        setStatus({ ...status, onLoading: false })
        setTimeout(() => {
          setSuccessTransition(false)
          setSelectedItem(false)
        }, 2000)
        setSuccessTransition(true)
      })
      .catch(() => {
        setStatus({ ...status, onError: true, onLoading: false })
      })
  }

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-row w-full">
        <div className=" flex flex-col w-1/3 justify-center items-center border-r-2 border-mp-strong-gray">
          <p className="text-sm text-mp-dark font-coda">{selectedItem ? 'Gasto seleccionado:' : 'Selecciona el tipo de gasto:'}</p>
          {
            status.onLoading ? <Spinner bgBlank />
              : status.onError ? <p className="text-sm text-mp-error font-coda">No fue Posible Cargar los tipos de gastos</p>
                : selectedItem ? <p className="text-xl text-mp-dark font-coda">{item}</p>
                  : expenseTypes.map((expenseType) => (
                    <ExpenseTypeItem
                      expenseType={expenseType}
                      key={`expense-type-id-${expenseType.id}`}
                      expense={setExpense}
                      expenseDetails={expense}
                      isSelected={setSelectedItem}
                      item={setItem}
                    />
                  ))
          }
        </div>
        {
          successTransition ? (
            <div className="flex flex-col justify-center items-center w-1/3">
              <p className="text-sm text-mp-light-green font-coda text-center">Registro exitoso, redireccionando</p>
              <Spinner bgBlank />
            </div>)
            : (<ExpenseDetail expenseDetails={expense} expense={setExpense} />)
        }

        <ExpenseTicket currentAccounting={currentAccount} expense={expense} />
      </div>
      <button
        className="bg-mp-dark rounded text-mp-gray-soft w-32 mb-6"
        onClick={handleNewExpense}
        disabled={status.onLoading}
      >
        {status.onLoading ? <Spinner /> : 'Registrar'}
      </button>
      {status.onError && (<p className="text-sm text-mp-error font-coda text-center">No fue posible registrar el gasto, revisa que los daos sean correctos</p>)}
    </div>
  )
}
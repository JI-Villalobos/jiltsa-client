import { RequestStatus, initialStatus } from "@/services"
import { ExpenseType } from "@/services/api/collections"
import { CreateExpenseRegistry } from "@/services/api/expenses"
import { Dispatch, SetStateAction, useState } from "react"

type Props = {
  expenseType: ExpenseType,
  isSelected: Dispatch<SetStateAction<boolean>>
  item: Dispatch<SetStateAction<string>>
  expense: Dispatch<SetStateAction<CreateExpenseRegistry>>,
  expenseDetails: CreateExpenseRegistry
}

export default function ExpenseTypeItem({ expenseType, isSelected, item, expense, expenseDetails }: Props): JSX.Element {
  const [status, setStatus] = useState<RequestStatus>(initialStatus)
  const [expenseTypes, setExpenseTypes] = useState<ExpenseType[]>([])

  return (
   <div className="flex flex-row items-center justify-center w-full ml-2">
     <select
      name="searchBy"
      id="searchBy"
      className="w-full rounded-lg border-mp-soft-dark bg-mp-gray-soft text-mp-soft-dark p-4 pe-12 text-sm shadow-sm"
      
     >
      <option value=''>Selecciona El tipo de gasto</option>
     </select>
   </div>
  )
}

/**
 * <input 
      type="button" 
      value={expenseType.type} 
      placeholder="Sueldos" 
      className="bg-mp-dark rounded w-3/4 h-8 border-none text-sm text-mp-gray-soft mb-2 hover:cursor-pointer"
      onClick={() => {
        expense({...expenseDetails, expenseTypeId: expenseType.id})
        item(expenseType.type)
        isSelected(true)
      }} 
    />
 */
import { ExpenseType } from "@/services/api/collections"
import { CreateExpenseRegistry } from "@/services/api/expenses"
import { Dispatch, SetStateAction } from "react"

type Props = {
  expenseType: ExpenseType,
  isSelected: Dispatch<SetStateAction<boolean>>
  item: Dispatch<SetStateAction<string>>
  expense: Dispatch<SetStateAction<CreateExpenseRegistry>>,
  expenseDetails: CreateExpenseRegistry
}

export default function ExpenseTypeItem({ expenseType, isSelected, item, expense, expenseDetails }: Props): JSX.Element {
  return (
   <div className="flex flex-row items-center justify-center w-full ml-2">
     <input 
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
   </div>
  )
}
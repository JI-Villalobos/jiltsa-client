'use client'

import { Bill } from "@/services/api/billing"
import { useRouter } from "next/router"

interface Props {
  bill: Bill
}

export default function showDetailsBill({ bill }: Props): JSX.Element {
  const router = useRouter()
  return (
    <div className="fixed inset-0 bg-mp-soft-dark bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="p-8 border w-96 shadow-lg rounded-md bg-white">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-mp-dark">Modal Title</h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-lg text-mp-dark">{bill.branch}</p>
          </div>
          <div className="flex justify-center mt-4">

    
            <button
              onClick={router.back}
              className="px-4 py-2 bg-mp-blue text-white text-base font-medium rounded-md shadow-sm hover:bg-mp-soft-dark focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Close
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}
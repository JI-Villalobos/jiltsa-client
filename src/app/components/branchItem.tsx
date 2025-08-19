import Link from "next/link"
import { Branch } from "../services/api/branches"

type Props = {
  branch: Branch
}

/**
 * @deprecated this component will be reoved soon 
 */
export default function BranchItem({ branch }: Props) {
  return (
    <Link 
      href={`/account-branch/${branch.id}`} 
      className="bg-mp-dark rounded text-center text-mp-gray-soft hover:bg-mp-soft-dark w-1/3 m-2"
    >
      {branch.name}
    </Link>
  )
}
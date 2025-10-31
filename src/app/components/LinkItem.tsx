'use client'

import Link from "next/link"


type Props = {
  path: string
  icon: React.ReactNode
  name: string
}

export default function LinkItem({ path, icon, name }: Props): JSX.Element {

  return (
    <Link className='flex flex-row mt-4 hover:bg-mp-gray-soft justify-center items-center w-full' href={path}>
      { icon }
      <p className="text-mp-green text-xs p-2 lg:w-3/4 lg:hidden md:hidden xl:block">{name}</p>
    </Link>
  )
}
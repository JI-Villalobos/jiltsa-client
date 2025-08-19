'use client'

import Image from "next/image"
import Link from "next/link"


type Props = {
  path: string
  icon: string
  name: string
}

export default function LinkItem({ path, icon, name }: Props): JSX.Element {

  return (
    <Link className='flex flex-row mt-4 hover:bg-mp-soft-dark justify-center' href={path}>
      <p className="font-coda text-mp-gray-soft text-xs p-2 lg:w-3/4 lg:hidden md:hidden xl:block">{name}</p>
      <Image src={icon} alt='' width={20} height={20} />
    </Link>
  )
}
import Image from "next/image"
import Link from "next/link"


type Props = {
  path: string
  icon: string
  name: string
}

export default function LinkItem({ path, icon, name }: Props): JSX.Element {

  return (
    <div className='flex flex-row mt-4 hover:bg-mp-soft-dark'>
      <Link href={path} className="font-coda text-mp-gray-soft text-sm p-2 w-3/4">{name}</Link>
      <Image src={icon} alt='' width={20} height={20} />
    </div>
  )
}
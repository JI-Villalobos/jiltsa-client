'use client'

import { deleteUserCredentials } from "@/utils/appStorage";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BiCode } from "react-icons/bi";

export default function Header(): JSX.Element {
  const router = useRouter()

  const handleLogout = () => {
    deleteUserCredentials()
    router.push("/")
  }


  return (
    <div className='flex flex-row bg-mp-gray-soft items-center justify-between w-full'>
      <Image src="/mp_logo.png" width={80} height={45} alt='mp logo' className='m-2' />
      <a href="https://checker-ear-0d6.notion.site/JILTSA-Manual-de-usuario-5382089db632443897a40d864dc3a903?pvs=4" target="_blank">
        <div className="flex flex-row justify-center items-center">
          <BiCode size={20}/>
          <p className="text-mp-dark text-sm">Versión 1.0.0</p>
        </div>
      </a>
      <button onClick={handleLogout}>
        <Image src="/logout.svg" width={30} height={30} alt='mp logo' className='m-2' />
      </button>
    </div>
  )
}
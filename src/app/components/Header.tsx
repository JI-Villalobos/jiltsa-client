'use client'

import { deleteUserCredentials } from "@/utils/appStorage";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BiCode } from "react-icons/bi";
import { LuLogOut } from "react-icons/lu";

export default function Header(): JSX.Element {
  const router = useRouter()

  const handleLogout = () => {
    deleteUserCredentials()
    router.push("/")
  }


  return (
    <header className='flex flex-row items-center justify-between w-full'>
      <nav className="w-full bg-mp-white backdrop-blur navbar shadow-sm border-b border-mp-soft-dark border-opacity-10">
        <div className="m-auto px-6 md:px-12 lg:px-6">
          <div className="flex flex-wrap items-center justify-between">
            <Image src="/mp_logo.png" width={80} height={40} alt='mp logo' className='m-2' />
            <div className="navmenu hidden w-full flex-wrap justify-end items-center mb-16 space-y-8 p-2 border border-gray-100 rounded-3xl shadow-2xl shadow-gray-300/20 bg-white dark:bg-gray-800 lg:space-y-0 lg:p-0 lg:m-0 lg:flex md:flex-nowrap lg:bg-transparent lg:w-7/12 lg:shadow-none dark:shadow-none dark:border-gray-700 lg:border-0">
              <div className="text-gray-600 dark:text-gray-300 lg:pr-4">
                <ul className="space-y-6 tracking-wide font-medium text-base lg:text-sm lg:flex lg:space-y-0 flex items-center justify-center">
                  <li className="flex flex-row justify-center items-center">
                    <BiCode size={20} />
                    <p className="text-mp-dark text-sm">Versión 1.0.0</p>
                  </li>
                  <li className="mr-6 ml-4 flex items-center justify-center">
                    <button onClick={handleLogout}>
                     <LuLogOut className="text-mp-strong-red"/>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

/**
 *  <Image src="/mp_logo.png" width={80} height={45} alt='mp logo' className='m-2' />
      <a href="https://checker-ear-0d6.notion.site/JILTSA-Manual-de-usuario-5382089db632443897a40d864dc3a903?pvs=4" target="_blank">
        <div className="flex flex-row justify-center items-center">
          <BiCode size={20}/>
          <p className="text-mp-dark text-sm">Versión 1.0.0</p>
        </div>
      </a>
      <button onClick={handleLogout}>
        <Image src="/logout.svg" width={30} height={30} alt='mp logo' className='m-2' />
      </button>
 */
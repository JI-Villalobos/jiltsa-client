import { deleteUserCredentials, getMode, setAdminRole, setLocalMode } from "@/utils/appStorage";
import Image from "next/image";
import { useRouter } from "next/router";
import DemoMode from "./shared/DemoMode";

export default function Header(): JSX.Element {
  const router = useRouter()
  const mode = getMode()

  const handleLogout = () => {
    deleteUserCredentials()
    router.push("/")
  }


  return (
    <div className='flex flex-row bg-mp-gray-soft items-center justify-between w-full'>
      <Image src="/mp_logo.png" width={60} height={35} alt='mp logo' className='m-2' />
      <a href="https://checker-ear-0d6.notion.site/JILTSA-Manual-de-usuario-5382089db632443897a40d864dc3a903?pvs=4" target="_blank">
        <div className="flex flex-row justify-center items-center">
          <Image src="/handbook.svg" width={25} height={25} alt='mp logo' className='m-2' />
          <p className="text-mp-dark text-sm">Versión 0.8.2</p>
        </div>
      </a>
      <DemoMode />
      <button onClick={handleLogout}>
        <Image src="/logout.svg" width={30} height={30} alt='mp logo' className='m-2' />
      </button>
    </div>
  )
}
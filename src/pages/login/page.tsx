import AsideLogin from "@/app/components/AsideLogin";
import LoginForm from "@/app/components/LoginForm";
import Image from "next/image";

export default function Login(): JSX.Element{
  return(
    <div className="flex flex-row">
      <div className="flex flex-col items-center justify-center w-1/2 h-screen">
        <Image src="/mp_logo.png" width={252} height={114} alt="mp store" className="m-6"/>
        <LoginForm />
      </div>
      <AsideLogin />
    </div>
  )
}
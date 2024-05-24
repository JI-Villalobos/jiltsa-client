import { getMode, setAdminRole, setLocalMode } from "@/utils/appStorage"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function DemoMode(): JSX.Element {
    const [mode, setMode] = useState('')
    const router = useRouter()

    useEffect(() => {
        const mode = getMode()
        console.log(mode);
        
        setMode(mode)
    }, [])


    const handleDemo = () => {
        setAdminRole()
        setLocalMode("NORMAL")
        router.push("/")
    }

    return (
        <>
            {
                mode == 'DEMO' ? 
                    <button
                        className="border border-mp-green p-1 rounded text-mp-green"
                        onClick={handleDemo}>
                        Salir de modo Demo
                    </button>
                : <></>    
            }
        </>
    )
}
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { getUserCredentials } from "@/utils/appStorage"

export function isAuth(Component: React.ComponentType<any>) {
    return function WrapedComponent(props: any) {
        let router = useRouter()
        useEffect(() => {
            const accessToken = getUserCredentials()
            if (!accessToken) {
                router.push("/login")
            }
        },  [])

        return <Component { ...props } />
    }
}
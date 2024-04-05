'use client'

import { useContext, useEffect } from 'react'
import { NextRouter, useRouter } from 'next/router'
import { AuthContext } from '@/context/AuthContext'
import Header from '@/components/Header'
import Spinner from '@/components/Spinner'
import { getUserCredentials } from '@/utils/appStorage'
import { Role } from '@/utils/variables'

export default function Home() {
  //const isAuth: boolean = useContext(AuthContext)

  const router: NextRouter = useRouter()

  useEffect(() => {
    const creds = getUserCredentials()
    /*if (!isAuth) {
      router.push("/login")
    }**/
    setTimeout(() => {
      if (creds) {
        if (creds.role === Role.USER) {
          router.push('/seller-home')
        } 
        if (creds.role === Role.ADMIN) {
          router.push("/admin")
        }
      } else {
        router.push('/login')
      }
    }, 1000)

  }, [])

  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <div className='flex h-full mt-20 justify-center'>
       <div className='flex flex-col items-center justify-center border border-mp-green rounded h-1/5 w-1/3'>
        <p className='text-mp-green font-semibold'>Revisando Credenciales..</p>
        <Spinner bgBlank/>
       </div>
      </div>
    </div>
  )
}

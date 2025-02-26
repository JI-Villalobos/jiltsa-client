'use client'

import { useEffect } from 'react'
import { NextRouter, useRouter } from 'next/router'
import Header from '@/components/Header'
import Spinner from '@/components/shared/Spinner'
import { getUserCredentials } from '@/utils/appStorage'
import { Role } from '@/utils/variables'

export default function Home() {
  
  const router: NextRouter = useRouter()

  useEffect(() => {
    const creds = getUserCredentials()
    setTimeout(() => {
      if (creds) {
        if (creds.token) {
          router.push('/seller-home')
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

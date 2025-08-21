'use client'

import { useEffect } from 'react'
import Header from '@/app/components/Header'
import Spinner from '@/app/components/shared/Spinner'
import { useRouter } from 'next/navigation'

export default function Home() {

  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.push('/seller-home')
    }, 1000)

  }, [])

  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <div className='flex h-full mt-20 justify-center'>
        <div className='flex flex-col items-center justify-center border border-mp-green rounded h-1/5 w-1/3'>
          <p className='text-mp-green font-semibold'>Revisando Credenciales..</p>
          <Spinner bgBlank />
        </div>
      </div>
    </div>
  )
}

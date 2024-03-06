import AsideMenu from "@/components/AsideMenu";
import Header from "@/components/Header";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <div className='flex flex-row'>
        <AsideMenu />
        <div className='flex flex-col items-center w-full mt-4'>
         {children}
        </div>
      </div>
    </div>
  )
} 
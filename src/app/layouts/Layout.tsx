import React from "react";
import Header from "../components/Header";
import AsideMenu from "../components/AsideMenu";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-row'>
      <AsideMenu />
      <div className='flex flex-col w-full'>
        <Header />
        <div className='flex flex-col items-center w-full'>
          {children}
        </div>
      </div>
    </div>
  )
} 
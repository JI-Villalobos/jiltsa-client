'use client'

import React from "react"
import ReactDOM from "react-dom"

interface Props {
    onClose: CallableFunction
    children: React.ReactNode
    title?: string 
}

const Modal = ({ children, onClose, title }: Props) => {
    const handleCloseClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        onClose()
    }


    const modalContent = (
        <div className="absolute top-0 left-0 w-full min-h-screen flex 
                        justify-center items-center bg-mp-soft-dark bg-opacity-30 z-50"
        >
            <div className="w-4/5 md:w-1/3 xl:full opacity-">
                <div className="bg-mp-white rounded">
                    <div className="flex content-end text-sm">
                        <button 
                            onClick={handleCloseClick} 
                            className="transition delay-150 duration-300 ease-in-out bg-gradient-to-r from-mp-green to-mp-blue w-10 h-10 rounded text-mp-white text-xl 
                                        m-2 hover:-translate-y-1 hover:scale-110"
                        >
                            x
                        </button>
                    </div>
                    <div className="flex flex-col justify-center w-full">
                        {title && <h1 className="text-cyan-900 text-xl text-center">{title}</h1>}
                    </div>
                    <div className="pt-3 w-full flex flex-col items-center">{children}</div>
                </div>
            </div>
        </div>
    )

    return ReactDOM.createPortal(
        modalContent,
        document.getElementById("modal-root")!
    )
}

export default Modal
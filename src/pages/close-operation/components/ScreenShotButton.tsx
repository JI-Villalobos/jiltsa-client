'use client'

import { MdCenterFocusWeak } from "react-icons/md";
import * as htmlToImage from 'html-to-image'
import { toJpeg, toBlob } from 'html-to-image'
import { Dispatch, SetStateAction } from "react";

interface Props {
    setSuccess: Dispatch<SetStateAction<string>>
}

export default function ScreenshotButton({ setSuccess }: Props): JSX.Element {

    const handleScreenShot = async () => {
        var node = document.getElementById('to-capture')
        
        if (node) {
            htmlToImage.toBlob(node)
                .then((blob) => {
                    try {
                        navigator.clipboard.write([
                            new ClipboardItem({
                                'image/png': blob!
                            })
                        ]);
                        setSuccess('true')
                    } catch (error) {
                        console.error(error);
                    }  
                })
                .catch((err) => {
                    setSuccess('false')
                })
        }
    }

    return(
        <button 
            className="bg-none border border-mp-blue rounded flex items-center text-xs flex-row p-4"
            onClick={handleScreenShot}    
        >
            <MdCenterFocusWeak />
            Captura de Pantalla 
        </button>
    )
}
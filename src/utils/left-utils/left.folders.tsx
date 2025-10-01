import { leftItems } from '@/types/left.types'
import MenuIcon from '@mui/icons-material/Menu';

import React from 'react'

function LeftFolders({props} : {props : {setOpen : Function}}) {
    return (
        <div className="menu shadow-2xl min-h-screen w-[85px] box-border flex flex-col gap-6 pt-4">

            <button className='cursor-pointer' onClick={() => props.setOpen()}><MenuIcon></MenuIcon></button>
            <div className='flex flex-col gap-3'>
                {
                    leftItems.map((el, index) => (
                        <div key={"folder_" + index} className='flex flex-col pl-1 py-1 rounded-2xl shadow-[1px_1px_10px_rgba(1,1,1,0.8)] cursor-pointer'>
                            <div className='rounded-full size-7 flex items-center justify-center'>
                                {el.icon}
                            </div>
                            <small>{el.label}</small>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default LeftFolders
import React from 'react'
import Person from "@mui/icons-material/Person"
import { SocketStoreType } from '@/service/socket.io'
import { User, useUserStore } from '@/store/user.store'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'

function LeftMenu({ props }: { props: {user : User | null ,setOpen: Function, isOpenMenu: boolean, socketStore: SocketStoreType } }) {
    const {resetUser} = useUserStore()
    const {user} = props
    const router = useRouter()
    const handleLogOut = () => {
        localStorage.removeItem("accessToken")
        resetUser()
        router.push("/sign")
    }
    return (
        <div onClick={() => props.setOpen(!props.isOpenMenu)} className={`path absolute w-[400px] min-h-screen border-r-2 shadow-2xl transition-all bg-white z-20 ${props.isOpenMenu ? "left-0" : "-left-[402px]"}`}>
            <div className='flex gap-4 p-6 inset-shadow-gray-200 shadow-2xl cursor-pointer items-end'>
                <div className='rounded-full shadow-[1px_1px_5px_rgba(1,1,1,0.8)] size-9 flex justify-center items-center overflow-hidden'>
                    {
                        user?.avatar ? <img src={user.avatar} alt="" /> : <Person fontSize='large'></Person>
                    }
                </div>
                <h1 className='text-transparent bg-gradient-to-l from-[rgba(139,19,187,0.8)] to-[rgba(141,12,12,0.8)] bg-clip-text hover:shadow-[0px_5px_2px_rgba(1,1,1,0.8)]'>{user?.firstName ? user.firstName : ""} {user?.lastName ? user?.lastName : ""}</h1>
            </div>
            <Button variant='contained' onClick={() => handleLogOut()}>Log out</Button>
        </div>
    )
}

export default LeftMenu
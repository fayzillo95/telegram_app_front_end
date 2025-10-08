import React, { useEffect, useState } from 'react'
import { useUserStore } from '@/store/user.store';
import {  LeftProps } from '@/types/left.types';

import { useRouter } from 'next/navigation';

function Left({props}: LeftProps){


  const {selectedChat,setMessages,setSlectedChat} = props
  const { user } = useUserStore()
  const router = useRouter()
  const [users, SetUsers] = useState<Record<string, any>[]>([])

  const setUser = (usersData: Record<string, any>[]) => SetUsers(usersData)

  return (
    <div className='w-full'>
    </div>
  )
}

export default Left
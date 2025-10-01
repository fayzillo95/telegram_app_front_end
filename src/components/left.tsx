import { Box, Button, List, ListItem, ListItemIcon, ListItemText, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { SocketStoreType } from '@/service/socket.io';
import { useUserStore } from '@/store/user.store';
import { getUsers } from '@/features/user.fetch';
import { createUserChat } from '@/features/userchats/api';
import {  LeftProps } from '@/types/left.types';
import RenderChats from '@/utils/left-utils/render.chats';
import LeftHeader from '@/utils/left-utils/left.header';
import LeftMenu from '@/utils/left-utils/left.menu';
import LeftFolders from '@/utils/left-utils/left.folders';
import { getMessages } from '@/features/messages/api';

function Left({props}: LeftProps){
  const {selectedChat,setMessages,setSlectedChat} = props
  const { user } = useUserStore()

  const [users, SetUsers] = useState<Record<string, any>[]>([])

  const setUser = (usersData: Record<string, any>[]) => SetUsers(usersData)

  const handleChatUser = async (userId: string) => {
    const test = await createUserChat(userId, {})
    const { chat, messages } = test
    setSlectedChat(chat)
    
    getMessages(chat.id,chat.type).then(res => setMessages(res)).catch(err => console.log(err))
  }

  useEffect(() => {
    getUsers(setUser)
  }, [])



  return (
    <div className='w-full'>
      <div className="flex relative">

        <LeftFolders props={{setOpen : props.setOpen}}/>
        <LeftMenu props={{ isOpenMenu: props.isOpenMenu, setOpen: props.setOpen, socketStore: props.socketStore, user: user }} />
        <div className="users w-full py-2 space-y-2.5 box-border relative z-0">

          <LeftHeader />
          <div className='w-full box-border'>
            <RenderChats props={{ handleChatUser: handleChatUser, users: users, user: user }} />
          </div>

        </div>

      </div>

    </div>
  )
}

export default Left
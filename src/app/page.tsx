"use client"

import Center from "@/components/center";
import Left from "@/components/left";
import Right from "@/components/right";
import { useSocketStore } from "@/service/socket.io";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/user.store";
import { MessageType } from "@/features/props.types/center.types";
import { getMyUser } from "@/features/users/api";
import { CircularProgress } from "@mui/material";

export default function Home() {
  const socketStore = useSocketStore()
  const router = useRouter()

  const { user, setUser, resetUser } = useUserStore()
  const [isOpenRightPanel, setIsOpenRightPane] = useState(false)
  const [isOpenLeftPanel, setIsOpenLeftPane] = useState(false)
  const [selectedChat, setSlectedChat] = useState<Record<string, any> | null>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)   // ✅ loading state

  const assOPenRight = () => setIsOpenRightPane(prev => !prev)
  const assOPenLeft = () => setIsOpenLeftPane(prev => !prev)
  const assinMessages = (data: any) => setMessages(data)
  const getProfile = async () => {
    try {
      const res = await getMyUser()
      console.log(res)
      if (!res?.profileId) {
        router.push("/create/profile")
      } else {
        setUser(res)
      }
    } catch (err) {
      resetUser()
      router.push("/sign")
    } finally {
      setLoading(false)  // ✅ har holda loading tugaydi
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      router.push("/sign")
      return
    } else {
      getProfile()
    }
  }, [socketStore.connect, socketStore.disconnect, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className="font-sans min-w-screen min-h-screen flex box-border">
      <div className="flex !w-[500px] shadow-2xl box-border">
        <Left props={{ 
          setOpen: assOPenLeft, 
          isOpenMenu: isOpenLeftPanel,
          socketStore: socketStore, 
          selectedChat: selectedChat, 
          messages: messages,
          setSlectedChat: setSlectedChat,
          setMessages: setMessages 
        }} />
      </div>
      <div className="flex w-full">
        <Center props={{ 
          setOpen: assOPenRight,
          socketStore: socketStore, 
          selectedChat: selectedChat, 
          messages: messages,
          setMessages : assinMessages 
        }} />
      </div>
      {isOpenRightPanel && (
        <div className="w-1/5 border-l-2 min-h-screen bg-amber-300">
          <Right props={{ socketStore: socketStore }} />
        </div>
      )}
    </div>
  )
}

"use client";

import Center from "@/components/center";
import Left from "@/components/left";
import Right from "@/components/right";
import { useSocketStore } from "@/service/socket.io";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/user.store";
import { CircularProgress } from "@mui/material";
import * as cachingStores from "@/features";
import * as UIState from "@/store/ui_store/store/index";

export default function Home() {
  // --- UI global store ---
  const uiStore = UIState.useUIStore();

  // --- Socket & routing ---
  const socketStore = useSocketStore();
  const router = useRouter();

  const { user, setUser, resetUser } = useUserStore();
  const {chatType,selected : {chat}} = uiStore


  // --- My user caching (RTK / TanStack / React Query bo'lishi mumkin) ---
  const { data: myUser, isLoading: loadingUser ,refetch : refetchUser} = cachingStores.Users.useMyUser();
  const {data : messages , refetch : refetchmessages} = cachingStores.Messages.useAllMessages(uiStore.selected.chat?.type || "user",uiStore.selected.chat?.id || "")
  const {} = cachingStores.UserChats.getMyChats()
  useEffect(() => {
    if (myUser) {
      setUser(myUser.data);
    }
  }, [myUser, setUser]);

  if (loadingUser || !user?.userId) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }


  const setUsers = async () => {
    await refetchUser()
  }



  return (
    <div className="font-sans min-w-screen min-h-screen flex box-border">
      <div className="w-2/7">
          <Left props={{
            isOpenMenu : uiStore.left,
            selectedChat : uiStore.selected.chat,
            selectedChats : uiStore.chatType,
            setMessages : refetchmessages,
            setOpen : uiStore.toggleLeft,
            setSelectedChat : uiStore.setSelectedChat,
            setSelectedChats : uiStore.setSelectedChats,
            socketStore : socketStore
          }}/>
      </div>

      <Center />
      {/* Right panel ixtiyoriy */}
      {/* <Right /> */}
    </div>
  );
}

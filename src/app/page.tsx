"use client";

import Center from "@/components/center";
import Left from "@/components/left";
import Right from "@/components/right";
import { useSocketStore } from "@/service/socket.io";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/user.store";
import { CircularProgress } from "@mui/material";
import { Profile, Users,Messages } from "@/features";

export default function Home() {
  const socketStore = useSocketStore();
  const router = useRouter();

  const { user, setUser, resetUser } = useUserStore();
  const [isOpenRightPanel, setIsOpenRightPane] = useState(false);
  const [isOpenLeftPanel, setIsOpenLeftPanel] = useState(false);
  const [selectedChat, setSlectedChat] = useState<Record<string, any> | null>(null);
  const [messages, setMessages] = useState<any[]>([]);

  // ✅ React Query hooks — komponent darajasida
  const { data: myUser, isLoading: loadingUser } = Users.useMyUser();
  const { data: allUsers, isLoading: loadingUsers } = Users.useAllUsers();
  const {data : Profil} = Profile.useOneProfile("f9b2a7a8-eae2-4d46-a0f1-8c6d5b43b250")
  const assOPenRight = () => setIsOpenRightPane(prev => !prev);
  const assOPenLeft = () => setIsOpenLeftPanel(prev => !prev);
  const assinMessages = (data: any) => setMessages(data);

  useEffect(() => {
    Messages.getMessage("7e0d1fc5-073c-4808-87d3-46187d7abeac","group").then(res => console.log(res)).catch(err => console.log(err))
    if (myUser) {
      setUser(myUser.data);
      // console.log("My user:", myUser.data);
    }
  }, [myUser, setUser]);

  if (loadingUser || loadingUsers) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="font-sans min-w-screen min-h-screen flex box-border">
    </div>
  );
}

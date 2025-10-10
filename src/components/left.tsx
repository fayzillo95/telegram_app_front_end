import React, { useEffect, useState } from "react";
import { useUserStore } from "@/store/user.store";
import { LeftProps } from "@/types/left/left.types";
import { Chat } from "@/types/ui/chat.types";
import api from "@/features/axiosInstance";

function Left({ props }: LeftProps) {
  const { user } = useUserStore();
  const [targetFolder, setTargetFolder] = useState<
    "all" | "group" | "channel" | "user"
  >("all");
  const [chats, setChats] = useState<Chat[]>([]);
  const { setSelectedChat } = props
  const targetFolders: ("all" | "group" | "channel" | "user")[] = [
    "all",
    "group",
    "channel",
    "user",
  ];

  // --- Chatlarni olish
  const setChatTargets = async () => {
    try {
      let url = "chats/get-all";
      if (targetFolder !== "all") url = `chats/get-all/${targetFolder}`;
      const { data } = await api.get(url);
      setChats(data);
    } catch (error) {
      console.error("❌ Chatlarni olishda xato:", error);
    }
  };

  useEffect(() => {
    setChatTargets();
  }, [targetFolder]);

  return (
    <div className="flex w-full">
      {/* === Chap panel (filterlar) === */}
      <div className="w-1/6 border-r-2 min-h-screen flex flex-col">
        {targetFolders.map((target) => (
          <button
            key={target}
            onClick={() => setTargetFolder(target)}
            className={`py-2 px-3 text-left capitalize hover:bg-gray-100 ${targetFolder === target ? "bg-gray-200 font-bold" : ""
              }`}
          >
            {target}
          </button>
        ))}
      </div>

      {/* === O‘ng panel (chatlar ro‘yxati) === */}
      <div className="flex-1 p-3 overflow-y-auto">
        {chats.length === 0 ? (
          <p className="text-gray-500">Chatlar mavjud emas</p>
        ) : (
          chats.map((ch) => (
            <div
              onClick={() => setSelectedChat(ch)}
              key={ch.id}
              className="flex items-center gap-3 p-2 border-b hover:bg-gray-50 cursor-pointer"
            >
              <img
                src={ch.logo || ""}
                alt={ch.title}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <h2 className="font-semibold">{ch.title}</h2>
                <p className="text-sm text-gray-600 truncate">
                  {ch.description || "No description"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Left;

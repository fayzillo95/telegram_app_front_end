import { useEffect, useMemo } from "react";

import { useState } from "react";
import { useSocketStore } from "./socket.io";
import {  getMessages } from "@/features/messages/api";

export const useSocketMessages = (chatId: string, chatType: string) => {
  const { socket } = useSocketStore();
  const [messages, setMessages] = useState<string[]>([]);

  // --- initial fetch (REST API orqali) ---
  useEffect(() => {
    if (!chatId) return;
    getMessages(chatId, chatType).then((ids) => setMessages(ids));
  }, [chatId, chatType]);

  // --- socket listeners ---
  useEffect(() => {
    if (!socket) return;

    // 🔹 yangi message
    socket.on("create-msg", (msgId: string) => {
      setMessages((prev) => [...prev, msgId]);
    });

    // 🔹 message o‘chirildi
    socket.on("del-msg", (msgId: string) => {
      setMessages((prev) => prev.filter((id) => id !== msgId));
    });

    // 🔹 message update bo‘ldi
    socket.on("update-msg", (updatedMsgId: string) => {
      // bu yerda agar frontda msg details saqlansa, uni yangilash mumkin
      // hozircha bizda faqat ID array bo‘lgani uchun, hech narsa qilinmaydi
    });

    return () => {
      socket.off("create-msg");
      socket.off("del-msg");
      socket.off("update-msg");
    };
  }, [socket]);

  // --- performance optimizatsiya ---
  const memoizedMessages = useMemo(() => messages, [messages]);

  return {
    messages: memoizedMessages,
    setMessages,
  };
};

// src/types/left/left.types.tsx
import { Chat } from "@/types/ui/chat.types"
import { UIState } from "@/store/ui_store/store"
import { Message } from "../ui/message.types"

export type LeftProps = {
  props: {
    setOpen: UIState["toggleMenu"]
    isOpenMenu: boolean
    socketStore: Record<string, any>
    selectedChat: Chat | null
    setSelectedChat: UIState["setSelectedChat"]
    setMessages: () => void
    selectedChats: UIState["chatType"]
    setSelectedChats: UIState["setSelectedChats"] // ✅ <-- endi to‘g‘ri
  }
}

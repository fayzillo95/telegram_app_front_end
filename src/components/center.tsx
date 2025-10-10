"use client"

import React, { useEffect, useState } from "react"
import { Messages, Users } from "@/features"
import { createMessageSchema } from "@/features/messages/api/dto"
import { useUserStore } from "@/store/user.store"
import RenderMessage from "./center/RenderMesssage"
import * as UIState from "@/store/ui_store/store/index"

function Center() {
  const [text, setText] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [chatId, setChatId] = useState<string | null>(null)
  const [chatType, setChatType] = useState<"group" | "user" | "channel">("group")
  const { user } = useUserStore()
  const { selected } = UIState.useUIStore()

  const { data: ChatMessages, refetch, isLoading } = Messages.useAllMessages(chatType, chatId || "")

  useEffect(() => {
    if (selected.chat) {
      setChatId(selected.chat.id)
      setChatType(selected.chat.type as "group" | "user" | "channel")
      refetch()
    }
  }, [selected.chat])

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!user?.userId || !chatId) return console.error("User yoki chat aniqlanmagan")

    try {
      const validated = await createMessageSchema.validateAsync({
        text,
        chatId,
        senderId: user.userId,
      })

      // Fayl bor-yo‘qligini aniqlaymiz
      if (files.length > 0) {
        const formData = new FormData()
        files.forEach(file => formData.append("files", file))
        formData.append("senderId", user.userId)
        formData.append("chatId", chatId)

        await Messages.sendMessage(formData, chatType)
      } else if (text.trim()) {
        await Messages.sendMessage(validated, chatType)
      }

      setText("")
      setFiles([])
      await refetch()
    } catch (err) {
      console.error("Xatolik:", err)
    }
  }

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <div className="header border-b-2 py-2 flex items-center gap-2">
        {selected.chat ? (
          <>
            <img
              src={selected.chat.logo || ""}
              alt="chat-logo"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <h1 className="font-semibold">{selected.chat.title}</h1>
            </div>
          </>
        ) : (
          <h1 className="text-gray-400">Chat tanlang</h1>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {isLoading ? (
          <p className="text-gray-400 text-center">Yuklanmoqda...</p>
        ) : ChatMessages?.messages?.length ? (
          <RenderMessage messages={ChatMessages.messages} refetch={refetch} />
        ) : (
          <p className="text-gray-400 text-center">Xabarlar yo‘q</p>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-3 flex gap-2 border-t bg-white">
        <input
          type="file"
          name="files"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files || []))}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="cursor-pointer px-3 py-2 bg-gray-200 rounded">
          📎
        </label>

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Xabar yozing..."
          className="flex-1 border px-3 py-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={!text.trim() && files.length === 0}
        >
          Yuborish
        </button>
      </form>
    </div>
  )
}

export default Center

"use client"

import React from "react"
import { Messages } from "@/features"
import { Button, CircularProgress } from "@mui/material"
import { MessageType } from "@/types/message.types"
import * as UIState from "@/store/ui_store/store/index"


type Props = {
  messages: MessageType[]
  refetch: () => void
}

const RenderMessage: React.FC<Props> = ({ messages, refetch }) => {
  const [loadingId, setLoadingId] = React.useState<string | null>(null)
  const uiStore = UIState.useUIStore()
  const handleDelete = async (id: string) => {
    try {
      setLoadingId(id)
      await Messages.removeMessage(id, uiStore.selected.chat?.type || "")
      refetch()
    } catch (err) {
      console.error("Xabarni o‘chirishda xatolik:", err)
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <div className="flex flex-col gap-4 p-4 overflow-y-auto max-h-[calc(100vh-100px)]">
      {messages.map(({ message, sender }) => (
        <div
          key={message.id}
          className="flex gap-3 items-start border-b pb-3"
        >
          <img
            src={sender.avatar}
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover"
          />

          <div className="flex-1">
            <div className="font-semibold">
              {sender.firstName} {sender.lastName}
            </div>

            {message.files && message.files.length > 0 && (
              <div className="mt-2 text-sm text-blue-600">
                {message.files.map((file, idx) => (
                  <div key={idx}>
                    📎 <a href={file} target="_blank" rel="noopener noreferrer">{file}</a>
                  </div>
                ))}
              </div>
            )}
            {message.images && message.images.length > 0 && (
              <div className="mt-2 text-sm text-blue-600">
                {message.images.map((file, idx) => (
                  <div key={idx} className="size-25">
                    <img src={file}></img>
                  </div>
                ))}
              </div>
            )}
            <div className="bg-gray-100 p-2 rounded-md inline-block mt-1">
              {message.text}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {new Date(message.updatedAt).toLocaleTimeString()}
            </div>
          </div>

          <div>
            <Button
              size="small"
              color="error"
              variant="outlined"
              onClick={() => handleDelete(message.id)}
              disabled={loadingId === message.id}
            >
              {loadingId === message.id ? <CircularProgress size={18} /> : "O'chirish"}
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RenderMessage

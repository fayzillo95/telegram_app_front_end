"use client"

import { Box, Button, IconButton, TextField } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import AttachFileIcon from "@mui/icons-material/AttachFile"
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon"
import MicIcon from "@mui/icons-material/Mic"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import React, { useState, useEffect, useRef } from "react"
import { Person } from "@mui/icons-material"
import ViewSidebarIcon from "@mui/icons-material/ViewSidebar"
import { SocketStoreType } from "@/service/socket.io"
import { MessageType } from "@/features/props.types/center.types"
import { getMessages, sendMessage } from "@/features/messages/api"
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useUserStore } from "@/store/user.store"


function Center({
  props,
}: {
  props: {
    setOpen: Function
    socketStore: SocketStoreType
    selectedChat: Record<string, any> | null
    messages: Record<string, any>[],
    setMessages: Function
  }
}) {
  const { selectedChat, messages, socketStore, setOpen, setMessages } = props
  const [chatName, setChatName] = useState("Chat")
  const [chatImage, setChatImage] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const { user } = useUserStore()


  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  // messages o'zgarganda pastga scroll bo'lishi uchun
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])


  useEffect(() => {
    if (selectedChat) {
      getMessages(selectedChat['id'], selectedChat.type).then(res => {
        setMessages(res)
      })
      setChatName(selectedChat.name || "Chat")
      setChatImage(selectedChat.image || null)
    }
  }, [props.selectedChat])


  const handleSend = () => {
    if (selectedChat && selectedChat['type']) {
      console.log(selectedChat.type)
      const chatId = selectedChat.id
      const senderId = selectedChat.user2Id

      sendMessage({
        text: newMessage, chatId: chatId
      }, selectedChat.type).then(res => {
        console.log("Resolve")
        getMessages(selectedChat.id, selectedChat.type).then(res => {
          setMessages(res)
          console.log(res[0])
        })
        setNewMessage("")
      })
    }
  }


  return (
    <div className="flex flex-col justify-between w-full h-screen box-border">
      {/* === Chat Header === */}
      <Box className="p-3 border-b flex justify-between items-center box-border">
        {props.selectedChat ? (
          <>
            <div className="flex gap-4 items-center">
              <Box
                sx={{ borderRadius: "50%", height: 45, width: 55 }}
                display="flex"
                justifyContent="center"
                alignItems="center"
                bgcolor={selectedChat && selectedChat.user1Id == user?.userId ? "rgba(57,60,231,0.88)" : "none"}
              >
                {user?.avatar ? (
                  selectedChat && selectedChat.user1Id === user?.userId
                    ? <BookmarkBorderIcon className='text-white' />
                    : <img src={chatImage ? chatImage : ""} alt="" className='rounded-full size-10' />
                ) : (
                  <Person />
                )}
              </Box>

              {/* {chatImage ? (
                <img
                  src={chatImage}
                  alt="chat avatar"
                  className="size-10 rounded-full object-cover"
                />
              ) : (
                <Person fontSize="large" />
              )} */}
              <h1 className="text-xl font-semibold">{selectedChat && selectedChat.user1Id == user?.userId ? "Saqlangan" : chatName}</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={() => props.setOpen()}>
                <ViewSidebarIcon color="disabled" />
              </Button>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </div>
          </>
        ) : (
          <h1 className="text-lg text-gray-400">Chat tanlang</h1>
        )}
      </Box>

      {/* === Chat Messages === */}
      <Box className="flex-1 overflow-y-auto p-2 space-y-2 bg-gray-50 px-6">

        <ul className="space-y-3 w-full">
          {messages[0] ? messages.map((el) => {
            const isMe = el.details.senderId === user?.userId
            const sender = el.details.sender
            const avatar = sender?.Profile?.[0]?.avatar?.file

            return (
              <li
                key={el.id}
                className={`flex ${isMe ? "justify-end" : "justify-start"} items-end gap-2 `}
              >
                {!isMe && (
                  <img
                    src={avatar || "/default-avatar.png"}
                    alt="avatar"
                    className="size-8 rounded-full object-cover"
                  />
                )}
                <div
                  className={`relative min-w-[100px] max-w-[65%] py-6 px-2 rounded-2xl shadow 
          ${isMe ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
                >
                  {!isMe && (
                    <p className="text-sm font-semibold text-blue-600 mb-1">
                      {sender?.Profile?.[0]?.firstName} {sender?.Profile?.[0]?.lastName}
                    </p>
                  )}
                  {el.details.text && (
                    <p className="whitespace-pre-wrap">{el.details.text}</p>
                  )}
                  {el.details.images && (
                    <img
                      src={el.details.images[0]}
                      alt="sent"
                      className="rounded-lg max-h-60 object-cover mt-1"
                    />
                  )}
                  <span
                    className={`absolute bottom-1 right-2 text-[10px] ${isMe ? "text-gray-200" : "text-gray-500"
                      }`}
                  >
                    {new Date(el.details.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </li>
            )
          }) : ""}

          {/* === Scroll target === */}
          <div ref={messagesEndRef} />
        </ul>


      </Box>

      {/* === Chat Input === */}
      {props.selectedChat && (
        <div className="flex w-full h-16 items-center gap-2 border-t p-2 box-border">
          <IconButton>
            <AttachFileIcon />
          </IconButton>

          <IconButton>
            <InsertEmoticonIcon />
          </IconButton>

          <TextField
            fullWidth
            placeholder="Xabar yozing..."
            variant="outlined"
            size="small"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />

          <Button variant="contained" color="primary" onClick={handleSend}>
            <SendIcon />
          </Button>

          <IconButton color="primary">
            <MicIcon />
          </IconButton>
        </div>
      )}
    </div>
  )
}

export default Center

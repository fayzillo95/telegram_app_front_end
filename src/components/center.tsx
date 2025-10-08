"use client"

import { Box, Button, IconButton, TextField } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import AttachFileIcon from "@mui/icons-material/AttachFile"
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon"
import MicIcon from "@mui/icons-material/Mic"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import SearchIcon from "@mui/icons-material/Search"
import PhoneIcon from "@mui/icons-material/Phone"
import VideocamIcon from "@mui/icons-material/Videocam"
import React, { useState, useEffect, useRef } from "react"
import { Person } from "@mui/icons-material"
import ViewSidebarIcon from "@mui/icons-material/ViewSidebar"
import { SocketStoreType } from "@/service/socket.io"
import { MessageType } from "@/features/props.types/center.types"
import { getMessages, sendMessage } from "@/features/messages/api"
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import { useUserStore } from "@/store/user.store"
import { getUserChats } from "@/features/userchats/api"


function Center() {
  return (
    <div className="flex flex-col justify-between w-full h-screen box-border bg-gradient-to-br from-slate-50 to-slate-100">

    </div>
  )
}

export default Center
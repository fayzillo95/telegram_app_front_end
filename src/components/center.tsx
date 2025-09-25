"use client"

import { Box, Button, IconButton, TextField } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import AttachFileIcon from "@mui/icons-material/AttachFile"
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon"
import MicIcon from "@mui/icons-material/Mic"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from "react"

function Center({props} : { props : {setOpen : Function}}) {

  return (
    <div className="flex flex-col justify-between w-full h-screen box-border">
      {/* Header */}
      <Box className="p-3 border-b flex justify-between box-border">
        <h1 className="text-2xl font-semibold">Muhammafrizo</h1>
        <div className="flex">
          <Button onClick={() => props.setOpen()}>open</Button>
          <MoreVertIcon></MoreVertIcon>
        </div>
      </Box>

      {/* Messages area */}
      <Box className="flex-1 bg-amber-300 overflow-y-auto p-2">
        {/* Bu yerda chat xabarlari chiqadi */}
      </Box>

      {/* Input area */}
      <div className="flex w-full h-16 items-center gap-2 border-t p-2 box-border">
        {/* File attach */}
        <IconButton color="default">
          <AttachFileIcon />
        </IconButton>

        {/* Emoji/Stickers */}
        <IconButton color="default">
          <InsertEmoticonIcon />
        </IconButton>

        {/* Input */}
        <TextField
          fullWidth
          placeholder="Xabar yozing..."
          variant="outlined"
          size="small"
        />

        {/* Send button */}
        <Button variant="contained" color="primary">
          <SendIcon />
        </Button>

        {/* Voice message */}
        <IconButton color="primary">
          <MicIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default Center

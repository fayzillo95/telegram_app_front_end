"use client"

import { Box, Button, IconButton, TextField } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import AttachFileIcon from "@mui/icons-material/AttachFile"
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon"
import MicIcon from "@mui/icons-material/Mic"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from "react"
import { Person } from "@mui/icons-material"
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';

function Center({props} : { props : {setOpen : Function}}) {

  return (
    <div className="flex flex-col justify-between w-full h-screen box-border">

      <Box className="p-3 border-b flex justify-between box-border">
        <div className="flex gap-4 items-end">
          <Person></Person>
          <h1 className="text-2xl font-semibold">Muhammadrizo</h1>
        </div>
        <div className="flex items-center">
          <Button onClick={() => props.setOpen()} ><ViewSidebarIcon color="disabled"></ViewSidebarIcon></Button>
          <MoreVertIcon></MoreVertIcon>
        </div>
      </Box>

      <Box className="flex-1 bg-amber-300 overflow-y-auto p-2">
      </Box>

      <div className="flex w-full h-16 items-center gap-2 border-t p-2 box-border">
        <IconButton color="default">
          <AttachFileIcon />
        </IconButton>

        <IconButton color="default">
          <InsertEmoticonIcon />
        </IconButton>

        <TextField
          fullWidth
          placeholder="Xabar yozing..."
          variant="outlined"
          size="small"
        />

        <Button variant="contained" color="primary">
          <SendIcon />
        </Button>

        <IconButton color="primary">
          <MicIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default Center

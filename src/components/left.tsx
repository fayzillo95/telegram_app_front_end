import { Box, Button, List, ListItem, ListItemIcon, ListItemText, TextField } from '@mui/material'
import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from "@mui/icons-material/Search"
import Person from "@mui/icons-material/Person"
import { Folder, Group } from "@mui/icons-material"
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';
import ContactsIcon from '@mui/icons-material/Contacts';

function Left() {

  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const leftItems = [
    {
      label: "Contacts",
      icon: <ContactsIcon fontSize='small'></ContactsIcon>
    },
    {
      label: "Groupes",
      icon: <Group fontSize='small'></Group>
    },
    {
      label: "Channels",
      icon: <AssistantPhotoIcon fontSize='small'></AssistantPhotoIcon>
    },
  ]
  return (
    <div className='w-full'>
      <div className="flex relative">

        <div className="menu shadow-2xl min-h-screen w-[85px] box-border flex flex-col gap-6 pt-4">

          <button className='cursor-pointer' onClick={() => setIsOpenMenu(!isOpenMenu)}><MenuIcon></MenuIcon></button>
          <div className='flex flex-col gap-3'>
            {
              leftItems.map((el, index) => (
                <div key={"folder_" + index} className='flex flex-col pl-1 py-1 rounded-2xl shadow-[1px_1px_10px_rgba(1,1,1,0.8)] cursor-pointer'>
                  <div className='rounded-full size-7 flex items-center justify-center'>
                    {el.icon}
                  </div>
                  <small>{el.label}</small>
                </div>
              ))
            }
          </div>
        </div>
        <div onClick={() => setIsOpenMenu(!isOpenMenu)} className={`path absolute w-[400px] min-h-screen border-r-2 shadow-2xl transition-all bg-white z-20 ${isOpenMenu ? "left-0" : "-left-[402px]"}`}>
            <div className='flex gap-4 p-6 inset-shadow-gray-200 shadow-2xl cursor-pointer items-end'>
              <div className='rounded-full shadow-[1px_1px_5px_rgba(1,1,1,0.8)] size-9 flex justify-center items-center'>
                <Person fontSize='large'></Person>
              </div>
              <h1 className='text-transparent bg-gradient-to-l from-[rgba(139,19,187,0.8)] to-[rgba(141,12,12,0.8)] bg-clip-text hover:shadow-[0px_5px_2px_rgba(1,1,1,0.8)]'>Fayzillo Ummatov</h1>
            </div>
        </div>

        <div className="users w-full py-2 space-y-2.5 box-border relative z-0">

          <div className="head flex justify-between w-full shadow-2xl py-2.5">
            <TextField fullWidth size='small'>

            </TextField>
            <Button variant='contained' >
              <SearchIcon ></SearchIcon>
            </Button>
          </div>
          <div className='w-full box-border'>
            <List sx={{ padding: 0 }}>
              <ListItem sx={{ margin: 0 }}>
                <div className='flex justify-between w-full items-center gap-1 border-b-[0.5px] py-2 cursor-pointer'>
                  <Box sx={{ borderRadius: "50%", border: "inset 1px gray", height: 45, width: 55 }} display="flex" justifyContent="center" alignItems="center">
                    <Person></Person>
                  </Box>
                  <div className="flex  justify-between w-full">
                    <div className="flex flex-col py-1 gap-0">
                      <ListItemText primary="Abu valiev"></ListItemText>
                    </div>
                    <div className="flex flex-col">
                      <small>14 : 00</small>
                      <div className="flex space-x-1" >
                        <small className='rounded-full bg-green-500 size-6 text-center py-1 shadow-2xs'>12</small>
                        <small className='text-blue-600'>@</small>
                      </div>
                    </div>
                  </div>
                </div>
              </ListItem>
            </List>
          </div>

        </div>

      </div>

    </div>
  )
}

export default Left
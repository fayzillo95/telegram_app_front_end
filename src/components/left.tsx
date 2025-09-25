import { Box, Button, List, ListItem, ListItemIcon, ListItemText, TextField } from '@mui/material'
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from "@mui/icons-material/Search"
import Person from "@mui/icons-material/Person"
function Left() {


  return (
    <div className='w-full'>
      <div className="flex">
        <div className="menu shadow-2xl min-h-screen w-1/6 p-6 box-border">
          <MenuIcon></MenuIcon>
        </div>
        <div className="users w-full py-2 space-y-2.5 box-border">
          <div className="head flex justify-between w-full shadow-2xl py-2.5">
            <TextField fullWidth size='small'>

            </TextField>
            <Button>
              <SearchIcon></SearchIcon>
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
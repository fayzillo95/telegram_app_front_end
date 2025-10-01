"use client"

import { Box, List, ListItem, ListItemText } from '@mui/material'
import React from 'react'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { User } from '@/store/user.store';
import { Person } from '@mui/icons-material';
import { leftPropsType } from '@/types/left.types';

function RenderChats({props} : leftPropsType) {
    const {users,user,handleChatUser} = props
    
    return (
        <List sx={{ padding: 0 }}>
            {users.map(element => (
                <ListItem sx={{ margin: 0 }} key={element.userId} >
                    <div className='flex justify-between w-full items-center gap-1 border-b-[0.5px] py-2 cursor-pointer' onClick={() => handleChatUser(element.userId)}>
                        <Box
                            sx={{ borderRadius: "50%", height: 45, width: 55 }}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            bgcolor={element.userId == user?.userId ? "rgba(57,60,231,0.88)" : "none"}
                        >
                            {element.avatar ? (
                                element.userId === user?.userId
                                    ? <BookmarkBorderIcon className='text-white' />
                                    : <img src={element.avatar} alt="" className='rounded-full size-10' />
                            ) : (
                                <Person />
                            )}
                        </Box>
                        <div className="flex justify-between w-full">
                            <div className="flex flex-col py-1 gap-0">
                                <ListItemText
                                    primary={
                                        element.userId === user?.userId
                                            ? "Saqlangan"
                                            : `${element.firstName ?? ""} ${element.lastName ?? ""}`
                                    }
                                />
                            </div>
                            <div className="flex flex-col">
                                <small>14:00</small>
                                <div className="flex space-x-1">
                                    <small className='rounded-full bg-green-500 size-6 text-center py-1 shadow-2xs'>12</small>
                                    <small className='text-blue-600'>@</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </ListItem>
            ))}
        </List>
    )
}

export default RenderChats
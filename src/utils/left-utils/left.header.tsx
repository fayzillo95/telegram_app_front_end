import { Button, TextField } from '@mui/material'
import React from 'react'
import SearchIcon from "@mui/icons-material/Search"

function LeftHeader() {
    return (
        <div className="head flex justify-between w-full shadow-2xl py-2.5">
            <TextField fullWidth size='small'>

            </TextField>
            <Button variant='contained' >
                <SearchIcon ></SearchIcon>
            </Button>
        </div>
    )
}

export default LeftHeader
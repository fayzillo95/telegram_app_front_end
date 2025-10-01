"use client"

import { useVerificationUrlStore } from '@/store/api.store'
import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { emailStore } from '@/store/user.store'

function Sign() {

    const {email,setEmail} = emailStore()
    const { verificationUrl, setVerifyUrl } = useVerificationUrlStore()
    const router = useRouter()

    const handleSubmit = async () => {
        const result = await axios.post("http://localhost:15976/api/auth/send-otp", {
            email: email
        })
        console.log(result)
        const { verificationUrl} = result.data
        if(result.data.sessionToken){
            localStorage.setItem("sessionToken",result.data.sessionToken)
        }else{
            localStorage.removeItem("sessionToken")
        }
        setVerifyUrl(verificationUrl)
        router.push("/otp")
    }

    return (
        <div className='container mx-auto flex flex-col justify-center items-center min-h-screen'>
            <div className='w-[400px] space-y-5 flex flex-col items-center shadow-2xl p-6'>
                <h1 className='text-2xl font-extrabold'>Sign</h1>
                <div className='w-full'>
                    <TextField
                        label="Email"
                        name="email"
                        placeholder='Enter your email ...'
                        fullWidth
                        key={"email"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type='email'
                    >
                    </TextField>
                </div>
                <Button variant='contained' fullWidth onClick={() => handleSubmit()}>Submit</Button>
            </div>
        </div>
    )
}

export default Sign
"use client"

import { useVerificationUrlStore } from "@/store/api.store"
import { emailStore, useUserStore } from "@/store/user.store"
import { Button, TextField } from "@mui/material"
import axios from "axios"
import { useRouter } from "next/navigation"
import React, { useEffect, useRef, useState } from "react"

function Page() {

    const {email} = emailStore()
    const {setUser} = useUserStore()
    const router = useRouter()
    const { verificationUrl, targetUrlAfterOtp, setTargetUrlAfterOtp } = useVerificationUrlStore()

    const [otp, setOtp] = useState<string[]>(Array(6).fill(""))
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    const handleChange = (value: string, index: number) => {
        if (!/^[0-9]?$/.test(value)) return // faqat raqam
        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus()
        }

    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const sendOtp = async () => {
        const code = otp.join("")
        const apiUrl = `http://localhost:15976${verificationUrl}`
        const result = await axios.post(apiUrl, {
            email: email,
            code: code
        },{
            headers : {
                Authorization : `Bearer ${localStorage.getItem("sessionToken")}`
            }
        })
        console.log(result)
        const {accessToken,user,routerUrl } = result.data
        localStorage.setItem("accessToken",accessToken)
        // @ts-ignore
        Object.keys(user).forEach((key) => setUser(key,user[key]))
        router.push(routerUrl)
    }

    useEffect(() => {
        if (otp.join("").length === 6) {
            console.log(otp.join(""))
            sendOtp()
        }
    }, [otp])

    return (
        <div className="container mx-auto  flex flex-col gap-6 mt-10 items-center">
            <h1 className="text-violet-500 text-4xl">Enter your code</h1>
            <div className="flex gap-2 justify-between w-[400px]">
                {otp.map((digit, index) => (
                    <TextField
                        key={index}
                        inputRef={(el) => (inputRefs.current[index] = el)}
                        value={digit}
                        onChange={(e) => handleChange(e.target.value, index)}
                        inputProps={{
                            onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, index),
                            maxLength: 1,
                            style: { textAlign: "center", fontSize: "1.5rem", width: "3rem" },
                        }}
                    />
                ))}
            </div>
            <div className="flex">
                <Button onClick={() => sendOtp()} variant="contained">Submit</Button>
                <Button onClick={() => {
                    router.push("/sign")
                }}>CHange email</Button>
            </div>
        </div>
    )
}

export default Page

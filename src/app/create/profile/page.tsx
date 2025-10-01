"use client"

import { useSocketStore } from "@/service/socket.io"
import { connect } from "http2"
import React, { useState } from "react"
import axios from "axios"
import { useUserStore } from "@/store/user.store"
import { getMyUser } from "@/features/users/api"
import { useRouter } from "next/navigation"

type RegisterDataType = {
    username: string
    firstName: string
    lastName: string
}

function Register() {

    const router = useRouter()

    const [userData, setUserData] = useState<RegisterDataType>({
        username: "",
        lastName: "",
        firstName: "",
    })
    const [avatar, setAvatar] = useState<File | null>(null)
    const { socket, connect } = useSocketStore()
    const { setUser } = useUserStore()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUserData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const formData = new FormData()
        if (userData.username.length > 0) formData.append("username", userData.username)
        if (userData.firstName.length > 0) formData.append("firstName", userData.firstName)
        if (userData.lastName.length > 0) formData.append("lastName", userData.lastName)

        if (avatar) {
            formData.append("avatar", avatar)
        }

        const accessToken = localStorage.getItem("accessToken")

        await axios.post("http://localhost:15976/api/profile/create", formData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "multipart/form-data"
            }
        }).then(async (result) => {
            console.log(result)
            const {user : {username},userId } = result.data
            const res = await getMyUser()
            setUser(res)
            router.push("/")
        }
        ).catch(err => console.log(err))
    }


    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 w-80 mx-auto mt-10 p-4 border rounded-lg shadow"
        >
            <h2 className="text-xl font-bold">Ro‘yxatdan o‘tish</h2>

            <input
                type="text"
                name="username"
                placeholder="Username"
                value={userData.username}
                onChange={handleChange}
                className="border p-2 rounded"
            />

            <input
                type="text"
                name="firstName"
                placeholder="Ism"
                value={userData.firstName}
                onChange={handleChange}
                className="border p-2 rounded"
            />

            <input
                type="text"
                name="lastName"
                placeholder="Familiya"
                value={userData.lastName}
                onChange={handleChange}
                className="border p-2 rounded"
            />

            <div className="flex w-full gap-2">
                <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    placeholder=""
                    onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                            setAvatar(e.target.files[0])
                        }
                    }}
                    className="border p-2 rounded w-full"
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 w-full rounded hover:bg-blue-700"
                >
                    Yuborish
                </button>
            </div>
        </form>
    )
}

export default Register

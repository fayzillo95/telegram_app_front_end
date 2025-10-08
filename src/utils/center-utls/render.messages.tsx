import React, { useMemo } from 'react'

function RenderMessages() {
    const target = [
        {
            "id": "ca5ed314-2fc7-451b-a82b-6e9f19a737fa",
            "chatId": "ef1fe3a1-948f-48ff-877c-0bd0e0c02189",
            "replayId": null,
            "mDetailsId": "52e79c10-5a00-4d30-a491-1d18017d1641",
            "isUpdated": false,
            "isReading": false,
            "details": {
                "sender": {
                    "id": "aa5f857f-85b7-42c7-a022-4693f2265275",
                    "username": "fayzilllo95",
                    "email": "ovovovlululutvata@gmail.com",
                    "isDeleted": false,
                    "isBot": false,
                    "Profile": [
                        {
                            "firstName": "Fayzillo",
                            "lastName": "Ummatov",
                            "avatar": {
                                "file": "http://localhost:15976/api/image/1759334442562-111109608.jpg"
                            }
                        }
                    ]
                },
                "text": "Salom",
                "senderId": "aa5f857f-85b7-42c7-a022-4693f2265275",
                "id": "52e79c10-5a00-4d30-a491-1d18017d1641",
                "files": null,
                "docs": null,
                "createdAt": "2025-10-02T11:52:38.127Z",
                "updatedAt": "2025-10-02T11:52:38.127Z",
                "images": null,
                "videos": null,
                "stickers": null,
                "_count": {
                    "channelMessages": 0,
                    "groupMessages": 0,
                    "userChatMessages": 1
                }
            }
        }
    ]

    const flattedMessages = useMemo(() => {
        return target.map((msg) => {
            const d = msg.details
            const profile = d.sender?.Profile?.[0]

            return {
                id: msg.id,
                chatId: msg.chatId,
                replayId: msg.replayId,
                isUpdated: msg.isUpdated,
                isReading: msg.isReading,

                text: d.text,
                files: d.files,
                docs: d.docs,
                images: d.images,
                videos: d.videos,
                stickers: d.stickers,
                createdAt: d.createdAt,
                updatedAt: d.updatedAt,

                sender: {
                    id: d.sender.id,
                    username: d.sender.username,
                    email: d.sender.email,
                    firstName: profile?.firstName || null,
                    lastName: profile?.lastName || null,
                    avatar: profile?.avatar?.file || null,
                    isBot: d.sender.isBot
                }
            }
        })
    }, [target])

    console.log("Flattened: ", flattedMessages)

    return (
        <div>
            {flattedMessages.map(m => (
                <div key={m.id} className="p-2 border-b">
                    <img 
                        src={m.sender.avatar || "/default.png"} 
                        alt={m.sender.username} 
                        className="w-8 h-8 rounded-full inline-block mr-2"
                    />
                    <span className="font-bold">{m.sender.username}</span>: {m.text}
                </div>
            ))}
        </div>
    )
}

export default RenderMessages

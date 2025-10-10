export type MessageType = {
  message: {
    id: string
    text: string
    updatedAt: string
    files: string[] | null
    images: string[] | null
    videos: string[] | null
    docs: string[] | null
  }
  sender: {
    firstName: string
    lastName: string
    avatar: string
  }
}
import api from "@/features/axiosInstance";
import { UserChat } from "../types";

export const getMyChats = async () => {
  const { data } = await api.get<UserChat[]>('/userchats/my-chats');
  return data;
};

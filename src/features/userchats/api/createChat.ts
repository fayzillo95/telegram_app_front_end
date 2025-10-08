import api from "@/features/axiosInstance";
import { UserChat } from "../types";

export const createChat = async (user2Id: string) => {
  const { data } = await api.post<UserChat>(`/userchats/create/${user2Id}`);
  return data;
};

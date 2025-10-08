import api from "@/features/axiosInstance";
import { User } from "../types";

export const getAllUsers = async () => {
  const { data } = await api.get<User[]>('/users/get-all');
  return data;
};

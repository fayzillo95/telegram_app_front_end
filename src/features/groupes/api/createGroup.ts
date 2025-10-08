import api from "@/features/axiosInstance";
import { Groupe } from "../types";

export const createGroup = async (payload: Partial<Groupe>) => {
  const { data } = await api.post('/groupes/create', payload);
  return data;
};

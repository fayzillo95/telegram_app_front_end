import api from "@/features/axiosInstance";
import { ExistsVerificationDto } from "../types";

export const existsVerification = async (payload: ExistsVerificationDto) => {
  const { data } = await api.post('/auth/exists/verification', payload);
  return data;
};

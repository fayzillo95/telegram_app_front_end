import api from "../axiosInstance";

export const sendOtp = async (email: string) => {
  const res = await api.post("/auth/send-otp", { email });
  return res.data;
};

export const registerVerification = async (data: any) => {
  const res = await api.post("/auth/register/verification", data);
  return res.data;
};

export const existsVerification = async (data: any) => {
  const res = await api.post("/auth/exists/verification", data);
  return res.data;
};

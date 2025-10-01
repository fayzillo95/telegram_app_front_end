import api from "../axiosInstance";

export const createUserChat = async (user2Id: string, data: any) => {
  const res = await api.post(`/userchats/create/${user2Id}`, data);
  return res.data;
};

export const getUserChats = async () => {
  const res = await api.get("/userchats");
  return res.data;
};

export const getUserChatById = async (id: string) => {
  const res = await api.get(`/userchats/${id}`);
  return res.data;
};

export const updateUserChat = async (id: string, data: any) => {
  const res = await api.patch(`/userchats/${id}`, data);
  return res.data;
};

export const deleteUserChat = async (id: string) => {
  const res = await api.delete(`/userchats/${id}`);
  return res.data;
};

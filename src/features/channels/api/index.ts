import api from "@/features/axiosInstance";

export const createChannel = async (payload:any) => { const { data } = await api.post('/channels', payload); return data; };
export const getAllChannels = async () => { const { data } = await api.get('/channels/get-all'); return data; };
export const getOneChannel = async (id:string) => { const { data } = await api.get(`/channels/get-one/${id}`); return data; };
export const updateChannel = async (id:string, payload:any) => { const { data } = await api.patch(`/channels/${id}`, payload); return data; };
export const removeChannel = async (id:string) => { const { data } = await api.delete(`/channels/${id}`); return data; };

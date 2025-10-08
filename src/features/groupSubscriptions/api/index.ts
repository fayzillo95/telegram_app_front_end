import api from "@/features/axiosInstance";
export const createGroupSubscription = async (chatId:string) => { const { data } = await api.post(`/group-subscriptions/create/${chatId}`); return data; };
export const getMyGroupSubscriptions = async () => { const { data } = await api.get('/group-subscriptions/my-subscriptions'); return data; };
export const getChatGroupSubscriptions = async (id:string) => { const { data } = await api.get(`/group-subscriptions/get-all/by-chatid/${id}`); return data; };
export const removeGroupSubscription = async (id:string) => { const { data } = await api.delete(`/group-subscriptions/remove-one/by-subscriptionid/${id}`); return data; };

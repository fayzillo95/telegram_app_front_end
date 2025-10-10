import api from "@/features/axiosInstance";
export const getAllGroupsByOwner = async () => {
  const { data } = await api.get('/groupes/get-all/by-ownerid');
  return data;
};
export const getAllGroupes = async () => {
  const {data} = await api.get('/groupes/get-all/groupes').then(res => res).catch(err => err);
  return data;
};

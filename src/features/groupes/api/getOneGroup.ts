import api from "@/features/axiosInstance";
export const getOneGroup = async (id: string) => {
  const { data } = await api.get(`/groupes/get-one/${id}`);
  return data;
};

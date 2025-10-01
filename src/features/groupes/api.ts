import api from "../axiosInstance";

export const createGroup = async (data: any) => {
  const res = await api.post("/groupes", data);
  return res.data;
};

export const getGroups = async () => {
  const res = await api.get("/groupes");
  return res.data;
};

export const getGroupById = async (id: string) => {
  const res = await api.get(`/groupes/${id}`);
  return res.data;
};

export const updateGroup = async (id: string, data: any) => {
  const res = await api.patch(`/groupes/${id}`, data);
  return res.data;
};

export const deleteGroup = async (id: string) => {
  const res = await api.delete(`/groupes/${id}`);
  return res.data;
};

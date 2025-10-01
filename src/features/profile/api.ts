import api from "../axiosInstance";

export const createProfile = async (data: any) => {
  const res = await api.post("/profile/create", data);
  return res.data;
};

export const getProfiles = async () => {
  const res = await api.get("/profile/get-all");
  return res.data;
};

export const getProfileById = async (id: string) => {
  const res = await api.get(`/profile/get-one/${id}`);
  return res.data;
};

export const updateProfile = async (id: string, data: any) => {
  const res = await api.patch(`/profile/update-one/${id}`, data);
  return res.data;
};

export const deleteProfile = async (id: string) => {
  const res = await api.delete(`/profile/delete-one/${id}`);
  return res.data;
};

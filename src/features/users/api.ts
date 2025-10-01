import api from "../axiosInstance";

export const getAllUsers = async () => {
  const res = await api.get("/users/get-all");
  return res.data.users.map((user: any) => ({
    userId: user.userId,
    firstName: user.firstName,
    lastName: user.lastName,
    avatar: user.avatar,
  }));
};

export const getMyUser = async () => {
  const res = await api.get("/users/my");
  return res.data.user;
};

export const createUser = async (data: any) => {
  const res = await api.post("/users", data);
  return res.data;
};

export const updateUser = async (id: string, data: any) => {
  const res = await api.patch(`/users/${id}`, data);
  return res.data;
};

export const deleteUser = async (id: string) => {
  const res = await api.delete(`/users/${id}`);
  return res.data;
};

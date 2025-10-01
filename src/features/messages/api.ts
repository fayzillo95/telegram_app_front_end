import api from "../axiosInstance";

export enum ChatType {
  USER_CHAT = "user_chat",
  GROUP_CHAT = "group_chat",
  CHANNEL_CHAT = "channel_chat",
  BOT_CHAT = "bot_chat",
}

const points: Record<ChatType, string> = {
  [ChatType.USER_CHAT]: "user",
  [ChatType.GROUP_CHAT]: "group",
  [ChatType.CHANNEL_CHAT]: "channel",
  [ChatType.BOT_CHAT]: "bot", // agar keyin ishlatmoqchi bo‘lsangiz
};

// === CREATE ===
export const sendMessage = async (data: any, type: ChatType) => {
  const pointer = points[type];
  if (!pointer) throw new Error(`Invalid chat type: ${type}`);
  const res = await api.post(`/messages/${pointer}`, data);
  return res.data;
};

// === GET ALL MESSAGES FOR CHAT ===
export const getMessages = async (chatId: string, type: ChatType) => {
  const pointer = points[type];
  if (!pointer) throw new Error(`Invalid chat type: ${type}`);
  const res = await api.get(`/messages/${pointer}/${chatId}`);
  return res.data.messages;
};

// === UPDATE MESSAGE ===
export const updateMessage = async (id: string, data: any) => {
  const res = await api.patch(`/messages/${id}`, data);
  return res.data;
};

// === DELETE MESSAGE ===
export const deleteMessage = async (id: string) => {
  const res = await api.delete(`/messages/${id}`);
  return res.data;
};

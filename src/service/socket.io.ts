import { create } from "zustand";
import { io, Socket } from "socket.io-client";

export type SocketStoreType = {
  socket: Socket | null;
  connect: (userId: string) => void;
  disconnect: () => void;
};

export const useSocketStore = create<SocketStoreType>((set, get) => ({
  socket: null,

  connect: (userId: string) => {

    if (get().socket) return get().socket;

    const socket = io("http://localhost:15975", {
      withCredentials: true,
      query: { userId },
    });

    set({ socket });
  },

  disconnect: () => {
    const socket = get().socket;
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },
}));

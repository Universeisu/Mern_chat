import { create } from "zustand";
import api from "../service/api.js";
import { useAuthStore } from "./useAuthStore.jsx";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
  users: [],
  messages: [],
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,
  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await api.get("/message/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(
        error.response.data.message ||
          "Something went wrong While fetching user"
      );
    } finally {
      set({ isUserLoading: false });
    }
  },
  getMessages: async (userId) => {
    set({ isMessageLoading: true });
    try {
      const res = await api.get("/message/" + userId);
      set({ messages: res.data });
    } catch (error) {
      toast.error(
        error.response.data.message ||
          "Something went wrong While fetching messages"
      );
    } finally {
      set({ isMessageLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await api.post(
        "/message/send/" + selectedUser._id,
        messageData
      );
      set({ messages: [...messages, res.data] }); //เอาอันเดิมมาใหม่ แล้วเอาอันใหม่มาต่อ
    } catch (error) {
      toast.error(
        error.response.data.message ||
          "Something went wrong While sending message"
      );
    }
  },
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;
    const socket = useAuthStore.getState().socket;
    socket.on("newMessage", (newMessage) => {
      const isMessageSendFromSelectedUser =
        newMessage.senderId === selectedUser._id;
      if (isMessageSendFromSelectedUser) {
        set({ messages: [...get().messages, newMessage] });
      }
    });
  },
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
  setSelectedUser: (selectedUser) => {
    set({ selectedUser });
  },
}));

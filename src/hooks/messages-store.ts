import { create } from "zustand";
import { axiosClient } from "@/utils/axios-helper";

interface MessageState {
  currentReceiver: any;
  setCurrentReceiver: (receiver: any) => void;
  messages: any[];
  setMessages: (messages: any) => void;
  message: any;
  setMessage: (message: any) => void;
  addMessage: (message: any) => void;
  deleteMessage: (id: any) => void;
}

// store for messages
export const useMessagesStore = create<MessageState>((set) => ({
  currentReceiver: null,
  setCurrentReceiver: (receiver: any) => set({ currentReceiver: receiver }),

  messages: [],
  setMessages: (messages: any) => set({ messages }),

  // single message
  message: null,
  setMessage: (message: any) => set({ message }),

  addMessage: (message: any) =>
    set((state) => ({ messages: [...state.messages, message] })),

  deleteMessage: (id: any) =>
    set((state) => ({
      messages: state.messages.filter((message) => message.id !== id),
    })),
}));

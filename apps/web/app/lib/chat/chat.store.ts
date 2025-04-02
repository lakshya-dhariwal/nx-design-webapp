import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { ChatState, Message } from "./chat";


export const useChatWidgetStore = create<ChatState>()(
  devtools(
    persist(
      (set) => ({
        messages: [],
        isGenerating: false,
        addMessage: (message: Message) =>
          set((state: ChatState) => ({ messages: [...state.messages, message] })),
        clearMessages: () => set({ messages: [] }),
        setIsGenerating: (isGenerating:boolean) => set({ isGenerating })
      }),
      { name: "chat-widget-storage" } // Persistent state
    )
  )
);

export default useChatWidgetStore;

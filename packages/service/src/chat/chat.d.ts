export interface Message {
    id: string;
    content: string;
    isBot: boolean;
    timestamp: Date;
    error?: string;
}

export interface ChatState {
    messages: Message[];
    isGenerating: boolean;
    addMessage: (message: Message) => void;
    clearMessages: () => void;
    setIsGenerating: (isGenerating: boolean) => void;
}

export type ChatStore = ChatState;

export type ChatWidgetHook = ChatState & {
    sendMessage: (message: string) => Promise<void>;
};

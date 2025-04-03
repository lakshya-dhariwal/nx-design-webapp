import React, { useState, useEffect } from "react";
import ChatMessage from "../../atoms/ChatMessage";

interface ChatWidgetProps {
    messages: any[];
    isGenerating: boolean;
    sendMessage: (message: string) => void;
    addMessage?: (message: string) => void;
    clearMessages: () => void;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({
    messages,
    isGenerating,
    addMessage,
    sendMessage,
    clearMessages,
}) => {
    const [isOpen, setIsOpen] = useState(true);
    const [currentMessage, setCurrentMessage] = useState("");

    // Update state with the latest messages
    useEffect(() => {
        if (messages.length > 0) {
            setCurrentMessage(""); // Clear input after sending message
        }
    }, [messages]);

    const handleSendMessage = () => {
        if (currentMessage.trim()) {
            sendMessage(currentMessage);
        }
    };

    return (
        <div
            className={`fixed right-0 top-0 h-full w-[400px] transform overflow-y-scroll bg-gray-800/20 text-gray-200 shadow-lg transition-all duration-500 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            style={{ zIndex: 9999 }}
        >
            <div className="flex items-center justify-between bg-primary-600 p-4">
                <span className="text-lg text-white">Chat Assistant</span>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-white"
                >
                    {isOpen ? "Close" : "Open"}
                </button>
            </div>
            <div className="flex flex-col overflow-y-auto p-4">
                {messages.map((message) => (
                    <ChatMessage
                        key={message.id}
                        content={message.content}
                        isBot={message.isBot}
                    />
                ))}
                {isGenerating && (
                    <div className="mt-2 text-white">Bot is typing...</div>
                )}
                <div className="mt-4 flex items-center">
                    <input
                        type="text"
                        className="w-full rounded-lg p-2"
                        placeholder="Type your message..."
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSendMessage();
                            }
                        }}
                    />
                    <button
                        onClick={handleSendMessage}
                        className="ml-2 rounded bg-blue-500 p-2 text-white"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatWidget;

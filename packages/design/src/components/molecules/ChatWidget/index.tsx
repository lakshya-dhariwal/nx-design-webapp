import React, { useState, useEffect } from "react";
import ChatMessage from "../../atoms/ChatMessage";


type ChatMessage = {
  id: string;
  content: string;
  isBot: boolean;
  timestamp?: Date;
  error?: string;
}

interface ChatWidgetProps {
  messages: ChatMessage[];
  isGenerating: boolean;
  sendMessage: (message: string) => void;
  clearMessages: () => void;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({
  messages,
  isGenerating,
  sendMessage,
  clearMessages,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [currentMessage, setCurrentMessage] = useState<string>("");

  // Clear input after new message is added
  useEffect(() => {
    if (messages.length > 0) {
      setCurrentMessage(""); // Clear input after sending message
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (currentMessage.trim()) {
      await sendMessage(currentMessage);
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 w-[400px] h-full bg-gray-800 shadow-lg transform transition-all duration-500 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      style={{ zIndex: 9999 }}
    >
      <div className="flex justify-between items-center p-4 bg-primary-600">
        <span className="text-white text-lg">Chat Assistant</span>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
          {isOpen ? "Close" : "Open"}
        </button>
      </div>
      <div className="flex flex-col p-4 overflow-y-auto">
        {messages.map((message) => (
          <ChatMessage key={message.id} content={message.content} isBot={message.isBot} />
        ))}
        {isGenerating && (
          <div className="text-white mt-2">Bot is typing...</div>
        )}
        <div className="flex items-center mt-4">
          <input
            type="text"
            className="p-2 w-full rounded-lg"
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
            className="bg-blue-500 text-white p-2 rounded ml-2"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;

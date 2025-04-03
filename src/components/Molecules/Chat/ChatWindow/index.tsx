import { ChatBubble, ChatInput } from "@/components";
import * as React from "react";
import { tv } from "tailwind-variants";

export interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
  error?: string;
}

interface ChatWindowProps {
  onSendMessage: (message: string) => Promise<void>;
  messages: Message[];
  isGenerating?: boolean;
  title?: string;
  placeholder?: string;
  className?: string;
  onRetry?: (messageId: string) => void;
  headerActions?: React.ReactNode;
  chatFooter?: React.ReactNode;
  welcomeMessage?: string | React.ReactNode;
}

const chatWindowContainer = tv({
  base: "flex flex-col w-full h-full bg-background-900 overflow-hidden",
});

const header = tv({
  base: "p-4 border-b border-white/40 flex justify-between items-center",
});

const messageContainer = tv({
  base: "flex-1 overflow-y-auto p-4 space-y-4",
});

const inputContainer = tv({
  base: "p-4 border-t border-white/40",
});

const ChatWindow: React.FC<ChatWindowProps> = ({
  onSendMessage,
  messages,
  isGenerating = false,
  title = "Chat Assistant",
  placeholder = "Type a message...",
  className,
  onRetry,
  headerActions,
  chatFooter,
  welcomeMessage,
}) => {
  const [isSending, setIsSending] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (message: string) => {
    try {
      setIsSending(true);
      await onSendMessage(message);
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSending(false);
    }
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className={chatWindowContainer({ className })}>
      {/* Header */}
      <div className={header()}>
        <h3 className="heading-4 text-white">{title}</h3>
        {headerActions}
      </div>

      {/* Messages */}
      <div className={messageContainer()}>
        {messages.length === 0 && welcomeMessage && (
          <div className="text-lg text-center mx-auto text-gray-300 my-4">
            {welcomeMessage}
          </div>
        )}
        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            content={message.content}
            isBot={message.isBot}
            error={message.error}
            timestamp={message.timestamp}
            onRetry={onRetry ? () => onRetry(message.id) : undefined}
          />
        ))}
        {isGenerating && (
          <ChatBubble
            content=""
            isBot={true}
            isLoading={true}
            timestamp={new Date()}
          />
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className={inputContainer()}>
        <ChatInput
          onSendMessage={handleSendMessage}
          isDisabled={isGenerating}
          isSending={isSending}
          placeholder={placeholder}
        />
        {chatFooter}
      </div>
    </div>
  );
};

export default ChatWindow;

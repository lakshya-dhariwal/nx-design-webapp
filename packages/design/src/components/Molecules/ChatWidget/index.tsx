import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { tv } from "tailwind-variants";
import ChatInput from "@/components/Molecules/ChatInput";
import ChatMessage from "@/components/Atoms/ChatMessage";

export interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
  error?: string;
}

interface ChatWidgetProps {
  onSendMessage: (message: string) => Promise<void>;
  messages: Message[];
  isGenerating?: boolean;
  title?: string;
  placeholder?: string;
  className?: string;
  onRetry?: (messageId: string) => void;
  defaultIsOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

const chatWidget = tv({
  base: "w-[380px] max-h-[600px] bg-background-900 rounded-2xl shadow-lg flex flex-col",
  variants: {
    position: {
      fixed: "fixed bottom-24 right-4",
      static: "relative",
    },
  },
  defaultVariants: {
    position: "fixed",
  },
});

const toggleButton = tv({
  base: "fixed bottom-4 right-4 p-4 bg-primary-600 hover:bg-primary-700 rounded-full shadow-lg text-white transition-colors",
});

const header = tv({
  base: "p-4 border-b border-white/40 flex justify-between items-center",
});

const closeButton = tv({
  base: "p-2 hover:bg-white/10 rounded-lg transition-colors text-white",
});

const messageContainer = tv({
  base: "flex-1 overflow-y-auto p-4 space-y-4",
});

const inputContainer = tv({
  base: "p-4 border-t border-white/40",
});

const ChatWidget: React.FC<ChatWidgetProps> = ({
  onSendMessage,
  messages,
  isGenerating = false,
  title = "Chat Assistant",
  placeholder = "Type a message...",
  className,
  onRetry,
  defaultIsOpen = false,
  onOpenChange,
}) => {
  const [isOpen, setIsOpen] = React.useState(defaultIsOpen);
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

  const handleToggle = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    onOpenChange?.(newIsOpen);
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  React.useEffect(() => {
    if (defaultIsOpen !== isOpen) {
      setIsOpen(defaultIsOpen);
    }
  }, [defaultIsOpen]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={chatWidget({ className })}
          >
            {/* Header */}
            <div className={header()}>
              <h3 className="heading-4 text-white">{title}</h3>
              <button onClick={handleToggle} className={closeButton()}>
                <IoClose size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className={messageContainer()}>
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  content={message.content}
                  isBot={message.isBot}
                  error={message.error}
                  timestamp={message.timestamp}
                  onRetry={onRetry ? () => onRetry(message.id) : undefined}
                />
              ))}
              {isGenerating && (
                <ChatMessage
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={handleToggle}
        className={toggleButton()}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <IoChatbubbleEllipses size={24} />
      </motion.button>
    </>
  );
};

export default ChatWidget;

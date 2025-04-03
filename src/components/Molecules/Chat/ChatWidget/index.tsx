import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoChatbubbleEllipses, IoClose } from "react-icons/io5";
import { tv } from "tailwind-variants";
import ChatWindow from "../ChatWindow";

export interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
  error?: string;
}

export type DisplayMode = "popup" | "sidebar";

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
  displayMode?: DisplayMode;
  chatFooter?: React.ReactNode;
  welcomeMessage?: string | React.ReactNode;
}

const chatWidgetContainer = tv({
  base: "bg-background-900 flex flex-col shadow-lg",
  variants: {
    displayMode: {
      popup:
        "w-[380px] max-h-[600px] border border-gray-200/70 rounded-2xl fixed bottom-24 right-4",
      sidebar: "w-[320px] h-full fixed right-0 top-0 border-l border-white/20",
    },
  },
  defaultVariants: {
    displayMode: "popup",
  },
});

const toggleButton = tv({
  base: "fixed p-4 bg-primary-600 hover:bg-primary-700 rounded-full shadow-lg text-white transition-colors",
  variants: {
    displayMode: {
      popup: "bottom-4 right-4",
      sidebar: "bottom-4 right-8",
    },
  },
  defaultVariants: {
    displayMode: "popup",
  },
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
  displayMode = "popup",
  chatFooter,
  welcomeMessage,
}) => {
  const [isOpen, setIsOpen] = React.useState(defaultIsOpen);

  const handleToggle = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    onOpenChange?.(newIsOpen);
  };

  React.useEffect(() => {
    if (defaultIsOpen !== isOpen) {
      setIsOpen(defaultIsOpen);
    }
  }, [defaultIsOpen]);

  // Animation variants based on display mode
  const animationVariants = {
    popup: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
    },
    sidebar: {
      initial: { opacity: 0, x: 100 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 100 },
    },
  };

  const headerActions = (
    <button
      onClick={handleToggle}
      className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
    >
      <IoClose size={20} />
    </button>
  );

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={animationVariants[displayMode].initial}
            animate={animationVariants[displayMode].animate}
            exit={animationVariants[displayMode].exit}
            className={chatWidgetContainer({ displayMode, className })}
          >
            <ChatWindow
              onSendMessage={onSendMessage}
              messages={messages}
              isGenerating={isGenerating}
              title={title}
              placeholder={placeholder}
              onRetry={onRetry}
              headerActions={headerActions}
              chatFooter={chatFooter}
              welcomeMessage={welcomeMessage}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={handleToggle}
        className={toggleButton({ displayMode })}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <IoChatbubbleEllipses size={24} />
      </motion.button>
    </>
  );
};

export default ChatWidget;

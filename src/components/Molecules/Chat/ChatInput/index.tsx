import * as React from "react";
import { tv } from "tailwind-variants";
import { IoSend } from "react-icons/io5";
import { motion } from "framer-motion";

interface ChatInputProps {
  onSendMessage: (message: string) => Promise<void>;
  isDisabled?: boolean;
  isSending?: boolean;
  placeholder?: string;
  className?: string;
}

const inputClass = tv({
  base: "body-3 w-full rounded-xl p-4 bg-white bg-opacity-10 ring-0 outline-0 focus:ring-1 active:ring-1 focus:ring-white active:ring-white transition-all ease-in-out duration-300 text-white pr-12",
  variants: {
    disabled: {
      true: "opacity-50 cursor-not-allowed",
      false: "",
    },
  },
});

const buttonClass = tv({
  base: "absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-all duration-300 text-white",
  variants: {
    active: {
      true: "bg-primary-600 hover:bg-primary-700",
      false: "bg-white/10 cursor-not-allowed",
    },
  },
});

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isDisabled = false,
  isSending = false,
  placeholder = "Type a message...",
  className,
}) => {
  const [message, setMessage] = React.useState("");
  const isInputDisabled = isDisabled || isSending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isInputDisabled) {
      try {
        await onSendMessage(message.trim());
        setMessage("");
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className} w-full`}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={isInputDisabled}
        placeholder={isSending ? "Sending message..." : placeholder}
        className={inputClass({ disabled: isInputDisabled })}
      />
      <button
        type="submit"
        disabled={!message.trim() || isInputDisabled}
        className={buttonClass({
          active: !!message.trim() && !isInputDisabled,
        })}
      >
        {isSending ? (
          //todo: fix rillup build error: unabale to build LoadingDots
          // <LoadingDots size="md" />
          <div className={"flex space-x-1"}>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className={"w-2 h-2 rounded-full bg-gray-200"}
                animate={{
                  opacity: [0.4, 1, 0.4],
                  scale: [0.9, 1.1, 0.9],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        ) : (
          <IoSend size={20} />
        )}
      </button>
    </form>
  );
};

export default ChatInput;

import * as React from "react";
import { tv } from "tailwind-variants";
import { IoWarning } from "react-icons/io5";
import { motion } from "framer-motion";
import LoadingDots from "@/components/Loaders/LoadingDots";

export interface ChatMessageProps {
  content: string;
  isBot?: boolean;
  isLoading?: boolean;
  error?: string;
  timestamp?: Date;
  className?: string;
  onRetry?: () => void;
}

const messageClass = tv({
  base: "rounded-xl p-4 max-w-[80%] break-words body-3",
  variants: {
    type: {
      user: "bg-primary-600 text-white ml-auto",
      bot: "bg-white bg-opacity-10 text-white",
      error: "bg-error-600/20 text-error-600 border border-error-600/50",
    },
  },
});

const ChatMessage: React.FC<ChatMessageProps> = ({
  content,
  isBot = false,
  isLoading = false,
  error,
  timestamp = new Date(),
  className,
  onRetry,
}) => {
  return (
    <div
      className={`flex flex-col ${isBot ? "items-start" : "items-end"} mb-4`}
    >
      <div
        className={messageClass({
          type: error ? "error" : isBot ? "bot" : "user",
          className,
        })}
      >
        {isLoading ? (
          <LoadingDots size="sm" />
        ) : error ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <IoWarning className="flex-shrink-0" />
              <span>{error}</span>
            </div>
            {onRetry && (
              <button
                onClick={onRetry}
                className="text-sm text-error-600 hover:text-error-500 underline underline-offset-2"
              >
                Retry
              </button>
            )}
          </div>
        ) : (
          content
        )}
      </div>
      <span className="text-white/60 text-xs mt-1">
        {timestamp.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
    </div>
  );
};

export default ChatMessage;

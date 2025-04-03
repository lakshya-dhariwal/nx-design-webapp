import * as React from "react";
import { tv } from "tailwind-variants";
import { IoWarning } from "react-icons/io5";
import { motion } from "framer-motion";

export interface ChatMessageProps {
  content: string;
  isBot?: boolean;
  isLoading?: boolean;
  error?: string;
  timestamp?: Date;
  className?: string;
  onRetry?: () => void;
  header?: string | React.ReactNode;
}

const messageClass = tv({
  base: "rounded-xl p-4 max-w-[80%] break-words body-3 my-2.5",
  variants: {
    type: {
      user: "bg-primary-600 text-white ml-auto ",
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
  header,
}) => {
  return (
    <div className={`flex flex-col ${isBot ? "items-start" : "items-end"} `}>
      <div
        className={`flex flex-col ${isBot ? "items-start" : "items-end"} mb-1 text-gray-200`}
      >
        {header}
      </div>
      <div
        className={messageClass({
          type: error ? "error" : isBot ? "bot" : "user",
          className,
        })}
      >
        {isLoading ? (
          //todo: fix rillup build error: unabale to build LoadingDots
          // <LoadingDots size="sm" />
          <div className={"flex space-x-1"}>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className={"w-1.5 h-1.5 rounded-full bg-gray-200"}
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
        ) : error ? (
          <div className="flex flex-col items-center justify-center gap-2">
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
        {!isLoading &&
          timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
      </span>
    </div>
  );
};

export default ChatMessage;

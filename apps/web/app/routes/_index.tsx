import { FC } from "react";
// import {ChatWidget} from "dist/packages/hound";
import { ChatWidget } from "@mable/hound";
import useChatWidget from "../lib/chat/"; 
import React from "react";

const ChatPage: FC = () => {
  const { messages, isGenerating, sendMessage } = useChatWidget();

  const handleSendMessage = async (message: string) => {
    await sendMessage(message);
  };

  return (
    <div className="container mx-auto p-4">
      <ChatWidget
        onSendMessage={handleSendMessage}
        messages={messages}
        isGenerating={isGenerating}
        title="Campaign Manger"
        placeholder="Type your message..."
      />
    </div>
  );
};

export default ChatPage;

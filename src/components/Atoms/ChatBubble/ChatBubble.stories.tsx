import type { Meta, StoryObj } from "@storybook/react";
import ChatMessage from "./index";

const meta: Meta<typeof ChatMessage> = {
  title: "Atoms/ChatBubble",
  component: ChatMessage,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ChatMessage>;

export const UserMessage: Story = {
  args: {
    header: "John Doe",
    content: "Hello! How can I help you today?",
    isBot: false,
    timestamp: new Date(),
  },
};

export const BotMessage: Story = {
  args: {
    header: (
      <div className="flex flex-row gap-2 items-center w-fit">
        {" "}
        <div className="h-4 w-4 rounded-full bg-purple-300"></div>{" "}
        <h1>ChatGPT</h1>
      </div>
    ),
    content: "I am an AI assistant. I can help you with various tasks.",
    isBot: true,
    timestamp: new Date(),
  },
};

export const LoadingMessage: Story = {
  args: {
    content: "",
    isBot: true,
    isLoading: true,
    timestamp: new Date(),
  },
};

export const ErrorMessage: Story = {
  args: {
    content: "Failed message",
    isBot: true,
    error: "Failed to generate response. Please try again.",
    timestamp: new Date(),
    onRetry: () => console.log("Retrying..."),
  },
};

export const LongMessage: Story = {
  args: {
    content:
      "This is a very long message that should wrap properly when it exceeds the maximum width of the chat bubble. It demonstrates how the component handles long content and maintains readability.",
    isBot: true,
    timestamp: new Date(),
  },
};

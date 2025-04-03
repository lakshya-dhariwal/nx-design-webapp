import type { Meta, StoryObj } from "@storybook/react";
import ChatMessage from "./index";

const meta: Meta<typeof ChatMessage> = {
  title: "Atoms/ChatMessage",
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
    content: "Hello! How can I help you today?",
    isBot: false,
  },
};

export const BotMessage: Story = {
  args: {
    content: "I am an AI assistant. I can help you with various tasks.",
    isBot: true,
  },
};

export const LoadingMessage: Story = {
  args: {
    content: "",
    isBot: true,
    isLoading: true,
  },
};

export const ErrorMessage: Story = {
  args: {
    content: "Failed message",
    isBot: true,
    error: "Failed to generate response. Please try again.",
    onRetry: () => console.log("Retrying..."),
  },
};

export const LongMessage: Story = {
  args: {
    content:
      "This is a very long message that should wrap properly when it exceeds the maximum width of the chat bubble. It demonstrates how the component handles long content and maintains readability.",
    isBot: true,
  },
};

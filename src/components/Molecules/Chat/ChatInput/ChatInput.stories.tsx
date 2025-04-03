import type { Meta, StoryObj } from "@storybook/react";
import ChatInput from "./index";

const meta: Meta<typeof ChatInput> = {
  title: "Molecules/Chat/ChatInput",
  component: ChatInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ChatInput>;

const mockSendMessage = async (message: string) => {
  console.log("Message sent:", message);
  await new Promise((resolve) => setTimeout(resolve, 1000));
};

export const Default: Story = {
  args: {
    onSendMessage: mockSendMessage,
    placeholder: "Type a message...",
  },
};

export const Disabled: Story = {
  args: {
    onSendMessage: mockSendMessage,
    isDisabled: true,
    placeholder: "AI is generating a response...",
  },
};

export const Sending: Story = {
  args: {
    onSendMessage: mockSendMessage,
    isSending: true,
    placeholder: "Type a message...",
  },
};

export const CustomPlaceholder: Story = {
  args: {
    onSendMessage: mockSendMessage,
    placeholder: "Ask me anything!",
  },
};

import type { Meta, StoryObj } from "@storybook/react";
import ChatWidget from "./index";
import { useState } from "react";

const meta: Meta<typeof ChatWidget> = {
  title: "Molecules/ChatWidget",
  component: ChatWidget,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ height: "100vh", background: "#1a1a1a" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

// Create a wrapper component to handle state
const ChatWidgetWrapper = (args: any) => {
  const [isOpen, setIsOpen] = useState(true); // Set to true to show chat by default
  return (
    <ChatWidget {...args} defaultIsOpen={isOpen} onOpenChange={setIsOpen} />
  );
};

const sampleMessages = [
  {
    id: "1",
    content: "Hello! How can I help you today?",
    isBot: true,
    timestamp: new Date(Date.now() - 5000),
  },
  {
    id: "2",
    content: "I have a question about React hooks.",
    isBot: false,
    timestamp: new Date(Date.now() - 4000),
  },
  {
    id: "3",
    content:
      "Sure! I'd be happy to help you with React hooks. What would you like to know?",
    isBot: true,
    timestamp: new Date(Date.now() - 3000),
  },
];

const mockSendMessage = async (message: string): Promise<void> => {
  console.log("Message sent:", message);
  await new Promise((resolve) => setTimeout(resolve, 1000));
};

type Story = StoryObj<typeof ChatWidget>;

export const Default: Story = {
  render: (args) => <ChatWidgetWrapper {...args} />,
  args: {
    messages: sampleMessages,
    onSendMessage: mockSendMessage,
    title: "Chat Assistant",
  },
};

export const GeneratingResponse: Story = {
  render: (args) => <ChatWidgetWrapper {...args} />,
  args: {
    messages: sampleMessages,
    onSendMessage: mockSendMessage,
    isGenerating: true,
    title: "Chat Assistant",
  },
};

export const Empty: Story = {
  render: (args) => <ChatWidgetWrapper {...args} />,
  args: {
    messages: [],
    onSendMessage: mockSendMessage,
    title: "Chat Assistant",
  },
};

export const CustomTitle: Story = {
  render: (args) => <ChatWidgetWrapper {...args} />,
  args: {
    messages: sampleMessages,
    onSendMessage: mockSendMessage,
    title: "AI Support",
    placeholder: "Ask your question...",
  },
};

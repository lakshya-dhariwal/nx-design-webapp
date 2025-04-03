import type { Meta, StoryObj } from "@storybook/react";
import ChatWidget from "../ChatWidget";
import { useState } from "react";

const meta: Meta<typeof ChatWidget> = {
  title: "Molecules/Chat/ChatWidget",
  component: ChatWidget,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ height: "60vh", background: "#1a1a1a" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

// Create a wrapper component to handle state
const ChatWidgetWrapper = (args: any) => {
  const [isOpen, setIsOpen] = useState(args.defaultIsOpen || false);
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

export const PopupClosed: Story = {
  render: (args) => <ChatWidgetWrapper {...args} />,
  args: {
    messages: sampleMessages,
    onSendMessage: mockSendMessage,
    title: "Chat Assistant",
    displayMode: "popup",
    defaultIsOpen: false,
  },
};

export const PopupOpen: Story = {
  render: (args) => <ChatWidgetWrapper {...args} />,
  args: {
    messages: sampleMessages,
    onSendMessage: mockSendMessage,
    title: "Chat Assistant",
    displayMode: "popup",
    defaultIsOpen: true,
  },
};

export const SidebarClosed: Story = {
  render: (args) => <ChatWidgetWrapper {...args} />,
  args: {
    messages: sampleMessages,
    onSendMessage: mockSendMessage,
    title: "Chat Assistant",
    displayMode: "sidebar",
    defaultIsOpen: false,
  },
};

export const SidebarOpen: Story = {
  render: (args) => <ChatWidgetWrapper {...args} />,
  args: {
    messages: sampleMessages,
    onSendMessage: mockSendMessage,
    title: "Chat Assistant",
    displayMode: "sidebar",
    defaultIsOpen: true,
  },
};

export const GeneratingResponse: Story = {
  render: (args) => <ChatWidgetWrapper {...args} />,
  args: {
    messages: sampleMessages,
    onSendMessage: mockSendMessage,
    isGenerating: true,
    title: "Chat Assistant",
    displayMode: "popup",
    defaultIsOpen: true,
  },
};

export const CustomTitle: Story = {
  render: (args) => <ChatWidgetWrapper {...args} />,
  args: {
    messages: sampleMessages,
    onSendMessage: mockSendMessage,
    title: "AI Support",
    placeholder: "Ask your question...",
    displayMode: "popup",
    defaultIsOpen: true,
  },
};

export const WithFooter: Story = {
  render: (args) => <ChatWidgetWrapper {...args} />,
  args: {
    messages: sampleMessages,
    onSendMessage: mockSendMessage,
    title: "Chat Assistant",
    displayMode: "popup",
    defaultIsOpen: true,
    chatFooter: (
      <div className="mt-2 text-xs text-white/60 text-center">
        Powered by AI •{" "}
        <a href="#" className="underline hover:text-white">
          Terms of use
        </a>
      </div>
    ),
  },
};

export const EmptyChat: Story = {
  render: (args) => <ChatWidgetWrapper {...args} />,
  args: {
    messages: [],
    onSendMessage: mockSendMessage,
    title: "Chat Assistant",
    displayMode: "popup",
    defaultIsOpen: true,
    welcomeMessage: "Welcome to the chat! How can I assist you today?",
  },
};

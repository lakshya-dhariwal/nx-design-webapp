import type { Meta, StoryObj } from "@storybook/react";
import ChatWindow from "../ChatWindow";

const meta: Meta<typeof ChatWindow> = {
  title: "Molecules/Chat/ChatWindow",
  component: ChatWindow,
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
  {
    id: "4",
    content: "How do I use useState properly with TypeScript?",
    isBot: false,
    timestamp: new Date(Date.now() - 2000),
  },
  {
    id: "5",
    content:
      "When using useState with TypeScript, you can provide a type parameter to help TypeScript understand the type of state you're working with. Here's an example:\n\n```typescript\nconst [count, setCount] = useState<number>(0);\n```\n\nThis explicitly tells TypeScript that count is a number.",
    isBot: true,
    timestamp: new Date(Date.now() - 1000),
  },
];

const mockSendMessage = async (message: string): Promise<void> => {
  console.log("Message sent:", message);
  await new Promise((resolve) => setTimeout(resolve, 1000));
};

type Story = StoryObj<typeof ChatWindow>;

export const Default: Story = {
  args: {
    messages: sampleMessages,
    onSendMessage: mockSendMessage,
    title: "Chat Assistant",
  },
};

export const GeneratingResponse: Story = {
  args: {
    messages: sampleMessages,
    onSendMessage: mockSendMessage,
    isGenerating: true,
    title: "Chat Assistant",
  },
};

export const Empty: Story = {
  args: {
    messages: [],
    onSendMessage: mockSendMessage,
    title: "Chat Assistant",
  },
};

export const WithCustomHeader: Story = {
  args: {
    messages: sampleMessages,
    onSendMessage: mockSendMessage,
    title: "AI Support",
    placeholder: "Ask your question...",
    headerActions: (
      <div className="flex gap-2">
        <button className="p-2 hover:bg-white/10 rounded-lg text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
        <button className="p-2 hover:bg-white/10 rounded-lg text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </button>
      </div>
    ),
  },
};

export const WithFooter: Story = {
  args: {
    messages: sampleMessages,
    onSendMessage: mockSendMessage,
    title: "Chat Assistant",
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

export const WithError: Story = {
  args: {
    messages: [
      ...sampleMessages.slice(0, 4),
      {
        id: "5",
        content: "I'm sorry, I couldn't process your request at this time.",
        isBot: true,
        timestamp: new Date(Date.now() - 1000),
        error: "Connection error",
      },
    ],
    onSendMessage: mockSendMessage,
    title: "Chat Assistant",
    onRetry: (messageId) => console.log("Retry message:", messageId),
  },
};

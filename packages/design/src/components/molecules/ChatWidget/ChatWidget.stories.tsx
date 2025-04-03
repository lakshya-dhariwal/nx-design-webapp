import { Meta, StoryObj } from "@storybook/react";
import ChatWidget from "./index";

const meta: Meta<typeof ChatWidget> = {
    title: "Molecules/ChatWidget",
    component: ChatWidget,
    parameters: {
        layout: "fullscreen",
        componentSubtitle:
            "ChatWidget is a component for displaying chat messages, allowing users to interact with a chatbot.",
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

const mockSendMessage = (message: string) => {
    console.log("Sent message:", message);
};

const mockAddMessage = (message: string) => {
    console.log("Added message:", message);
};

const mockClearMessages = () => {
    console.log("Messages cleared");
};

// Default ChatWidget story
export const Default: Story = {
    args: {
        messages: [
            { id: "1", content: "Hello, how can I help you?", isBot: true },
            { id: "2", content: "I need help with my account.", isBot: false },
        ],
        isGenerating: false,
        addMessage: mockAddMessage,
        sendMessage: mockSendMessage,
        clearMessages: mockClearMessages,
    },
};

// ChatWidget with loading state
export const GeneratingState: Story = {
    args: {
        messages: [
            { id: "1", content: "Hello, how can I help you?", isBot: true },
            { id: "2", content: "I need help with my account.", isBot: false },
        ],
        isGenerating: true,
        addMessage: mockAddMessage,
        sendMessage: mockSendMessage,
        clearMessages: mockClearMessages,
    },
};

// ChatWidget with no messages
export const NoMessages: Story = {
    args: {
        messages: [],
        isGenerating: false,
        addMessage: mockAddMessage,
        sendMessage: mockSendMessage,
        clearMessages: mockClearMessages,
    },
};

// ChatWidget with different size and styles
export const SmallSize: Story = {
    args: {
        messages: [
            { id: "1", content: "Hello, how can I help you?", isBot: true },
            { id: "2", content: "I need help with my account.", isBot: false },
        ],
        isGenerating: false,
        addMessage: mockAddMessage,
        sendMessage: mockSendMessage,
        clearMessages: mockClearMessages,
    },
    parameters: {
        layout: "centered", // Adjusting layout to center the component
    },
};

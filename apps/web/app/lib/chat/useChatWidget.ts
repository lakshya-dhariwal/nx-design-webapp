import { ChatWidgetHook } from "./chat";
import useChatWidgetStore from "./chat.store";

const useChatWidget = (): ChatWidgetHook => {
  const {
    messages,
    isGenerating,
    addMessage,
    clearMessages,
    setIsGenerating,

  } = useChatWidgetStore();

  const sendMessage = async (message: string) => {
    // Add user message to the messages state
    addMessage({ id: new Date().toISOString(), content: message, isBot: false , timestamp: new Date()});

    setIsGenerating(true);

    try {
      const response = await fetch('/api/completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: message }),
      });

      const result = await response.text();
      addMessage({ id: new Date().toISOString(), content: result, isBot: true , timestamp: new Date()});

    } catch (error) {
      console.error('Error fetching response:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    messages,
    isGenerating,
    addMessage,
    clearMessages,
    setIsGenerating,
    sendMessage,
  };
};

export default useChatWidget;
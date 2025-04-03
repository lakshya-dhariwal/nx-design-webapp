
import "@mable/design/styles/globals.css";
import useChatWidget from "@mable/service/chat/chat.hook";
import ChatWidget from "@mable/design/components/molecules/ChatWidget";

export default function Dashborad() {
    const {
        messages,
        isGenerating,
        clearMessages,
        setIsGenerating,
        sendMessage,
    } = useChatWidget();

    return (
        <div className=" m-4">
            <h1 className="text-lg"> Campiagn Hero ☄️</h1>

            <h2></h2>
            <div className="w-[300px] mx-auto">
                <ChatWidget
                    messages={messages}
                    isGenerating={isGenerating}
                    sendMessage={sendMessage}
                    clearMessages={clearMessages}
                />
            </div>
        </div>
    );
}

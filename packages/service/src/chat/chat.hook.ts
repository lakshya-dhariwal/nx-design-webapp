import { useEffect } from "react";
import { useGemini } from "../gemini/gemini.hook";
import { geminiModel } from "../instances/firebase.instance";
import { ChatWidgetHook } from "./chat";
import useChatWidgetStore from "./chat.store";
import { ChatSession } from "@firebase/vertexai";
import { getCampaignDataAPI } from "../gemini/tools/campaign.tool";

const useChatWidget = (): ChatWidgetHook => {
    const {
        messages,
        isGenerating,
        addMessage,
        clearMessages,
        setIsGenerating,
    } = useChatWidgetStore();
    let chat: ChatSession | null = null;

    // useEffect(() => {
    //   if(messages.length > 0) {
    //      chat = geminiModel.startChat();
    //   }
    // },[messages]);

    const sendMessage = async (message: string) => {
        addMessage({
            id: new Date().toISOString(),
            content: message,
            isBot: false,
            timestamp: new Date(),
        });

        setIsGenerating(true);

        try {
            if (!chat) {
                chat = geminiModel.startChat();
            }

            let result = await chat.sendMessage(`userid :1 = ${message}`);
            const functionCalls = result.response.functionCalls();
            let functionCall;
            let functionResult: any = [];

            // When the model responds with one or more function calls, invoke the function(s).
            if (functionCalls) {
                if (functionCalls.length > 0) {
                    for (const call of functionCalls) {
                        if (call.name === "getCampaignData") {
                            const toolCallResult = await getCampaignDataAPI({
                                ...call.args,
                            });
                            functionResult = {
                                campaignDetails: toolCallResult,
                            };
                            functionCall = call;
                        }
                    }
                }
                // update result with message generated after function call, in case of no function call result remians unchanged
                result = await chat.sendMessage([
                    {
                        functionResponse: {
                            name: functionCall?.name ?? "",
                            response: functionResult,
                        },
                    },
                ]);
            }

            const text = result.response.text();
            addMessage({
                id: new Date().toISOString(),
                content: text,
                isBot: true,
                timestamp: new Date(),
            });
        } catch (error) {
            console.error("Error fetching response:", error);
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

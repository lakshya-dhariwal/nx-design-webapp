import { getCampaignDataFunctionDeclaration } from "./tools/campaign.tool";
import { GeminiHook } from "./gemini";

export const useGemini = (): GeminiHook => {
    const aiFunctionTools = [
        {
            functionDeclarations: [getCampaignDataFunctionDeclaration],
        },
    ];

    return { aiFunctionTools };
};

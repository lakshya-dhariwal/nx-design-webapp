import { FunctionDeclarationsTool } from "firebase/vertexai";


export const getCampaignDataFunctionDeclaration = {
    name: "getCampaignData",
    parameters: {
      type: "object", 
      description:
      "Get the current active campaign data in an array with campaign data like roi, impressions, cost , clicks for each cmapign together in an array",
      properties: {
        userId: {
          type: "string",
          description: "The user id of the user",
        },
      },
      required: ["userId"], 
    },
  };


export const getCampaignDataAPI = ({userid = '1'}) => {
    return [
        {
            userid,
            id: 1,
            name: 'Campaign 1',
            impressions: 100000,
            clicks: 5000,
            conversions: 120,
            conversionRate: 2.4,
            cost: 10000,
            roi: 3.0,
        },
        {
            userid,
            id: 2,
            name: 'Campaign 2',
            impressions: 120000,
            clicks: 6000,
            conversions: 150,
            conversionRate: 2.5,
            cost: 12000,
            roi: 2.8,
        },
        {
            userid,
            id: 3,
            name: 'Campaign 3',
            impressions: 150000,
            clicks: 7500,
            conversions: 180,
            conversionRate: 2.8,
            cost: 15000,
            roi: 3.2,
        },
    ];
}
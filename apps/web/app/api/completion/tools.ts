import { tool } from "ai";

export const getCampaigns = tool({
    description: 'Retrieve users ad campaign data including info like roi clicks impressions clicks conversion and rates with a particular campaign id or name. will come in a array result of all active campaigns',
    execute: async () => {
        return [
            {
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
                id: 3,
                name: 'Campaign 3',
                impressions: 150000,
                clicks: 7500,
                conversions: 180,
                conversionRate: 2.8,
                cost: 15000,
                roi: 3.2,
            },
        ]; // Returning mock data for campaigns
    },
});
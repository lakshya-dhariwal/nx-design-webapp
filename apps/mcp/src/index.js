import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
    ListToolsRequestSchema,
    CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import dotenv from "dotenv";
import { openai } from "@ai-sdk/openai"; // OpenAI SDK (replace with any other models you want to use)

dotenv.config(); // Load environment variables

// Define the mock campaign data
const mockCampaigns = [
    {
        id: 1,
        name: "Campaign 1",
        impressions: 100000,
        clicks: 5000,
        conversions: 120,
        conversionRate: 2.4,
        cost: 10000,
        roi: 3.0,
    },
    {
        id: 2,
        name: "Campaign 2",
        impressions: 120000,
        clicks: 6000,
        conversions: 150,
        conversionRate: 2.5,
        cost: 12000,
        roi: 2.8,
    },
    {
        id: 3,
        name: "Campaign 3",
        impressions: 150000,
        clicks: 7500,
        conversions: 180,
        conversionRate: 2.8,
        cost: 15000,
        roi: 3.2,
    },
];

// Initialize the MCP server
const server = new Server(
    {
        name: "mock-campaigns-server",
        version: "1.0.0",
    },
    {
        capabilities: {
            tools: {},
        },
    }
);

// Tool to get campaign data
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "getCampaigns",
                description: "Retrieve mock ad campaign data",
                inputSchema: {
                    type: "object",
                    properties: {},
                },
            },
        ],
    };
});

// Tool to handle campaign data requests
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    try {
        if (request.params.name === "getCampaigns") {
            return {
                content: [
                    {
                        type: "json",
                        json: mockCampaigns,
                    },
                ],
            };
        } else {
            throw new Error("Unknown tool requested");
        }
    } catch (error) {
        console.error("Error processing tool request:", error);
        return {
            content: [
                {
                    type: "text",
                    text: `Error: ${error.message}`,
                },
            ],
            isError: true,
        };
    }
});

// Start the server with stdio transport
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.log("MCP Server is running on stdio...");
}

main().catch((error) => {
    console.error("Server startup error:", error);
    process.exit(1);
});

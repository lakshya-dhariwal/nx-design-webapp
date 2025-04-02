import { experimental_createMCPClient, generateText } from 'ai';
import { Experimental_StdioMCPTransport } from 'ai/mcp-stdio';
import { openai } from '@ai-sdk/openai';
import { getCampaigns } from './tools';

export async function POST(req: Request) {
    const { prompt }: { prompt: string } = await req.json();

    // Commented out MCP server integration for now
    /*
    try {
      // Initialize MCP client and fetch tools (commented out)
      const transport = new Experimental_StdioMCPTransport({
        command: 'node',
        args: ['apps/mcp/src/index.js'],  // Path to your MCP server
      });
  
      const client = await experimental_createMCPClient({
        transport,
      });
  
      const tools = await client.tools();
      await client.close();  // Close the MCP client when done
      */

    try {
        const response = await generateText({
            model: openai('gpt-4o'),
            tools: {
                getCampaigns,
            },
            prompt: prompt,
        });

        return new Response(response.text);
    } catch (error) {
        console.error('Error:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}
# How to Run

- In toot do yarn , nx will install the packages for all the apps and packages
- To run a specific command on a package/app , run : `nx command target`.

Example, for Design System

- Build: `nx build design`
- Storybook `nx storybook design`
- Web app `nx serve web`

# Overview

## Design System Bundling with Rollup

- The old generate_index.sh script has been converted to a plugin in rollup
- Rollup will give us a configurable build system rather than CLI command restriction like tsub
- tree-shaking capabilities out of the box. 
- Rollup prunes the unsued css out of the box, other such features make it useful for keeping lower bundle size.
- Strong community support specifically for design system packaging
- Flexible configuration options for different build scenarios

## Monorepo

I've implemented an NX Workspace monorepo structure with dedicated packages:

**packages**
`@mable/design`: Houses the Hound design system components
`@mable/services`: Contains - Reusable hooks combining server logic with Zustand state management - Hooks combine the AI , API and state logic to make a easy to consume hook. - Example: `import {send_message, messages} from '@mable/services/chat'` - Extensibility path for future React Query integration for server state

**apps**

With NX now we can use pakcgae slike lego brick to configure web apps to our desire.
NX provides genreraors for most frameworks, post inital setup NX also has setup for boilerplate generation of stories, pages, blog, etc.

This architecture enables clean imports (@mable/design or @mable/services) across multiple applications within the monorepo.

## AI Integration

A proof-of-concept AI chat implementation with tool calling capabilities:

- Current implementation: Uses a mock API to provide the LLM with user ad campaign details
- User capabilities: Enables natural language queries about campaign metrics (e.g., "Which campaign has higher ROI?", "How many impressions on the Meta campaign?")
- Integrated with Google Gemini LLM through Google Cloud

### **Future Expansion: Model Context Protocol (MCP)**

To extend functionality beyond our chatbot implementation, I've added an MCP server prototype:

- MCP advantage: Allows any LLM client (Anthropic, Cursor, etc.) to access our tools using the user's credentials
- User benefits: Enables data visualization, trend analysis, and access to fresh data directly through preferred LLM interfaces
- Implementation: The mock function calling system is available both through our direct integration and as an MCP server endpoint

## Current lags

- Due to some config issues tialwind is not being propely applied across the app.
- Even then, this is a good POC that can be built upon to have a robust base. Including proper design system mangament and usage.
- Further I think MCP has hughe applications and relatively lower complexity to build for the value add.

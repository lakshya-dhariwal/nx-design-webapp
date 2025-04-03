import { UseQueryResult } from "react-query";

type GeminiState = {};

type GeminiStore = GeminiState & {};

type GeminiHook = GeminiState & {
    aiFunctionTools: FunctionDeclarationsTool[] | undefined;
};

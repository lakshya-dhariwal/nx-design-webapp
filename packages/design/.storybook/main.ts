import type { StorybookConfig } from "@storybook/nextjs";

// import type { StorybookConfig } from "@storybook/react-vite";
// import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
// import { mergeConfig } from "vite";

const config: StorybookConfig = {
    stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
    ],
    framework: {
        name: "@storybook/nextjs",
        options: {},
    },

    staticDirs: ["../src"],

    webpackFinal: async (config) => {
        // config.resolve!.plugins = [new TsconfigPathsPlugin()];
        return config;
    },

    docs: {
        autodocs: "tag",
    },

    // viteFinal: async (config) =>
    //     mergeConfig(config, {
    //         plugins: [nxViteTsPaths()],
    //     }),
};

export default config;

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/recipes/storybook/custom-builder-configs

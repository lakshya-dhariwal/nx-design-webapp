import { Preview } from "@storybook/react";
import { withThemeByClassName } from "@storybook/addon-styling";
import { RouterContext } from "next/dist/shared/lib/router-context";
// import * as nextImage from "next/image";

import "../src/styles/globals.css";
import MableTheme from "./MableTheme";

const preview: Preview = {
    parameters: {
        docs: {
            theme: MableTheme,
        },
        backgrounds: {
            default: "mableDarkBlue",
            values: [
                {
                    name: "mableDarkBlue",
                    value: "#0B131F",
                },
            ],
        },
        actions: { argTypesRegex: "^on[A-Z].*" },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        nextRouter: {
            Provider: RouterContext.Provider,
        },
    },
};

export default preview;

import type { Preview } from "@storybook/react";
import "../src/App.css";
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
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

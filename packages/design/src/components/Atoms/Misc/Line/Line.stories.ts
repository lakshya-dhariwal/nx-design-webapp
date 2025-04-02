import Line from "./index";
import type { StoryObj } from "@storybook/react";

const meta = {
  title: "Atoms/Misc/Line",
  component: Line,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle:
      "A line component that can be used to separate different sections of the UI.",
    docs: {
      description: {
        component: `
# Line Component

The Line component is a simple line element that can be used to separate different sections of the UI. It can be customized with different colors and sizes.

### Basic Example

\`\`\`jsx
<Line className="h-1 w-1/2 bg-white/50" />
\`\`\`

## Properties

| Property | Type     | Description |
|----------|----------|-------------|
| className| string   | Optional additional CSS class names |

        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    className: "h-1 w-1/2 bg-white/50",
  },
};

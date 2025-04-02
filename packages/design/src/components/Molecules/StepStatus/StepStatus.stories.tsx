import { StepStatus } from "./index";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof StepStatus> = {
  title: "Molecules/StepStatus",
  component: StepStatus,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle:
      "StepStatus is a component that displays the status of a step in a process with different states.",
    docs: {
      description: {
        component: `
# StepStatus Component

The StepStatus component is a versatile UI element that displays the status of a step in a process, with different states and customizable content.

### Basic Example

\`\`\`jsx
<StepStatus
  stepName="Configuration"
  state="connected"
>
  <p>Configuration step is complete</p>
</StepStatus>
\`\`\`

## Props

| Prop | Type | Description |
|------|------|-------------|
| stepName | string | The name of the step |
| state | "notConnected" \\ "connected" \\ "skipped" | The current state of the step |
| children | React.ReactNode | Additional content to display in the component |

## States

The StepStatus component has three possible states:

1. **notConnected**: Displays a card with a white border and no status indicator.
2. **connected**: Displays a card with a success-colored border and a "Connected" indicator with a check icon.
3. **skipped**: Displays a card with a warning-colored border and a "SKIPPED" indicator with a warning icon.

## Styling

The component uses Tailwind CSS for styling, including:

- Gradient background
- Responsive design
- Custom border colors based on the step state
- Flexible layout to accommodate different content sizes

The component uses the \`tailwind-variants\` library for conditional styling based on the state.

## Icons

The component uses icons from the \`react-icons\` library:
- \`FaCheckCircle\` for the connected state
- \`IoWarningOutline\` for the skipped state

        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof StepStatus>;

export const NotConnected: Story = {
  args: {
    stepName: "Configuration",
    state: "notConnected",
  },
};

export const Connected: Story = {
  args: {
    stepName: "Configuration",
    state: "connected",
  },
};

export const Skipped: Story = {
  args: {
    stepName: "Optional Step",
    state: "skipped",
  },
};

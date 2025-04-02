import Link from "./index";
import type { StoryObj } from "@storybook/react";

const meta = {
  title: "Atoms/Control/Link",
  tags: ["autodocs"],
  parameters: {
    componentSubtitle:
      "Buttons allow users to take actions, and make choices, with a single tap. ",
  },
  component: Link,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "Test Button",
    onClick: () => {
      alert("You clicked a button!");
    },
  },
};

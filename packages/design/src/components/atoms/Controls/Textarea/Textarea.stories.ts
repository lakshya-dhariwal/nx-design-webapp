import TextArea from "./index";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  component: TextArea,
  title: "Atoms/Control/Textarea",
  tags: ["autodocs"],
  parameters: {
    componentSubtitle:
      "Displays a form textarea or a component that looks like a textarea.",
  },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Comp: Story = {
  args: {
    label: "Your message",
    placeholder: "Type your message here",
    footnote: "Your message will be copied to the support team.",
    rows: 5,
  },
};

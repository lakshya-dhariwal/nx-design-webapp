import type { StoryObj } from "@storybook/react";
import RadioComponent from "./index";

const meta = {
  title: "Atoms/Control/RadioItem",
  component: RadioComponent,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle:
      "SideBar is a form control for entering and submitting data.",
  },
};

export default meta;
type Story = StoryObj<typeof RadioComponent>;

export const RadioButtons: Story = {
  args: {
    options: [
      { label: "Option 1", value: "1" },
      { label: "Option 2", value: "2" },
      { label: "Option 3", value: "3" },
    ],
    defaultValue: "1",
    className: "flex flex-col gap-4",
    labelClassName: "text-white ",
    size: "sm",
  },
  render: (args) => <RadioComponent {...args} />,
};

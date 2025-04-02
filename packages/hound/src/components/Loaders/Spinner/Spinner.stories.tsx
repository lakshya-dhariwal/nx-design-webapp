import type { Meta, StoryObj } from "@storybook/react";
import Spinner from "./index";

const meta: Meta = {
  component: Spinner,
  title: "Loaders/Spinner",
  tags: ["autodocs"],
  parameters: {
    componentSubtitle:
      "Displays a form textarea or a component that looks like a textarea.",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "md",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const ExtraLarge: Story = {
  args: {
    size: "xl",
  },
};

import type { Meta, StoryObj } from "@storybook/react";
import LoadingDots from "./index";

const meta: Meta<typeof LoadingDots> = {
  title: "Loaders/LoadingDots",
  component: LoadingDots,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ padding: "2rem", background: "#1a1a1a" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LoadingDots>;

export const Default: Story = {
  args: {},
};

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const CustomColor: Story = {
  args: {
    color: "#4FB7DD",
    size: "md",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <span className="text-white w-8">xs:</span>
        <LoadingDots size="xs" />
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-white w-8">sm:</span>
        <LoadingDots size="sm" />
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-white w-8">md:</span>
        <LoadingDots size="md" />
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-white w-8">lg:</span>
        <LoadingDots size="lg" />
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-white w-8">xl:</span>
        <LoadingDots size="xl" />
      </div>
    </div>
  ),
};

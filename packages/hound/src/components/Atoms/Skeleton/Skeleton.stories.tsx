import type { Meta, StoryObj } from "@storybook/react";
import Skeleton from "./index";

const meta: Meta = {
  component: Skeleton,
  title: "Atoms/Skeleton",
  tags: ["autodocs"],
  parameters: {
    componentSubtitle: "A  component for when a card is loading",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SmallCard: Story = {
  args: {},
  render: () => {
    return (
      <div className="bg-black border-2 p-6 w-full h-[500px]">
        <Skeleton className="w-full h-full rounded-md"></Skeleton>
      </div>
    );
  },
};

export const Circle: Story = {
  args: {
    className: "w-12 h-12 rounded-full",
  },
};

export const TextLoader: Story = {
  args: {
    className: "w-48 h-4 rounded-md",
  },
};

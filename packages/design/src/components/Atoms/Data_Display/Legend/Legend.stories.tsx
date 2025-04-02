import type { Meta } from "@storybook/react";
import Legend from "./index";

const meta = {
  title: "Atoms/Data-Display/Legend",
  component: Legend,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Legend>;

export default meta;

export const Default = {
  args: {
    name: "Active Users",
    color: "#1DDCDC", // neonBlue-400
  },
};

export const MultipleColors = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Legend name="Active Users" color="#1DDCDC" />
      <Legend name="Inactive Users" color="#EF4444" />
      <Legend name="New Users" color="#22bc09" />
      <Legend name="VIP Users" color="#8B5CF6" />
      <Legend name="Trial Users" color="#E9AD13" />
    </div>
  ),
};

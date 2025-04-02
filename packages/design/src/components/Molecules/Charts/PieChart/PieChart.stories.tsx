import type { Meta, StoryObj } from "@storybook/react";
import PieChart from ".";

const meta = {
  title: "Molecules/Charts/PieChart",
  component: PieChart,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle:
      "A donut chart component that visualizes data in segments with customizable colors and spacing.",
    docs: {
      description: {
        component: `
## Overview

The PieChart component is designed to display data in a donut chart format, making it ideal for showing proportional data or percentages.

## Features

- Customizable inner and outer radius for donut chart appearance
- Configurable padding between segments
- Automatic percentage calculation and display
- Custom colors for each segment
- Labels positioned inside the donut ring

## Usage

\`\`\`jsx
const data = [{
  name: 'Overview',
  new: 15,
  returning: 85
}];

const series = [
  {
    key: 'new',
    name: 'New Customers',
    color: '#4ECDC4'
  },
  {
    key: 'returning',
    name: 'Returning Customers',
    color: '#FFB900'
  }
];

<PieChart
  data={data}
  series={series}
  innerRadius="75%"
  outerRadius="90%"
  paddingAngle={2}
/>
\`\`\`
`,
      },
    },
  },
} satisfies Meta<typeof PieChart>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Example data showing customer distribution between new and returning customers
 */
const customerData = [
  {
    name: "Customers",
    new: 15,
    returning: 85,
  },
];

const customerSeries = [
  {
    key: "new",
    name: "New Customers",
    color: "#4ECDC4",
  },
  {
    key: "returning",
    name: "Returning Customers",
    color: "#FFB900",
  },
];

/**
 * A donut chart showing the distribution between new and returning customers.
 * The chart features:
 * - Custom colors for each segment
 * - Small gaps between segments
 * - Labels positioned inside the donut ring
 * - Percentage calculations
 */
export const Default: Story = {
  args: {
    data: customerData,
    series: customerSeries,
    width: 500,
    height: 500,
    innerRadius: "75%",
    outerRadius: "90%",
    paddingAngle: 2,
  },
};

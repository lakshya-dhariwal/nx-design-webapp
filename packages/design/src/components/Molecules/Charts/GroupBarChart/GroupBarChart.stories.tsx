import type { Meta, StoryObj } from "@storybook/react";
import GroupBarChart from "./index";
import { TooltipProps } from "recharts";

const meta = {
  title: "Molecules/Charts/GroupBarChart",
  component: GroupBarChart,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
A flexible and customizable grouped bar chart component built on top of Recharts.
This component is designed to display multiple data series side by side, making it perfect
for comparing values across different categories.

## Features
- Multiple data series support
- Customizable colors and dimensions
- Optional grid lines
- Custom tooltip support
- Responsive design
- Dark theme by default

## Usage

### Basic Example
\`\`\`tsx
import { GroupBarChart } from '@/components/Molecules';

const data = [
  { name: 'Q1', series1: 400, series2: 300 },
  { name: 'Q2', series1: 500, series2: 450 },
];

const series = [
  { key: 'series1', color: '#8884d8', name: 'Series A' },
  { key: 'series2', color: '#82ca9d', name: 'Series B' },
];

<GroupBarChart
  data={data}
  series={series}
  xAxisLabel="Quarter"
  yAxisLabel="Revenue"
/>
\`\`\`

### Custom Tooltip Example
\`\`\`tsx
import { TooltipProps } from "recharts";

// Custom tooltip component
const CustomTooltip = (props: TooltipProps<any, any>) => {
  const { active, payload, label } = props;

  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className="bg-gray-800 rounded-lg p-3 shadow-lg border border-gray-700">
      <div className="text-gray-200 font-semibold mb-2">{label}</div>
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2 text-gray-300">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span>
            {entry.name}: {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

// Usage with custom tooltip
<GroupBarChart
  data={data}
  series={series}
  xAxisLabel="Quarter"
  yAxisLabel="Revenue"
  customTooltip={CustomTooltip}
/>
\`\`\`

The custom tooltip component receives the following props from Recharts:
- \`active\`: Whether the tooltip is currently active
- \`payload\`: Array of data for the current hover point
- \`label\`: The name of the current data point (e.g., "Q1")

Each payload item contains:
- \`name\`: Series name
- \`value\`: Data value
- \`color\`: Series color
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    data: {
      description:
        "Array of data points. Each object should have a 'name' property and values for each series",
      control: "object",
    },
    series: {
      description:
        "Configuration for each data series, including key, color, and display name",
      control: "object",
    },
    width: {
      description:
        "Width of the chart. Can be a number (pixels) or percentage string",
      control: "text",
      defaultValue: "100%",
    },
    height: {
      description: "Height of the chart in pixels",
      control: "number",
      defaultValue: 400,
    },
    xAxisLabel: {
      description: "Label for the X-axis",
      control: "text",
    },
    yAxisLabel: {
      description: "Label for the Y-axis",
      control: "text",
    },
    barGap: {
      description: "Gap between groups of bars",
      control: "number",
      defaultValue: 0,
    },
    barSize: {
      description: "Width of individual bars in pixels",
      control: "number",
      defaultValue: 20,
    },
    showGrid: {
      description: "Whether to show grid lines",
      control: "boolean",
      defaultValue: true,
    },
    customTooltip: {
      description: "Custom tooltip component to override the default tooltip",
      control: false,
    },
  },
} satisfies Meta<typeof GroupBarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleData = [
  {
    name: "Q1",
    product1: 400,
    product2: 300,
  },
  {
    name: "Q2",
    product1: 500,
    product2: 450,
  },
  {
    name: "Q3",
    product1: 600,
    product2: 550,
  },
  {
    name: "Q4",
    product1: 700,
    product2: 600,
  },
];

const seriesConfig = [
  { key: "product1", color: "#8884d8", name: "Product A" },
  { key: "product2", color: "#82ca9d", name: "Product B" },
];

const customTooltip = (props: TooltipProps<any, any>) => {
  const { active, payload, label } = props;

  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className="bg-primary-300 bg-opacity-40 rounded-lg p-3 shadow-lg backdrop-blur-xl">
      <div className="text-gray-200 font-semibold mb-2">{label}</div>
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2 text-gray-300">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span>
            {entry.name}: {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

/**
 * Default configuration showing quarterly revenue comparison between two products.
 * Features grid disabled for cleaner look and custom bar dimensions.
 */
export const Default: Story = {
  args: {
    data: sampleData,
    width: 800,
    height: 400,
    series: seriesConfig,
    xAxisLabel: "Quarter",
    yAxisLabel: "Revenue",
    barGap: 0,
    barSize: 20,
    showGrid: false,
    axisColor: "#ffff",
  },
};

/**
 * Example with custom tooltip implementation using Tailwind CSS.
 * Shows how to create a dark-themed tooltip with custom styling.
 */
export const WithCustomTooltip: Story = {
  args: {
    ...Default.args,
    customTooltip: customTooltip,
  },
  parameters: {
    docs: {
      description: {
        story: `
This example demonstrates how to implement a custom tooltip using Tailwind CSS.
The tooltip includes:
- Dark theme styling
- Series color indicators
- Formatted value display
        `,
      },
    },
  },
};

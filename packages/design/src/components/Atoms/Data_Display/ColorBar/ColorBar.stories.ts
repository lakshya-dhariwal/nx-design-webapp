import type { StoryObj } from "@storybook/react";
import ColorBar from "./index";

const meta = {
  title: "Atoms/Data-Display/ColorBar",
  component: ColorBar,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle:
      "ColorBar is a visual component for displaying proportional data using colored segments with interactive tooltips.",
    docs: {
      description: {
        component: `
# ColorBar Component

The ColorBar component is an interactive data visualization tool. It displays a horizontal bar divided into segments, each with a specific color, label, and proportional width based on the provided data. It also features tooltips for each segment.

## Features

- Visualize proportional data with colored segments
- Customizable colors and labels for each segment
- Interactive tooltips displaying detailed information
- Automatically calculates segment widths based on provided values
- Flexible and easy to integrate into various UI contexts

## Usage

The ColorBar component takes an array of data objects, each specifying a value, color, and label.

### Basic Example

\`\`\`jsx
<ColorBar
  data={[
    { value: 10, color: "bg-primary-500", label: "New Customers" },
    { value: 20, color: "bg-yellow-400", label: "Returning Customers" },
  ]}
/>
\`\`\`

## Props

| Prop | Type | Description |
|------|------|-------------|
| data | Array<{ value: number, color: string, label: string, tooltipContent?: React.ReactNode }> | An array of objects, each representing a segment of the bar |

- \`value\`: A number representing the relative size of the segment
- \`color\`: A string representing the CSS class for the background color of the segment
- \`label\`: A string label for the segment (displayed in the tooltip)
- \`tooltipContent\`: (Optional) Custom React node to override default tooltip content

## How It Works

- The component calculates the total of all values in the data array.
- It then determines the width of each segment as a percentage of the total.
- The bar is rendered with each segment sized proportionally and colored according to the provided data.
- Hovering over a segment displays a tooltip with the segment's label and value percentage.

## Customization

You can customize the appearance and behavior of the ColorBar by:

- Adjusting the color classes in the data prop
- Providing custom labels for each segment
- Overriding the default tooltip content with custom React nodes
- Modifying the component's CSS for aspects like height, border-radius, etc.

## Examples

\`\`\`jsx
<ColorBar
  data={[
    { value: 30, color: "bg-blue-500", label: "New Customers" },
    { value: 50, color: "bg-green-500", label: "Returning Customers" },
    { 
      value: 20, 
      color: "bg-red-500", 
      label: "Lost Customers",
      tooltipContent: <CustomTooltip value={20} trend="decreasing" />
    },
  ]}
/>
\`\`\`

This example shows a ColorBar with three segments, including a custom tooltip for the "Lost Customers" segment.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "ColorBar",
  args: {
    data: [
      { value: 10, color: "bg-primary-500", label: "New Customers" },
      { value: 20, color: "bg-yellow-400", label: "Returning Customers" },
    ],
  },
};

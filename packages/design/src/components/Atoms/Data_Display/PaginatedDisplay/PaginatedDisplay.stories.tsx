import type { StoryObj } from "@storybook/react";
import PaginatedDisplay from "./index";

const meta = {
  title: "Atoms/Data-Display/PaginatedDisplay",
  component: PaginatedDisplay,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle:
      "PaginatedDisplay is a visual component for displaying paginated data.",
    docs: {
      description: {
        component: `
# Paginated Display Component

The PaginatedDisplay component is a simple yet effective data visualization tool. It displays a paginated list of items, each with a unique identifier and a label.

## Features

- Paginated display of array of items of type React.ReactNode
- Automatically calculates number of pages based on the length of the array
- Provides a button to navigate to the next page
- Automatic detection of the height of the container and item by which the number of items/page can be calculated

## Usage

The PaginatedDisplay component takes an array of items of type React.ReactNode.

### Basic Example

\`\`\`jsx
<PaginatedDisplay
  items={[
    <div>Item 1</div>,
    <div>Item 2</div>,
    <div>Item 3</div>,
    <div>Item 4</div>,
    <div>Item 5</div>,
    <div>Item 7</div>,
    <div>Item 6</div>,
    <div>Item 9</div>,
    <div>Item 8</div>,
    <div>Item 11</div>,
    <div>Item 10</div>,
    <div>Item 13</div>,
    <div>Item 12</div>,
    <div>Item 15</div>,
    <div>Item 14</div>,
    <div>Item 17</div>,
    <div>Item 16</div>,
    <div>Item 19</div>,
    <div>Item 18</div>,
    <div>Item 20</div>,
}]/>
\`\`\`

## Props

| Prop | Type | Description |
|------|------|-------------|
| item | Array<React.ReactNode> | An array of React.ReactNode items |

- \`item\`: A React.ReactNode item


        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    containerClassName: "text-white w-[20%] flex flex-col items-center",
    className: "text-white h-[200px]",
    items: [
      <div key={1}>Item 1</div>,
      <div key={2}>Item 2</div>,
      <div key={3}>Item 3</div>,
      <div key={4}>Item 4</div>,
      <div key={5}>Item 5</div>,
      <div key={6}>Item 6</div>,
      <div key={7}>Item 7</div>,
      <div key={8}>Item 8</div>,
      <div key={9}>Item 9</div>,
      <div key={10}>Item 10</div>,
      <div key={11}>Item 11</div>,
      <div key={12}>Item 12</div>,
      <div key={13}>Item 13</div>,
      <div key={14}>Item 14</div>,
      <div key={15}>Item 15</div>,
      <div key={16}>Item 16</div>,
      <div key={17}>Item 17</div>,
      <div key={18}>Item 18</div>,
      <div key={19}>Item 19</div>,
      <div key={20}>Item 20</div>,
      <div key={111}>Item 111</div>,
      <div key={222}>Item 222 </div>,
      <div key={333}>Item 333</div>,
      <div key={444}>Item 444</div>,
      <div key={555}>Item 555</div>,
      <div key={666}>Item 666</div>,
      <div key={777}>Item 777</div>,
      <div key={888}>Item 888</div>,
      <div key={999}>Item 999</div>,
      <div key={1010}>Item 1010</div>,
      <div key={1111}>Item 1111</div>,
      <div key={1212}>Item 1212</div>,
      <div key={1313}>Item 1313</div>,
      <div key={1414}>Item 1414</div>,
      <div key={1515}>Item 1515</div>,
      <div key={1616}>Item 1616</div>,
      <div key={1717}>Item 1717</div>,
      <div key={1818}>Item 1818</div>,
      <div key={1919}>Item 1919</div>,
      <div key={2020}>Item 2020</div>,
    ],
  },
};

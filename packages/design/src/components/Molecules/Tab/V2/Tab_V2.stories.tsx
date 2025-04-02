import type { StoryObj } from "@storybook/react";
import { TabsV2, TabsTriggerV2, TabsContentV2, TabsListV2 } from "./index";
import { FaChartPie } from "react-icons/fa";
import { FaTable } from "react-icons/fa";

const TabsStory = ({
  variant,
}: {
  variant?: "default" | "primary" | "secondary";
}) => {
  switch (variant) {
    case "secondary":
      return (
        <TabsV2 variant={variant} defaultValue="account">
          <TabsListV2 className="grid w-fit grid-cols-2">
            <TabsTriggerV2
              className="rounded-l-lg flex items-center justify-center gap-1"
              value="account"
            >
              <FaChartPie className="text-white w-[18px]" />
              GRAPH
            </TabsTriggerV2>
            <TabsTriggerV2
              className="rounded-r-lg flex items-center justify-center gap-1"
              value="password"
            >
              <FaTable className="text-white w-[18px]" /> TABLE
            </TabsTriggerV2>
          </TabsListV2>
          <TabsContentV2 value="account">
            <div className="text-white">Account Items</div>
          </TabsContentV2>
          <TabsContentV2 value="password">
            <div className="text-white">Password Items</div>
          </TabsContentV2>
        </TabsV2>
      );
    case "primary":
      return (
        <TabsV2 variant={variant} defaultValue="account">
          <TabsListV2 className="grid w-fit grid-cols-2">
            <TabsTriggerV2
              className="rounded-l-lg flex items-center justify-center gap-1"
              size="xsmall"
              value="account"
            >
              <FaChartPie className="text-white w-[18px]" />
              GRAPH
            </TabsTriggerV2>
            <TabsTriggerV2
              className="rounded-r-lg flex items-center justify-center gap-1"
              value="password"
              size="xsmall"
            >
              <FaTable className="text-white w-[18px]" /> TABLE
            </TabsTriggerV2>
          </TabsListV2>
          <TabsContentV2 value="account">
            <div className="text-white">Account Items</div>
          </TabsContentV2>
          <TabsContentV2 value="password">
            <div className="text-white">Password Items</div>
          </TabsContentV2>
        </TabsV2>
      );
    default:
      return (
        <TabsV2 variant={variant} defaultValue="account">
          <TabsListV2 className="grid w-full grid-cols-2 gap-4">
            <TabsTriggerV2 value="account">Account</TabsTriggerV2>
            <TabsTriggerV2 value="password">Password</TabsTriggerV2>
          </TabsListV2>
          <TabsContentV2 value="account">
            <div className="text-white">Account Items</div>
          </TabsContentV2>
          <TabsContentV2 value="password">
            <div className="text-white">Password Items</div>
          </TabsContentV2>
        </TabsV2>
      );
  }
};

const meta = {
  title: "Molecules/Tabs/V2",
  component: TabsStory,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle:
      "Tabs provide an easy way to organize and navigate between different sections of content.",
    docs: {
      description: {
        component: `
# Tabs Component

The Tabs component is a versatile UI element that allows users to switch between different views or sections of content within the same space. It's particularly useful for organizing related information or functionality into easily accessible categories.

## Features

- Easy to implement and customize
- Automatically manages active state
- Responsive design with grid layout

## Usage

The Tabs component consists of several sub-components:

- \`Tabs\`: The main container component
- \`TabsList\`: Contains the tab triggers
- \`TabsTrigger\`: Individual tab buttons
- \`TabsContent\`: Content for each tab

### Basic Example

\`\`\`jsx
<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account content here</TabsContent>
  <TabsContent value="password">Password content here</TabsContent>
</Tabs>
\`\`\`

## Customization

You can customize the appearance of the Tabs component using CSS classes. In this example, we use utility classes for grid layout and spacing.

        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
  },
};

export const Primary: Story = {
  args: {
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

import { FaAmazon } from "react-icons/fa";
import { ConnectionCard } from "./index";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components";

const meta: Meta<typeof ConnectionCard> = {
  title: "Molecules/ConnectionCard",
  component: ConnectionCard,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle:
      "ConnectionCard is a component that displays connection information with different states.",
    docs: {
      description: {
        component: `
# ConnectionCard Component

A card component for displaying integration connections with icons, descriptions, and action buttons.

### Basic Example

\`\`\`jsx
<ConnectionCard
  icon={<FaAmazon />}
  destination="Amazon Web Services"
  className="flex flex-col justify-start h-autoflex-1"
>
  <p>Description text</p>
  <Button>Connect</Button>
</ConnectionCard>
\`\`\`

## Props

| Prop | Type | Description |
|------|------|-------------|
| icon | React.ReactNode | Icon component to display |
| destination | string | Name of the service/destination |
| className? | string | Optional custom CSS classes |
| children | React.ReactNode | Card content (description, buttons, etc.) |

## Usage

The ConnectionCard is typically used in a grid layout to display multiple integration options. It supports:

- Flexible layouts with custom className
- Icon + destination header
- Description text
- Action buttons
- Responsive grid arrangements

## Styling

Uses Tailwind CSS with:
- Flexible height/width
- Support for flex layouts
- Icon sizing controls
- Custom spacing/padding
`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ConnectionCard>;

export const Default: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <ConnectionCard
        icon={<FaAmazon className="w-full h-full" />}
        destination="Amazon Web Services"
      >
        <p className="body-3 leading-[21px] text-white opacity-40 font-medium mt-4">
          Connect Mable to Meta to optimize your Ad Performance through accurate
          data! Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Voluptate, ipsa?
        </p>
        <Button className="mt-4">Connect</Button>
      </ConnectionCard>

      <ConnectionCard
        icon={<FaAmazon className="w-full h-full" />}
        destination="Amazon S3"
        className="flex flex-col justify-between h-auto flex-1"
      >
        <p className="body-3 leading-[21px] text-white opacity-40 font-medium mt-4">
          Connect Mable to Meta to
        </p>
        <Button className="mt-4">Connect</Button>
      </ConnectionCard>

      <ConnectionCard
        icon={<FaAmazon className="w-full h-full" />}
        destination="Amazon RDS"
        className="flex flex-col justify-between h-auto flex-1"
      >
        <p className="body-3 leading-[21px] text-white opacity-40 font-medium mt-4">
          Connect Mable to Meta to
        </p>
        <Button className="mt-4">Connect</Button>
      </ConnectionCard>
    </div>
  ),
};

import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Popover, PopoverContent, PopoverTrigger } from "./index";
import { Button } from "@/components";

const meta: Meta<typeof Popover> = {
  title: "Atoms/Misc/Popover",
  component: Popover,
  parameters: {
    componentSubtitle:
      "Displays rich content in a portal, triggered by a button.",
    docs: {
      description: {
        component: `
### Overview
A Popover displays floating content in relation to a trigger element. When the trigger is clicked, 
the Popover appears with a smooth animation. Built on Radix UI primitives for accessibility.

### Features
- 🌟 Floating positioning
- ♿️ Full keyboard navigation
- 🎯 Focus management
- 🎨 Customizable styling
- 🔄 Smooth animations
- 🌓 Dark mode support

### Component API

#### Popover
The root component that wraps the trigger and content.

\`\`\`tsx
<Popover>
  <PopoverTrigger />
  <PopoverContent />
</Popover>
\`\`\`

#### PopoverTrigger
The button that triggers the popover. Use \`asChild\` to customize the trigger element.

\`\`\`tsx
<PopoverTrigger asChild>
  <Button>Custom Trigger</Button>
</PopoverTrigger>
\`\`\`

Props:
- \`asChild\`: boolean - When true, will merge props onto child element

#### PopoverContent
The floating content of the popover.

Props:
- \`align\`: "start" | "center" | "end" - Preferred alignment against the trigger
- \`sideOffset\`: number - Distance in pixels from the trigger
- \`alignOffset\`: number - Distance in pixels from the alignment edge
- \`avoidCollisions\`: boolean - When true, overrides align/side if popover would collide with viewport edge
- \`collisionBoundary\`: Element | null - Element to check for collision
- \`collisionPadding\`: number | { top, right, bottom, left } - Space between popover and viewport edge
- \`arrowPadding\`: number - Padding between arrow and popover edges
- \`sticky\`: "partial" | "always" - Control popover positioning when scrolling
- \`hideWhenDetached\`: boolean - Hide when trigger is scrolled out of view
- \`className\`: string - Additional CSS classes

### Styling

The PopoverContent comes with built-in styles and supports dark mode:

\`\`\`tsx
<PopoverContent className="w-80"> // Custom width
  <div className="space-y-2">
    <h3 className="text-slate-900 dark:text-slate-50">Title</h3>
    <p className="text-slate-500 dark:text-slate-400">Content</p>
  </div>
</PopoverContent>
\`\`\`

### Basic Usage

\`\`\`tsx
import { Popover, PopoverTrigger, PopoverContent } from "@Mable-AI/hound"

export function MyComponent() {
  return (
    <Popover>
      <PopoverTrigger>Open</PopoverTrigger>
      <PopoverContent 
        align="center"
        sideOffset={4}
        className="w-80"
      >
        <h3>Popover Content</h3>
        <p>Add any content here.</p>
      </PopoverContent>
    </Popover>
  )
}
\`\`\`

### Accessibility
- Keyboard focus is trapped within the Popover when open
- ESC key closes the Popover
- ARIA attributes are automatically managed
- Focus is returned to the trigger when closed
- Role="dialog" is automatically applied
`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "The content of the popover",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

const PopoverDemo = () => (
  <div className="flex items-center justify-center p-8">
    <Popover>
      <PopoverTrigger>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h3 className="font-medium">Popover Title</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            This is a basic popover example.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  </div>
);

export const Default: Story = {
  render: () => <PopoverDemo />,
  parameters: {
    docs: {
      description: {
        story: "A basic popover with a button trigger and simple content.",
      },
    },
  },
};

export const WithCustomContent: Story = {
  render: () => (
    <div className="flex items-center justify-center p-8">
      <Popover>
        <PopoverTrigger>
          <Button variant="outline">Settings</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h3 className="font-medium">Custom Content</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Popovers can contain any content, including forms, buttons, and
                rich text.
              </p>
            </div>
            <div className="flex justify-end">
              <Button size="small">Save Changes</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "A popover with rich content including headings, text, and actions.",
      },
    },
  },
};

export const CustomPosition: Story = {
  render: () => (
    <div className="flex items-center justify-center p-8">
      <Popover>
        <PopoverTrigger>
          <Button variant="outline">Custom Position</Button>
        </PopoverTrigger>
        <PopoverContent align="start" sideOffset={8}>
          <p className="text-sm">
            This popover is aligned to the start with a custom offset.
          </p>
        </PopoverContent>
      </Popover>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates custom positioning with alignment and offset options.",
      },
    },
  },
};

import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Slider from "./index";

const meta: Meta<typeof Slider> = {
  title: "Atoms/Control/Slider/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
### Single Thumb Slider
\`\`\`tsx
const Example = () => {
  const [value, setValue] = React.useState(50);
  return (
    <Slider
      value={value}
      showTooltip
      customTooltip={(val) => (
        <div className="flex items-center gap-1">
          <span>{val}</span>
          <span>°C</span>
        </div>
      )}
      onChange={(val) => setValue(val as number)}
    />
  );
};
\`\`\`

### Multi Thumb Range Slider
\`\`\`tsx
const Example = () => {
  const [value, setValue] = React.useState<[number, number]>([30, 70]);
  return (
    <Slider
      variant="multi"
      value={value}
      showTooltip
      customTooltip={(val, index) => (
        <div className="flex items-center gap-1">
          <span>{index === 0 ? 'From: ' : 'To: '}</span>
          <span>{val}</span>
        </div>
      )}
      onChange={(val) => setValue(val as [number, number])}
    />
  );
};
\`\`\``,
      },
    },
  },
  args: {
    min: 0,
    max: 100,
    step: 1,
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["single", "multi"],
      description: "Single or dual thumb slider",
      table: {
        defaultValue: { summary: "single" },
      },
    },
    value: {
      description:
        "Current value(s). For multi-variant, should be [number, number]",
      table: {
        type: { summary: "number | [number, number]" },
      },
    },
    showTooltip: {
      control: "boolean",
      description: "Show tooltips below thumbs",
      table: {
        defaultValue: { summary: false },
      },
    },
    customTooltip: {
      description: "Custom tooltip content renderer",
      table: {
        type: { summary: "(value: number, index: number) => React.ReactNode" },
      },
    },
    tooltipClassName: {
      control: "text",
      description: "Custom tooltip styles",
      table: {
        type: { summary: "string" },
      },
    },
    min: {
      control: "number",
      description: "Minimum value",
      table: {
        defaultValue: { summary: 0 },
      },
    },
    max: {
      control: "number",
      description: "Maximum value",
      table: {
        defaultValue: { summary: 100 },
      },
    },
    step: {
      control: "number",
      description: "Step increment",
      table: {
        defaultValue: { summary: 1 },
      },
    },
    color: {
      control: "color",
      if: { arg: "variant", eq: "single" },
      description: "Single variant color",
      table: {
        defaultValue: { summary: "#3b82f6" },
      },
    },
    lowerColor: {
      control: "color",
      if: { arg: "variant", eq: "multi" },
      description: "Lower range color",
      table: {
        defaultValue: { summary: "#3b82f6" },
      },
    },
    higherColor: {
      control: "color",
      if: { arg: "variant", eq: "multi" },
      description: "Higher range color",
      table: {
        defaultValue: { summary: "#ef4444" },
      },
    },
    trackColor: {
      control: "color",
      description: "Track color",
      table: {
        defaultValue: { summary: "#ffff" },
      },
    },
    minStepsBetweenThumbs: {
      control: "number",
      if: { arg: "variant", eq: "multi" },
      description: "Minimum steps between thumbs",
      table: {
        defaultValue: { summary: 1 },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

const SingleTemplate: Story = {
  render: () => {
    const [value, setValue] = React.useState(12);

    return (
      <div className="w-full max-w-md space-y-8">
        <Slider
          min={10}
          max={30}
          value={value}
          color="#3b82f6"
          showTooltip
          customTooltip={(val) => (
            <div className="flex items-center gap-1">
              <span>{val}</span>
              <span>°C</span>
            </div>
          )}
          onChange={(val) => setValue(val as number)}
        />
        <div className="text-white">Value: {value}</div>
      </div>
    );
  },
};

const MultiTemplate: Story = {
  render: () => {
    const [value, setValue] = React.useState<[number, number]>([30, 50]);

    return (
      <div className="w-full max-w-md space-y-8">
        <Slider
          variant="multi"
          min={0}
          max={100}
          value={value}
          showTooltip
          customTooltip={(val, index) => (
            <div className="flex items-center gap-1">
              <span>{index === 0 ? "From: " : "To: "}</span>
              <span>${val}</span>
            </div>
          )}
          lowerColor="#8b5cf6"
          higherColor="#ec4899"
          trackColor="#8ed1eb"
          onChange={(val) => setValue(val as [number, number])}
        />
        <div className="text-white">
          Range: ${value[0]} to ${value[1]}
        </div>
      </div>
    );
  },
};

export const SingleThumb = SingleTemplate;
export const MultiThumb = MultiTemplate;

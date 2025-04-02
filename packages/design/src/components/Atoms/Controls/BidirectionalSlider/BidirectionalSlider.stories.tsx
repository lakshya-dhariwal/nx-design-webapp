import type { Meta } from "@storybook/react";
import { BidirectionalSlider } from "./index";
import React, { useState } from "react";

const meta = {
  title: "Atoms/Control/Slider/Bidirectional Slider",
  component: BidirectionalSlider,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle:
      "A controlled bidirectional slider that allows selection of values relative to a centered origin point with precise step control.",
    docs: {
      description: {
        component: `
# Bidirectional Slider

A controlled bidirectional slider with a visually centered origin point and precise gap control on both sides.

## Features

- Customizable color for fill and thumb
- Origin always centered visually
- Precise gap control with different step sizes for each side
- Values snap to exact steps based on defined gaps
- Visual indicators for min, max, and origin points
- Strictly controlled component (requires value and onChange)

## Usage

\`\`\`tsx
const [value, setValue] = useState(5);
<BidirectionalSlider
  value={value}
  onChange={(newValue, bidirectionalValue) => setValue(newValue)}
  ranges={[[0, 1], [5], [10, 1]]} // [min,gap] [origin] [max,gap]
  color="#0ea5e9"
/>
\`\`\`

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| color | string | No | Color for the slider fill and thumb (default: "#0ea5e9") |
| ranges | [[number, number], [number], [number, number]] | Yes | Array defining [min,gap] [origin] [max,gap] |
| value | number | Yes | Current value of the slider |
| onChange | (value: number, bidirectionalValue: number) => void | Yes | Callback for value changes |
`,
      },
    },
  },
} satisfies Meta<typeof BidirectionalSlider>;

export default meta;

// Base slider component with controlled state
const SliderWithState = ({
  initialValue,
  ranges,
  color,
}: {
  initialValue: number;
  ranges: [[number, number], [number], [number, number]];
  color?: string;
}) => {
  const [value, setValue] = useState(initialValue);
  const [bidirectionalValue, setBidirectionalValue] = useState(0);

  return (
    <div className="space-y-4">
      <BidirectionalSlider
        ranges={ranges}
        color={color}
        value={value}
        onChange={(newValue, newBidirectionalValue) => {
          setValue(newValue);
          setBidirectionalValue(newBidirectionalValue);
        }}
      />
      <div className="text-sm text-gray-600">
        External State: {value} ({bidirectionalValue}%)
      </div>
    </div>
  );
};

export const Default = {
  render: () => (
    <SliderWithState
      initialValue={1.0}
      ranges={[[0.1, 0.1], [1], [10, 1]]}
      color="#8b5cf6"
    />
  ),
};

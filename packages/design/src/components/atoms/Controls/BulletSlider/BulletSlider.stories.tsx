import type { Meta, StoryObj } from "@storybook/react";
import { BulletSlider } from "./index";

const meta: Meta<typeof BulletSlider> = {
    title: "Atoms/Control/BulletSlider",
    //@ts-ignore
    name: "Bullet Slider",
    component: BulletSlider,
    tags: ["autodocs"],
    parameters: {
        componentSubtitle:
            "A flexible bullet slider component with optional custom input support and size variants.",
        docs: {
            description: {
                component: `
# Bullet Slider

A customizable bullet slider component that allows users to navigate through different steps or options.

## Features

- Multiple step navigation
- Optional line progress indication
- Custom input option at the end
- Three size variants (sm, md, lg)
- Responsive design
- Customizable styling

## Basic Usage

\`\`\`tsx
<BulletSlider
  steps={[
    <div>Step 1</div>,
    <div>Step 2</div>,
    <div>Step 3</div>
  ]}
  onChange={(step) => console.log(\`Selected step: \${step}\`)}
  size="md"
/>
\`\`\`

## Size Variants

The component supports three sizes:
- \`sm\`: Compact size with smaller bullets and text
- \`md\`: Default size
- \`lg\`: Large size with bigger bullets and text

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| steps | JSX.Element[] | required | Array of elements to display for each step |
| onChange | (step: number, customValue?: string) => void | required | Callback when step changes |
| className | string | undefined | Additional CSS classes |
| defaultActiveStep | number | 1 | Initial active step |
| linePassed | boolean | true | Show progress lines |
| showCustomInput | boolean | false | Show custom input at the end |
| customInputPlaceholder | string | "Custom" | Placeholder for custom input |
| defaultCustomValue | string | "" | Initial value for custom input |
| size | "sm" \\ "md" \\ "lg" | "md" | Size variant of the slider |
`,
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultSteps = [
    <div className="body-2 flex flex-col whitespace-nowrap text-center">
        <span>1 Million</span>
        <span>Sessions/ Year</span>
    </div>,
    <div className="body-2 flex flex-col whitespace-nowrap text-center">
        <span>1 Million</span>
        <span>Sessions/ Year</span>
    </div>,
    <div className="body-2 flex flex-col whitespace-nowrap text-center">
        <span>1 Million</span>
        <span>Sessions/ Year</span>
    </div>,
    <div className="body-2 flex flex-col whitespace-nowrap text-center">
        <span>1 Million</span>
        <span>Sessions/ Year</span>
    </div>,
    <div className="body-2 flex flex-col whitespace-nowrap text-center">
        <span>2 Million</span>
        <span>Sessions/ Year</span>
    </div>,
    <div className="body-2 flex flex-col whitespace-nowrap text-center">
        <span>3 Million</span>
        <span>Sessions/ Year</span>
    </div>,
];

const returnWindowSteps = [
    <>3 Months</>,
    <>6 Months</>,
    <>12 Months</>,
    <>24 Months</>,
    <>36 Months</>,
];

export const Default: Story = {
    args: {
        linePassed: true,
        //@ts-ignore
        onChange: (step) => console.log("Step changed:", step),
        steps: defaultSteps,
        size: "md",
    },
};

export const Small: Story = {
    args: {
        ...Default.args,
        size: "sm",
    },
    parameters: {
        docs: {
            description: {
                story: "Small size variant with compact bullets and text.",
            },
        },
    },
};

export const Large: Story = {
    args: {
        ...Default.args,
        size: "lg",
    },
    parameters: {
        docs: {
            description: {
                story: "Large size variant with bigger bullets and text.",
            },
        },
    },
};

export const WithCustomInput: Story = {
    args: {
        ...Default.args,
        size: "sm",
        linePassed: false,
        showCustomInput: true,
        customInputPlaceholder: "Custom value",
        //@ts-ignore
        onChange: (step, customValue) =>
            console.log("Step: " + step + " Custom value: " + customValue),
    },
    parameters: {
        docs: {
            description: {
                story: "Example with custom input enabled at the end of the slider.",
            },
        },
    },
};

export const SmallWithCustomInput: Story = {
    args: {
        ...WithCustomInput.args,
        size: "sm",
        linePassed: false,
    },
    parameters: {
        docs: {
            description: {
                story: "Small size variant with custom input.",
            },
        },
    },
};

export const ReturnWindow = {
    render: () => (
        <div className="flex items-start justify-between gap-4 rounded-lg p-4">
            <div className="w-[40%]">
                <h1 className="body-3 text-white">Return Window</h1>
                <p className="body-5 mt-1 font-medium text-white/70">
                    Please select the timeframe for how long customers are
                    allowed to return items after the purchase
                </p>
            </div>

            <BulletSlider
                className="w-[60%]"
                linePassed={false}
                showCustomInput={true}
                steps={returnWindowSteps}
                onChange={(step) => console.log(`Selected step: ${step}`)}
                size="sm"
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "Example showing a return window selector with custom input option.",
            },
        },
    },
};

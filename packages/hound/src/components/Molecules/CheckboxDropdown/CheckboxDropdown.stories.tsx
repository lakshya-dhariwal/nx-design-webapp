import type { Meta, StoryObj } from "@storybook/react";
import { CheckboxDropdown } from "./index";
import Button from "@/components/Atoms/Controls/Button";
import { motion } from "framer-motion";
import { useState } from "react";
import Badge from "@/components/Atoms/Misc/Badge";
import { Option } from "./index";

const meta: Meta<typeof CheckboxDropdown> = {
  title: "Molecules/CheckboxDropdown",
  component: CheckboxDropdown,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A controlled dropdown component that allows users to select multiple options using checkboxes.

## Features
- Fully controlled component with support for external state management
- Customizable trigger content through children prop
- Support for "Select All" functionality
- Optional footer for action buttons
- Smooth animations using Framer Motion
- Keyboard accessible
- Responsive positioning using Floating UI

## Usage Guidelines
- Use when you need to allow users to select multiple items from a list
- Ideal for filtering or selection interfaces where users need to see their selections
- Consider using a regular Dropdown for single-selection scenarios

## Example Implementation

\`\`\`tsx
import { CheckboxDropdown } from "@/components/Molecules/CheckboxDropdown";
import { Button } from "@/components/Atoms/Controls/Button";
import { motion } from "framer-motion";
import { useState } from "react";

interface Option {
  id: string;
  label: string;
  checked: boolean;
}

// Footer component with animations and action buttons
const Footer = ({ onClose, onApply }: { onClose: () => void; onApply: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 5 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1, ease: "easeInOut" }}
    className="grid grid-cols-2 gap-2 p-2"
  >
    <Button onClick={onClose} variant="secondary" className="w-full">
      Cancel
    </Button>
    <Button onClick={onApply} className="w-full">
      Apply
    </Button>
  </motion.div>
);

const MyComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<Option[]>([
    { id: "option1", label: "Option 1", checked: false },
    { id: "option2", label: "Option 2", checked: false },
  ]);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  const handleChange = (newOptions: Option[]) => {
    setOptions(newOptions);
  };

  const handleClose = () => {
    setIsOpen(false);
    // Revert changes if cancelled
    setOptions(selectedOptions.map(opt => ({ ...opt, checked: true })));
  };

  const handleApply = () => {
    setIsOpen(false);
    // Save selected options
    setSelectedOptions(options.filter(opt => opt.checked));
  };

  return (
    <CheckboxDropdown
      options={options}
      onChange={handleChange}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      size="md"
      footer={
        <Footer 
          onClose={handleClose}
          onApply={handleApply}
        />
      }
    >
      <div className="flex items-center gap-2">
        <span>Select Options</span>
        <span className="text-xs text-white/50">
          {options.filter(opt => opt.checked).length} selected
        </span>
      </div>
    </CheckboxDropdown>
  );
};
\`\`\`
`,
      },
    },
  },
  argTypes: {
    children: {
      description: "Content to display in the dropdown trigger button",
      control: "text",
    },
    options: {
      description: "Array of options to display in the dropdown",
      control: "object",
    },
    onChange: {
      description: "Callback fired when any option's checked state changes",
      control: false,
    },
    onSelectAll: {
      description: "Optional callback for handling 'Select All' action",
      control: false,
    },
    className: {
      description: "Additional CSS classes to apply to the container",
      control: "text",
    },
    position: {
      description: "Position of the dropdown menu relative to the trigger",
      control: { type: "radio" },
      options: ["bottom", "top"],
    },
    footer: {
      description: "Optional footer content, typically used for action buttons",
      control: false,
    },
    isOpen: {
      description: "Controls the open state of the dropdown",
      control: "boolean",
    },
    setIsOpen: {
      description: "Callback fired when the dropdown's open state changes",
      control: false,
    },
    size: {
      description: "Size variant of the dropdown trigger",
      control: { type: "radio" },
      options: ["sm", "md"],
    },
    disabled: {
      description: "Whether the dropdown is disabled",
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof CheckboxDropdown>;

const Footer = ({ onClose }: { onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0, x: 0 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.1, ease: "easeInOut" }}
    className="grid grid-cols-2 gap-2 p-2"
  >
    <Button onClick={onClose} variant="secondary" className="w-full">
      Cancel
    </Button>
    <Button onClick={onClose} className="w-full">
      Apply
    </Button>
  </motion.div>
);

const ExampleContent = ({
  options,
}: {
  options: { id: string; label: string; checked: boolean }[];
}) => (
  <div className="flex items-center gap-2">
    <span>All Markets</span>
    <span className="text-xs text-white/50">
      {options.filter((opt) => opt.checked).length} selected
    </span>
  </div>
);

// Example of controlled usage with different sizes
const ControlledExample = ({
  size = "md",
  disabled = false,
}: {
  size?: "sm" | "md";
  disabled?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<Option[]>([
    { id: "dach", label: "DACH", checked: false },
    {
      id: "uk",
      label: "UK",
      checked: false,
      badge: <Badge variant="primary" label="Primary" rounded />,
    },
    { id: "us", label: "US", checked: false },
    { id: "in", label: "IN", checked: false },
  ]);

  const handleSelectAll = (checked: boolean) => {
    setOptions(options.map((option) => ({ ...option, checked })));
  };

  const handleChange = (newOptions: Option[]) => {
    setOptions(newOptions);
  };

  return (
    <CheckboxDropdown
      className="w-[300px]"
      options={options}
      onChange={handleChange}
      onSelectAll={handleSelectAll}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      footer={<Footer onClose={() => setIsOpen(false)} />}
      size={size}
      disabled={disabled}
    >
      <ExampleContent options={options} />
    </CheckboxDropdown>
  );
};

export const Default: Story = {
  render: () => <ControlledExample />,
  parameters: {
    docs: {
      description: {
        story: "Default size (md) with a custom trigger showing selected count",
      },
    },
  },
};

export const Small: Story = {
  render: () => <ControlledExample size="sm" />,
  parameters: {
    docs: {
      description: {
        story: "Small variant with reduced padding and border radius",
      },
    },
  },
};

export const Disabled: Story = {
  render: () => <ControlledExample disabled />,
  parameters: {
    docs: {
      description: {
        story:
          "Disabled state prevents interaction with the dropdown and its options",
      },
    },
  },
};

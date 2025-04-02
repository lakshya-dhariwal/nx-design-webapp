import type { Meta, StoryObj } from "@storybook/react";
import Modal from "./index";
import Button from "@/components/Atoms/Controls/Button";
import { useState } from "react";

const meta: Meta<typeof Modal> = {
  title: "Molecules/Modal/Simple",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle:
      "Modal is a flexible component for creating modal dialogs with customizable content and variants.",
    docs: {
      description: {
        component: `
# Modal Component

A customizable modal dialog component with multiple style variants and spacing options.

## Basic Example

\`\`\`jsx
import { useState } from 'react';
import Modal from './Modal';
import Button from '@/components/Atoms/Controls/Button';

const Example = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Example Modal"
        variant="primary"
      >
        <div>Modal content here</div>
      </Modal>
    </>
  );
};
\`\`\`

## Props

| Prop | Type | Description | Default |
|------|------|-------------|---------|
| isOpen | boolean | Controls modal visibility | Required |
| onClose | () => void | Callback when modal closes | Required |
| title | ReactNode | Modal header content | Required |
| children | ReactNode | Modal body content | Required |
| variant | 'default' \\| 'warning' \\| 'success' \\| 'primary' | Style variant | 'default' |
| space | 'default' \\| 'extra' | Controls modal padding | 'default' |

## Variants

- **default**: Standard modal styling
- **warning**: Yellow/warning themed modal
- **success**: Green/success themed modal
- **primary**: Blue/primary themed modal

## Spacing

- **default**: Standard padding
- **extra**: Additional padding for more spacious layout
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalContent: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div>
    <p className="mb-4">
      This is the content of the modal. You can put any React components here.
    </p>
    <Button onClick={onClose}>Close Modal</Button>
  </div>
);

const ModalWrapper: React.FC<{
  variant?: "default" | "warning" | "success" | "primary";
  space?: "default" | "extra";
}> = ({ variant, space = "default" }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={
          <div className="flex items-center justify-center w-full">
            Example Modal
          </div>
        }
        variant={variant}
        space={space}
      >
        <ModalContent onClose={() => setIsOpen(false)} />
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: () => <ModalWrapper />,
};

export const Warning: Story = {
  render: () => <ModalWrapper variant="warning" />,
};

export const Success: Story = {
  render: () => <ModalWrapper variant="success" />,
};

export const Primary: Story = {
  render: () => <ModalWrapper variant="primary" />,
};

export const ExtraSpace: Story = {
  render: () => <ModalWrapper variant="primary" space="extra" />,
};

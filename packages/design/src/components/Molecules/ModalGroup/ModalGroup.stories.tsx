import type { Meta, StoryObj } from "@storybook/react";
import ModalGroup from "./index";
import Button from "@/components/Atoms/Controls/Button";
import { useState } from "react";

const meta: Meta<typeof ModalGroup> = {
  title: "Molecules/Modal/ModalGroup",
  component: ModalGroup,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle:
      "ModalGroup is a multi-step component for guiding users through complex processes or forms.",
    docs: {
      description: {
        component: `
# ModalGroup Component

The ModalGroup component is a powerful and flexible solution for creating multi-step processes or forms in your application. It provides an intuitive way to guide users through complex tasks, with customizable steps and content.

## Features

- Customizable step content
- Progress indicator
- Animated transitions using Framer Motion
- External step control
- Optional internal navigation buttons
- Responsive design with customizable sizing
- Accessibility features, including closing the Modal by clicking outside

## Props

| Prop Name | Type | Description | Default |
|-----------|------|-------------|---------|
| isOpen | boolean | Controls the visibility of the modal | Required |
| onClose | function | Callback function to close the modal | Required |
| steps | array | Array of step objects containing title and content | Required |
| currentStep | number | Index of the current active step | Required |
| onStepChange | function | Callback function when step changes | Required |
| onComplete | function | Callback function when Multi Step Modal is completed | Required |
| useInternalNavigation | boolean | Whether to use internal navigation buttons | true |

## Usage

Here's a basic example of how to use the ModalGroup component:

\`\`\`jsx
import React, { useState } from 'react';
import ModalGroup from './ModalGroup';
import Button from './Button';

const steps = [
  {
    title: "Step 1",
    content: <div>Content for step 1</div>
  },
  {
    title: "Step 2",
    content: <div>Content for step 2</div>
  },
  {
    title: "Step 3",
    content: <div>Content for step 3</div>
  }
];

const modalGroupExample = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handleComplete = () => {
    console.log("Modal completed");
    setIsOpen(false);
    setCurrentStep(0);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <ModalGroup
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setCurrentStep(0);
        }}
        steps={steps}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        onComplete={handleComplete}
      />
    </>
  );
};

export default modalGroupExample;
\`\`\`

### External Navigation

You can control the navigation externally by setting \`useInternalNavigation\` to \`false\` and managing the step changes yourself:

\`\`\`jsx
const ExternalNavigationExample = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // ... rest of the component logic

  return (
    <ModalGroup
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
        setCurrentStep(0);
      }}
      steps={steps.map(step => ({
        ...step,
        content: (
          <>
            {step.content}
            <div>
              <Button onClick={handlePrevious} disabled={currentStep === 0}>Previous</Button>
              <Button onClick={handleNext}>{currentStep === steps.length - 1 ? 'Finish' : 'Next'}</Button>
            </div>
          </>
        )
      }))}
      currentStep={currentStep}
      onStepChange={setCurrentStep}
      onComplete={handleComplete}
      useInternalNavigation={false}
    />
  );
};
\`\`\`

See the stories below for more detailed usage examples.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ModalGroup>;

const steps = [
  {
    title: "Personal Information",
    content: (
      <div className="">
        <label className="block mb-2">
          Name:
          <input
            type="text"
            className="w-full p-2 border rounded text-black bg-slate-400"
          />
        </label>
        <label className="block mb-2">
          Email:
          <input
            type="email"
            className="w-full p-2 border rounded text-black bg-slate-400"
          />
        </label>
      </div>
    ),
  },
  {
    title: "Account Details",
    content: (
      <div className="">
        <label className="block mb-2">
          Username:
          <input
            type="text"
            className="w-full p-2 border rounded text-black bg-slate-400"
          />
        </label>
        <label className="block mb-2">
          Password:
          <input
            type="password"
            className="w-full p-2 border rounded text-black bg-slate-400"
          />
        </label>
      </div>
    ),
  },
  {
    title: "Confirmation",
    content: (
      <div className="">
        <p>Please review your information and confirm:</p>
        <ul className="list-disc list-inside">
          <li>Name: John Doe</li>
          <li>Email: john@example.com</li>
          <li>Username: johndoe</li>
        </ul>
      </div>
    ),
  },
];

const ModalGroupWrapper: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handleComplete = () => {
    console.log("Modal completed");
    setIsOpen(false);
    setCurrentStep(0);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <ModalGroup
        space="extra"
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setCurrentStep(0);
        }}
        steps={steps}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        onComplete={handleComplete}
      />
    </>
  );
};

export const Default: Story = {
  render: () => <ModalGroupWrapper />,
};

export const CustomStartStep: Story = {
  render: () => {
    const CustomWrapper = () => {
      const [isOpen, setIsOpen] = useState(false);
      const [currentStep, setCurrentStep] = useState(1); // Start at step 2

      const handleComplete = () => {
        console.log("Modal completed");
        setIsOpen(false);
        setCurrentStep(1);
      };

      return (
        <>
          <Button onClick={() => setIsOpen(true)}>
            Open Modal (Start at Step 2)
          </Button>
          <ModalGroup
            isOpen={isOpen}
            onClose={() => {
              setIsOpen(false);
              setCurrentStep(1);
            }}
            steps={steps}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
            onComplete={handleComplete}
          />
        </>
      );
    };

    return <CustomWrapper />;
  },
};

export const ExternalNavigation: Story = {
  render: () => {
    const ExternalNavigationWrapper = () => {
      const [isOpen, setIsOpen] = useState(false);
      const [currentStep, setCurrentStep] = useState(0);

      const handleComplete = () => {
        console.log("Modal completed");
        setIsOpen(false);
        setCurrentStep(0);
      };

      const handleNext = () => {
        if (currentStep < steps.length - 1) {
          setCurrentStep(currentStep + 1);
        } else {
          handleComplete();
        }
      };

      const handlePrevious = () => {
        if (currentStep > 0) {
          setCurrentStep(currentStep - 1);
        }
      };

      const externalControlSteps = [
        {
          title: "Personal Information",
          content: (
            <div className="">
              <label className="block mb-2">
                Name:
                <input
                  type="text"
                  className="w-full p-2 border rounded text-black bg-slate-400"
                />
              </label>

              <label className="block mb-2">
                Email:
                <input
                  type="email"
                  className="w-full p-2 border rounded text-black bg-slate-400"
                />
              </label>
              <div className="w-full flex justify-between mt-4">
                <Button onClick={handlePrevious} disabled={currentStep === 0}>
                  Previous
                </Button>
                <Button onClick={handleNext}>
                  {currentStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </div>
            </div>
          ),
        },
        {
          title: "Account Details",
          content: (
            <div className="">
              <label className="block mb-2">
                Username:
                <input
                  type="text"
                  className="w-full p-2 border rounded text-black bg-slate-400"
                />
              </label>
              <label className="block mb-2">
                Password:
                <input
                  type="password"
                  className="w-full p-2 border rounded text-black bg-slate-400"
                />
              </label>
              <div className="w-full flex justify-between mt-4">
                <Button onClick={handlePrevious} disabled={currentStep === 0}>
                  Previous
                </Button>
                <Button onClick={handleNext}>
                  {currentStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </div>
            </div>
          ),
        },
        {
          title: "Confirmation",
          content: (
            <div className="">
              <p>Please review your information and confirm:</p>
              <ul className="list-disc list-inside">
                <li>Name: John Doe</li>
                <li>Email: john@example.com</li>
                <li>Username: johndoe</li>
              </ul>
              <div className="w-full flex justify-between mt-4">
                <Button onClick={handlePrevious} disabled={currentStep === 0}>
                  Previous
                </Button>
                <Button onClick={handleNext}>
                  {currentStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </div>
            </div>
          ),
        },
      ];

      return (
        <div>
          <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
          <ModalGroup
            variant="primary"
            isOpen={isOpen}
            onClose={() => {
              setIsOpen(false);
              setCurrentStep(0);
            }}
            steps={externalControlSteps}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
            onComplete={handleComplete}
            useInternalNavigation={false}
          />
        </div>
      );
    };

    return <ExternalNavigationWrapper />;
  },
};

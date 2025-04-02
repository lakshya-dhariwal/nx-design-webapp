import { CompanyBadge } from "@/components";
import type { Meta, StoryObj } from "@storybook/react";
import { FaUser } from "react-icons/fa";

// Correct meta type definition
const meta = {
  title: "Custom/CompanyBadge",
  component: CompanyBadge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    componentSubtitle:
      "A component for displaying company or user profile information",
    docs: {
      description: {
        component: `

# CompanyBadge Component

The CompanyBadge component is a reusable UI element that displays an organization's or user's identity, typically used in navigation bars, sidebars, or profile sections.

## Features

- Displays a logo/avatar
- Shows title (e.g., company name, user name)
- Shows subtitle (e.g., role, designation)
- Glass-morphism design with backdrop blur
- Responsive layout

## Usage

\`\`\`jsx
import { CompanyBadge } from '@/components';
import { FaUser } from 'react-icons/fa';

function MyComponent() {
  return (
    <CompanyBadge
      title="John Doe"
      subtitle="Senior Developer"
      logo={
        <FaUser className="w-full h-full rounded-full bg-primary-400 text-white p-2" />
      }
    />
  );
}
\`\`\`

### With Complex Content

\`\`\`jsx
<CompanyBadge
  title={
    <div className="flex items-center gap-2">
      <span>Acme Corp</span>
      <VerifiedBadge />
    </div>
  }
  subtitle={
    <div className="flex flex-col">
      <span>Enterprise Plan</span>
      <span className="text-lg text-white">Technology</span>
    </div>
  }
  logo={<CompanyLogo className="w-full h-full" />}
/>
\`\`\`

## Properties



| Property  | Type        | Required | Description                          |
|-----------|-------------|----------|--------------------------------------|
| title     | ReactNode   | Yes      | Primary text/content to display      |
| subtitle  | ReactNode   | Yes      | Secondary text/content to display    |
| logo      | ReactNode   | Yes      | Logo or avatar component to display  |



## Styling

The component uses Tailwind CSS with the following default styles:
- Glass-morphism effect (\`backdrop-blur-lg\`)
- Rounded corners (\`rounded-xl\`)
- Semi-transparent white background
- Responsive text sizing


`,
      },
    },
  },
} satisfies Meta<typeof CompanyBadge>;

export default meta;

type Story = StoryObj<typeof CompanyBadge>;

export const Default: Story = {
  args: {
    title: (
      <div className="flex items-center gap-2">
        <span>Acme Corporation</span>
        <span className="text-green-400">●</span>
      </div>
    ),

    subtitle: (
      <div className="flex flex-col py-1">
        <span>Enterprise Customer</span>
        <span className="text-lg text-white heading-2">Technology Sector</span>
      </div>
    ),

    logo: (
      <FaUser className="w-full h-full rounded-full bg-blue-500 text-white p-2" />
    ),

    menu: [
      {
        title: "OPTION1",
        route: "_",
      },
      {
        title: "OPTION2",
        route: "_",
      },
    ],
  },
};

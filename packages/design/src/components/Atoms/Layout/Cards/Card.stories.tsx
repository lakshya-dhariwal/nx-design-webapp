import Button from "../../Controls/Button";
import Card from "./index";
import type { StoryObj } from "@storybook/react";
import { FaMeta } from "react-icons/fa6";
import { CiFilter } from "react-icons/ci";
import { useState } from "react";

const meta = {
  title: "Atoms/Layout/Card",
  tags: ["autodocs"],
  component: Card,
  parameters: {
    componentSubtitle:
      "Card is a versatile component for displaying content in a structured format with optional expandability.",
    docs: {
      description: {
        component: `
# Card Component

The Card component is a flexible and comprehensive solution for displaying content in a structured and visually appealing format. It supports headings, subheadings, icons, informational tooltips, and expandable sections.

## Features

- Customizable heading and subheading
- Optional icons and informational tooltips
- Expandable content sections
- Support for additional elements like buttons or links

## Usage

The Card component acts as a container for various content elements. It can be customized with headings, subheadings, icons, and more. It also supports expandable sections for displaying additional content.

### Basic Example

\`\`\`jsx
<Card
  heading="Card Heading"
  subheading="Card Subheading"
  icon={<IoInformationCircleOutline />}
  info="Additional information about the card"
  expandable={true}
  elements={[<button key="1">Action</button>]}
>
  <Card.PrimaryContent>
    This is the primary content of the card.
  </Card.PrimaryContent>
  <Card.SecondaryContent>
    This is the secondary content of the card, visible when expanded.
  </Card.SecondaryContent>
</Card>
\`\`\`

### Controlled Expansion Example

\`\`\`jsx
const [isExpanded, setIsExpanded] = useState(false);

<Card
  heading="Controlled Card"
  expandable={true}
  isExpanded={isExpanded}
  onExpandChange={setIsExpanded}
>
  <Card.PrimaryContent>Primary Content</Card.PrimaryContent>
  <Card.SecondaryContent>Secondary Content</Card.SecondaryContent>
</Card>
\`\`\`

## Properties

### Card

| Property       | Type                      | Description                                             |
|----------------|---------------------------|---------------------------------------------------------|
| heading        | string                    | The heading text for the card                           |
| subheading     | string                    | The subheading text for the card                        |
| icon           | React.ReactNode           | An optional icon to display alongside the heading       |
| info           | string                    | Informational tooltip text                              |
| expandable     | boolean                   | If true, the card content can be expanded               |
| isExpanded     | boolean                   | Control the expansion state externally                  |
| onExpandChange | (expanded: boolean) => void| Callback fired when expansion state changes            |
| elements       | React.ReactNode[]         | Additional elements to display in the card header      |
| children       | ReactNode                 | The content of the card                                 |

### PrimaryContent

| Property  | Type      | Description                                |
|-----------|-----------|--------------------------------------------|
| children  | ReactNode | The primary content of the card            |
| className | string    | Optional additional CSS class names        |

### SecondaryContent

| Property  | Type      | Description                                |
|-----------|-----------|--------------------------------------------|
| children  | ReactNode | The secondary content of the card          |
| className | string    | Optional additional CSS class names        |

## Customization

You can customize the appearance of the Card and its content using CSS classes. The example uses utility classes for layout and spacing.

        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicCard: Story = {
  args: {
    info: "Additional information about the card",
    expandable: false,
    children: (
      <div className="text-white">
        This is a basic card with no expandable content
      </div>
    ),
    elements: [<Button>Hello</Button>, <Button>world</Button>],
    heading: "User Profile",
    subheading: "This is an example of a user profile card",
  },
};

export const ColorBorderCard: Story = {
  args: {
    expandable: false,
    children: (
      <div className="text-white">
        This is a basic card with no expandable content
      </div>
    ),
    borderColor: "border-[2px] border-neonBlue-400",
  },
};

export const ExpandableCard: Story = {
  args: {
    variant: "expandable",
    expandable: true,
    children: (
      <>
        <Card.PrimaryContent className="flex items-center gap-2 w-full p-6 ">
          <FaMeta size={32} /> Meta
        </Card.PrimaryContent>
        <Card.SecondaryContent className="text-white">
          This is a secondary content area
        </Card.SecondaryContent>
      </>
    ),
  },
};

export const ControlledExpandableCard = {
  render: () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <div className="h-[600px]">
        <Button className="mb-6" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "Collapse" : "Expand"}
        </Button>
        <Card
          variant="expandable"
          expandable={true}
          isExpanded={isExpanded}
          onExpandChange={setIsExpanded}
        >
          <Card.PrimaryContent className="flex items-center gap-2 w-full p-6">
            <FaMeta size={32} /> Meta
          </Card.PrimaryContent>
          <Card.SecondaryContent className="text-white">
            This card's expansion state is controlled externally
          </Card.SecondaryContent>
        </Card>
      </div>
    );
  },
};

export const InformativeCard: Story = {
  args: {
    expandable: false,
    children: (
      <div className="text-white">
        This is a basic card with no expandable content
      </div>
    ),
    heading: "User Profile",
    icon: <CiFilter size={32} className="text-primary-500" />,
  },
};

export const PlainCard: Story = {
  args: {
    variant: "plain",
    info: "Additional information about the card",
    expandable: false,
    children: (
      <div className="text-white">
        This is a basic card with no expandable content
      </div>
    ),
    heading: "User Profile",
    icon: <CiFilter size={32} className="text-primary-500" />,
  },
};

import { StoryObj } from "@storybook/react";
import { TableComponent } from "./index";

const meta = {
  title: "Atoms/Data-Display/Table",
  component: TableComponent,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle:
      "Table is a flexible component for creating interactive and customizable tables with various input types.",
    docs: {
      description: {
        component: `
# Table Component

The Table component is a versatile and customizable data display element designed to present information in a structured, tabular format. It's composed of several sub-components that work together to create a cohesive and flexible table structure.

## Components

- Table: The main container component for the entire table structure.
- TableHeader: Contains the header row of the table.
- TableBody: Contains the body rows of the table.
- TableRow: Represents a single row in either the header or body.
- TableHead: Represents a header cell.
- TableCell: Represents a body cell.

## Usage

You can use the Table component in two ways:

- By composing the individual sub-components for more granular control.
- As a single *TableComponent* that accepts "tableHeader" and "tableBody" props.

### Option 1: Using Individual Sub-Components

\`\`\`jsx
<Table>
    <TableHeader>
      <TableRow>
        {tableHeader.map((header, index) => (
          <TableHead key={index}>{header}</TableHead>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody>
      {tableBody.map((row, index) => (
        <TableRow key={index}>
          {row.map((cell, index) => (
            <TableCell key={index}>{cell}</TableCell>
          ))}
        </TableRow>
        ))}
    </TableBody>
  </Table>
\`\`\`

### Option 2: Using TableComponent

\`\`\`jsx
import { TableComponent } from './path-to-component';

const MyTable = () => (
  <TableComponent
    tableHeader={["Column 1", "Column 2"]}
    tableBody={[
      ["Row 1, Cell 1", "Row 1, Cell 2"],
      ["Row 2, Cell 1", "Row 2, Cell 2"]
    ]}
  />
);
\`\`\`

        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Table",
  args: {
    tableHeader: [
      "Shop Name",
      "Linked User",
      "Destinations",
      "Events/Month",
      "Discount",
      "Bill",
    ],
    tableBody: [
      [
        "Router Pros",
        "debra.holt@example.com",
        "facebook",
        "googleanalytics",
        "16415",
        "150,00 €",
      ],
      [
        "Precision Machining Co.",
        "deanna.curtis@example.com",
        "facebook",
        "googleanalytics",
        "pinterest",
        "18599",
      ],
    ],
  },
};

import DataGrid from "./index";
import type { StoryObj } from "@storybook/react";

const meta = {
  title: "Molecules/DataGrid",
  component: DataGrid,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle:
      "DataGrid is a table component that allows you to display data in a tabular format.",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    enableItemNumber: false,
    data: [
      { firstName: "John", lastName: "Doe", age: 30 },
      { firstName: "Jane", lastName: "Smith", age: 25 },
      { firstName: "Bob", lastName: "Johnson", age: 40 },
      {
        firstName: "Alice",
        lastName: "Brown",
        age: 25,
      },
      {
        firstName: "Charlie",
        lastName: "Williams",
        age: 30,
      },
    ],
    columns: [
      {
        header: "First Name",
        accessorKey: "firstName",
      },
      {
        header: "Last Name",
        accessorKey: "lastName",
      },
      {
        header: "Age",
        accessorKey: "age",
      },
    ],
  },
};

export const WithoutFiltering: Story = {
  name: "DataGrid without filtering",
  args: {
    enableGlobalFilter: false,
    enablePagination: false,
    enableSorting: false,
    enableItemNumber: false,
    data: [
      { firstName: "John", lastName: "Doe", age: 30 },
      { firstName: "Jane", lastName: "Smith", age: 25 },
      { firstName: "Bob", lastName: "Johnson", age: 40 },
      {
        firstName: "Alice",
        lastName: "Brown",
        age: 25,
      },
      {
        firstName: "Charlie",
        lastName: "Williams",
        age: 30,
      },
    ],
    columns: [
      {
        header: "First Name",
        accessorKey: "firstName",
      },
      {
        header: "Last Name",
        accessorKey: "lastName",
      },
      {
        header: "Age",
        accessorKey: "age",
      },
    ],
  },
};

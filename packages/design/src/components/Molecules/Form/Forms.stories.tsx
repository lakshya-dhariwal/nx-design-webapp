import type { StoryObj } from "@storybook/react";
import Form from "./index";
import Input from "@/components/Atoms/Controls/Input";
import Button from "@/components/Atoms/Controls/Button";

const meta = {
  title: "Molecules/Form",
  component: Form,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle:
      "Form is a flexible component for creating interactive and customizable forms with various input types.",
    docs: {
      description: {
        component: `
# Form Component

The Form component is a versatile and comprehensive solution for creating forms in your application. It supports a wide range of input types and provides a structured layout for organizing form elements.

## Features

- Supports multiple input types (text, email, password, number, radio, switch, dropdown, date)
- Customizable layout using grid system
- Built-in form submission handling
- Optional fields with badge support
- Nested dropdown options

## Usage

The Form component acts as a container for various input elements. It handles form submission and provides a consistent structure for your forms.

### Basic Example

\`\`\`jsx
<Form onSubmit={(data) => console.log(data)}>
  <div className="grid grid-cols-2 gap-4">
    <Input placeholder="Username" name="username" label="Username" type="text" />
    <Input placeholder="Email" name="email" label="Email" type="email" />
    {/* Add more input fields as needed */}
  </div>
  <Button type="submit">Submit</Button>
</Form>
\`\`\`

## Input Types

The Form component supports various input types through the Input component:

- Text
- Email
- Password
- Number
- Radio
- Switch
- Dropdown
- Date

Each input type has its own specific props and behavior.

## Layout

The form uses a grid layout system for organizing inputs. You can customize the layout by adjusting the grid classes.

## Submission

Form submission is handled by the \`onSubmit\` prop. The submitted data is passed as an argument to this function.

## Accessibility

- Use appropriate labels for all input fields
- Ensure proper tab order for keyboard navigation
- Use \`required\` attribute for mandatory fields

## Customization

You can customize the appearance of the Form and its inputs using CSS classes. The example uses utility classes for layout and spacing.

        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: (data: any) => alert(JSON.stringify(data)),
    children: (
      <div className="">
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Username"
            name="username"
            label="Username"
            type="text"
          />
          <Input placeholder="Email" name="email" label="Email" type="email" />
          <Input
            placeholder="Password"
            name="password"
            label="Password"
            type="password"
          />
          <Input
            placeholder="Age"
            name="age"
            label="Age"
            type="number"
            min={0}
            max={120}
          />
          <Input
            onChange={(value) => alert(value)}
            name="gender"
            label="Gender"
            type="radio"
            radioOptions={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
            ]}
          />
          <Input
            name="notifications"
            label="Receive notifications"
            type="switch"
          />
          <Input
            required={false}
            name="phone"
            label="Phone Number"
            type="tel"
            badge="OPTIONAL"
          />

          <Input
            placeholder="Select Industry"
            label="Industry"
            name="industry"
            type="dropdown"
            className="w-full"
            dropdownOptions={[
              { label: "Menu 1", key: "menu1" },
              { label: "Menu 2", key: "menu2", disabled: true },
              { label: "Menu 3", key: "menu3" },
              {
                label: "Menu 4",
                key: "menu4",
              },
              { label: "Menu 5", key: "menu5" },
            ]}
            required={true}
          />
        </div>
        <div className="w-full flex justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </div>
    ),
  },
};

import { AiFillAmazonCircle } from "react-icons/ai";
import ChannelSelector from "./index";
import type { StoryObj } from "@storybook/react";

const meta = {
  title: "Molecules/Channel",
  component: ChannelSelector,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle:
      "Channel is a component that allows users to select a value from a list of options.",
    docs: {
      description: {
        component: `
# Channel Component

The Channel component is a versatile UI element that allows users to select a value from a list of options on Hover.

### Basic Example

\`\`\`jsx
<Channel
  onChange={(item) => alert(JSON.stringify(item))}
  menuList={[
    { label: "Menu 1", key: "menu1", icon: <AiFillAmazonCircle /> },
    { label: "Menu 2", key: "menu2", icon: <AiFillAmazonCircle /> },
    { label: "Menu 3", key: "menu3", icon: <AiFillAmazonCircle /> },
    {
      label: "Menu 4",
      key: "menu4",
      icon: <AiFillAmazonCircle />,
    },
    { label: "Menu 5", key: "menu5", icon: <AiFillAmazonCircle /> },  
  ]}
/>
\`\`\`

## Props

| Prop | Type | Description |
|------|------|-------------|
| onChange | (item: ChannelItem) => void | Callback function to handle the selected item |
| menuList | ChannelItem[] | An array of menu items to display in the dropdown menu |
| className | string | Additional class name for the component |
| defaultValue | ChannelItem | Default value of the component |

### ChannelItem

| Prop | Type | Description |
|------|------|-------------|
| label | string | The label of the menu item |
| key | string | The key of the menu item |
| icon | React.ReactNode | The icon of the menu item |

        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: {
      label: "Menu 3",
      key: "menu3",
      icon: <AiFillAmazonCircle />,
    },
    onChange: (item) => alert(JSON.stringify(item)),
    menuList: [
      { label: "Menu 1", key: "menu1", icon: <AiFillAmazonCircle /> },
      { label: "Menu 2", key: "menu2", icon: <AiFillAmazonCircle /> },
      { label: "Menu 3", key: "menu3", icon: <AiFillAmazonCircle /> },
      {
        label: "Menu 4",
        key: "menu4",
        icon: <AiFillAmazonCircle />,
      },
      { label: "Menu 5", key: "menu5", icon: <AiFillAmazonCircle /> },
    ],
  },
};

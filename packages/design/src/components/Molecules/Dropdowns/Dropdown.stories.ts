import DropdownMenu from "./index";
import type { StoryObj } from "@storybook/react";

const meta = {
  title: "Molecules/Dropdown",
  component: DropdownMenu,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle:
      "Dropdowns are toggleable, contextual overlays for displaying lists of links and more. They’re made interactive with the included dropdown directives.",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Dropdown",
    className: " w-1/2",
    onChange: (item) => alert(JSON.stringify(item)),
    menuList: [
      { label: "Menu 1", key: "menu1" },
      { label: "Menu 2", key: "menu2", disabled: true },
      { label: "Menu 3", key: "menu3" },
      {
        label: "Menu 4",
        key: "menu4",
      },
      { label: "Menu 5", key: "menu5" },
    ],
  },
};

export const DropdownSm: Story = {
  name: "Small Size",
  args: {
    size: "sm",
    children: "Dropdown",
    onChange: (item) => alert(JSON.stringify(item)),
    className: "w-1/4",
    menuList: [
      { label: "Menu 1", key: "menu1" },
      { label: "Menu 2", key: "menu2", disabled: true },
      { label: "Menu 3", key: "menu3" },
      { label: "Menu 4", key: "menu88" },
      { label: "Menu 5", key: "menu4" },
      { label: "Menu 6", key: "menu5" },
      { label: "Menu 7", key: "menu6" },
      { label: "Menu 8", key: "menu7" },

      {
        label: "Menu 4",
        key: "menu4",
      },
      { label: "Menu 5", key: "menu5" },
    ],
  },
};

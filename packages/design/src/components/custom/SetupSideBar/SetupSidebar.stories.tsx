import { SetupSidebar } from "./SetupSideBar";
import { SetupSidebarItem } from "./SetupSideBarItem";
import { SetupSidebarMenu } from "./SetupSideBarMenu";

import type { StoryObj } from "@storybook/react";
import { SidebarItem as SidebarItemType } from "@/types";
import Line from "@/components/Atoms/Misc/Line";
import Button from "@/components/Atoms/Controls/Button";

const meta = {
  title: "Custom/SetupSidebar",
  component: SetupSidebar,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle:
      "The Sidebar is used in the Mable Dashboard to redirect to different pages",
    docs: {
      description: {
        component: `
# Sidebar Component

The Sidebar component is used in the Mable Dashboard to redirect to different pages. It can be customized with different colors and sizes.

## Features

- Customizable sidebar menu
- Support for different types of sidebars (dashboard and setup)

## Usage

The Sidebar component is used to display the sidebar menu in the dashboard and setup pages. It can be customized with different colors and sizes.

### Basic Example

\`\`\`jsx
<Sidebar
  type="dashboard"
  companyBadge={{
    title: "Mable",
    subtitle: "Analytics",
    logo: <div className="w-full h-full bg-black rounded-full"></div>,
  }}>
      <SidebarMenu title="Home" id="1">
        <SidebarItem
          onClick={() => alert("Navigated to /overview")}
          title="Overview"
          icon={<FaHome />}
        />
        <SidebarItem
          onClick={() => alert("Navigated to /analytics")}
          title="Analytics"
          icon={<FaHome />}
        />
      </SidebarMenu>
      <SidebarMenu title="Algorithm Data Optimization" id="2">
        <SidebarItem
          onClick={() => alert("Navigated to /settings")}
          title="Settings"
          icon={<FaHome />}
        />
        <SidebarItem
          onClick={() => alert("Navigated to /performance")}
          title="Performance"
          icon={<FaHome />}
        />
      </SidebarMenu>
</Sidebar>
\`\`\`

## Properties

### Sidebar

| Property     | Type            | Description                                             |
|--------------|-----------------|---------------------------------------------------------|
| type         | "dashboard" or "setup" | The type of sidebar to display |
| companyBadge | object          | An object containing the company's title, subtitle, and logo |
| children     | ReactNode       | The content of the sidebar                              |

### SidebarMenu

| Property     | Type            | Description                                             |
|--------------|-----------------|---------------------------------------------------------|
| title        | string          | The title of the menu item                              |
| icon         | React.ReactNode | An optional icon to display alongside the title         |
| id           | string          | A unique identifier for the menu item                   |
| children     | ReactNode       | The content of the menu item                            |
| isActive     | boolean         | If true, the menu item is highlighted                   |
| currStage    | number          | The current stage of the setup process                   |

### SidebarItem

| Property     | Type            | Description                                             |
|--------------|-----------------|---------------------------------------------------------|
| title        | string          | The title of the menu item                              |
| icon         | React.ReactNode | An optional icon to display alongside the title         |
| isActive     | boolean         | If true, the menu item is highlighted                   |
| isComplete   | boolean         | If true, the menu item is marked as complete             |
| onClick      | function        | A function to be called when the menu item is clicked   |

        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const setupMenuOptions: SidebarItemType[] = [
  {
    id: "accountSetup",
    title: "Account Setup",
    subItems: [
      {
        title: "User Profile",
        route: "setup/account/user",
      },
      {
        title: "Company Profile",
        route: "setup/account/company",
      },
      {
        title: "Data Protection Officer",
        route: "setup/account/dpo",
      },
      {
        title: "Terms and Conditions",
        route: "setup/account/toc",
      },
      {
        title: "Invite Team Members",
        route: "setup/account/invite",
      },
    ],
  },
  {
    id: "storeSetup",
    title: "Store Setup",
    subItems: [
      {
        title: "Overview",
        route: "/store/overview",
      },
      {
        title: "Pricing Plan",
        route: "/store/plan",
      },
    ],
  },
];

export const DefaultSetupSidebar: Story = {
  args: {
    logout: <Button className="w-full mb-2 bg-opacity-15">Logout</Button>,
    companyBadge: {
      title: "John Doe",
      subtitle: "Assistant",
      logo: <div className="w-full h-full bg-black rounded-full"></div>,
    },
    support: (
      <div className="flex items-center justify-center gap-2 text-white body-2 bg-white bg-opacity-10 border-2 rounded-md border-primary-400 p-2 mt-2 cursor-pointer">
        <img src="/assets/support.svg" className="flex-shrink-0" />
        Mable Support
      </div>
    ),
    children: (
      <>
        {setupMenuOptions.map((item, index) => (
          <SetupSidebarMenu
            isActive={true}
            key={index}
            title={item.title}
            id={item.id}
            currStage={3}
            isComplete={true}
          >
            {item.subItems &&
              item.subItems.map((subItem, index) => {
                return (
                  <>
                    <SetupSidebarItem
                      key={index}
                      isActive={index === 3}
                      title={subItem.title}
                      isComplete={index < 3}
                    />
                    {index < item.subItems.length - 1 && (
                      <Line className=" h-7 w-[1px] bg-white/50 ml-5" />
                    )}
                  </>
                );
              })}
          </SetupSidebarMenu>
        ))}
      </>
    ),
  },
};

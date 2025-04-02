import { FaHome } from "react-icons/fa";
import { DashboardSidebarItem } from "./DashboardSidebarItem";
import { DashboardSidebarMenu } from "./DashboardSidebarMenu";
import { DashboardSidebar } from "./DashboardSidebar";
import type { StoryObj } from "@storybook/react";
import { SidebarItem as SidebarItemType } from "@/types";
import { Button } from "@/components";
import { useState } from "react";

const meta = {
  title: "Custom/DashboardSidebar",
  component: DashboardSidebar,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle:
      "The Sidebar is used in the Mable Dashboard to redirect to different pages",
    docs: {
      description: {
        component: `
# DashboardSidebar Component

The DashboardSidebar component is used in the Mable Dashboard to redirect to different pages.

### Basic Example

\`\`\`jsx
<DashboardSidebar
secondaryView: false,
  logout={
    <Button
      onClick={() => {
        setLogoutModal(true);
      }}
      variant="default"
      className="w-full flex gap-2 heading-2 items-center justify-center bg-opacity-20"
    >
      <FaExternalLinkAlt />
      Logout
    </Button>
  }
  companyBadge={{
    title: sessionData?.profile?.name,
    subtitle: (
      <div className="flex flex-col py-1">
        <span>{sessionData?.profile?.designation}</span>
        <span className="text-lg text-white heading-2">
          {sessionData?.company?.name}
        </span>
      </div>
    ),
    logo: (
      <FaUser className="w-full h-full rounded-full bg-primary-400 text-white p-2" />
    ),
    menu: [
        {
          title: "User Account Settings",
          route: "/setting",
        },
        {
          title: "Company Settings",
          route: "/company",
        },
      ],
      onClick: (value: string | React.MouseEventHandler<HTMLDivElement>) => {
        alert(("Navigated to " + value) as string);
      },
  }}
>
  {dashboardMenuOptions.map((item, index) => (
    <DashboardSidebarMenu
      id={item.id}
      title={item.title}
      key={index}
    >
      {item.subItems
        ? item.subItems.map((item, index) => (
            <DashboardSidebarItem
              onClick={() => navigate(item.route)}
              icon={item.icon}
              isActive={pathname.includes(item.route)}
              title={item.title}
              key={index}
            />
          ))
        : ''}
    </DashboardSidebarMenu>
  ))}
</DashboardSidebar>
\`\`\`

## Properties

### Sidebar

| Property     | Type            | Description                                             |
|--------------|-----------------|---------------------------------------------------------|
| logout         | React.ReactNode | Logout Component |
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

const DashboardSidebarItems: SidebarItemType[] = [
  {
    id: "1",
    title: "Home",
    subItems: [
      { route: "/overview", title: "Overview", icon: <FaHome /> },
      { route: "/analytics", title: "Analytics", icon: <FaHome /> },
    ],
  },
  {
    id: "2",
    title: "Algorithm Data Optimization",
    subItems: [
      { route: "/settings", title: "Settings", icon: <FaHome /> },
      {
        route: "/performance",
        title: "Performance",
        icon: <FaHome />,
      },
    ],
  },
];

export const DashboardSidebarStory: Story = {
  render: () => {
    const [secondaryView, setSecondaryViewState] = useState<boolean>(false);
    return (
      <DashboardSidebar
        admin={<Button className="w-full mb-2 bg-opacity-15">Admin</Button>}
        logout={() => alert("Logout")}
        companyBadge={{
          menu: [
            {
              title: "User Account Settings",
              route: "/setting",
            },
            {
              title: "Company Settings",
              route: "/company",
            },
          ],
          onClick: (value: string) => {
            alert(("Navigated to " + value) as string);
          },
          title: "John Doe",
          subtitle: "Assistant",
          logo: <div className="w-full h-full bg-black rounded-full"></div>,
        }}
        secondaryView={secondaryView}
        toggleSecondaryView={() => {
          setSecondaryViewState(!secondaryView);
        }}
      >
        {DashboardSidebarItems.map((item) => (
          <DashboardSidebarMenu key={item.id} title={item.title} id={item.id}>
            {item.subItems?.map((subItem, index) => (
              <DashboardSidebarItem
                onClick={() => alert("Navigated to " + subItem.route)}
                key={subItem.route}
                isActive={index === 1}
                title={subItem.title}
                icon={subItem.icon}
              />
            ))}
          </DashboardSidebarMenu>
        ))}
      </DashboardSidebar>
    );
  },
  args: {
    // secondaryView: false => should be a state variable while consumption of this component
    toggleSecondaryView: () => {},
    secondaryView: false,
    admin: <Button className="w-full mb-2 bg-opacity-15">Admin</Button>,
    logout: () => alert("Logout"),
    companyBadge: {
      menu: [
        {
          title: "User Account Settings",
          route: "/setting",
        },
        {
          title: "Company Settings",
          route: "/company",
        },
      ],
      onClick: (value: string) => {
        alert(("Navigated to " + value) as string);
      },
      title: "John Doe",
      subtitle: "Assistant",
      logo: <div className="w-full h-full bg-black rounded-full"></div>,
    },
    children: <></>,
  },
};

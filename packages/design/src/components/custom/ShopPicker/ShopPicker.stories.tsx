import ShopPicker from "./index";
import type { StoryObj } from "@storybook/react";

const meta = {
  title: "Custom/ShopPicker",
  component: ShopPicker,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle:
      "Dropdowns are toggleable, contextual overlays for displaying lists of links and more. They’re made interactive with the included dropdown directives.",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

type ShopType = "shopify" | "shopware5" | "shopware6";

interface SubShop {
  name: string;
  isActive: boolean;
  type: ShopType;
}

interface Shop {
  name: string;
  isActive: boolean;
  type: ShopType;
  subShops?: SubShop[];
}

const shopNames = [
  "Gotham Gadgets",
  "Hogwarts Emporium",
  "Jurassic Junkyard",
  "Narnia Nook",
  "Wakanda Wares",
  "Middle-earth Market",
  "Blade Runner Bazaar",
  "Ghostbusters Gear",
  "Matrix Marketplace",
  "Pandora's Pantry",
  "Tatooine Traders",
  "Wonderland Wonders",
  "Asgardian Artifacts",
  "Cybertron Circuits",
  "Emerald City Essentials",
  "Frankenstein's Finds",
  "Godzilla's Garage",
  "Hoth Hardware",
  "Isla Nublar Imports",
  "Jedi Junkshop",
  "Katniss' Quiver",
  "LV-426 Liquidators",
  "Mordor Merchandise",
  "Neverland Necessities",
  "Oz Oddities",
  "Privet Drive Provisions",
  "Quantum Realm Quirks",
  "Ripley's Relics",
  "Shutter Island Surplus",
  "Tron's Technomart",
  "Upside Down Umbrella Shop",
  "Vulcan Valuables",
  "Westworld Wares",
  "Xandar Xenogoods",
  "Yavin Yields",
  "Zion Zen Zone",
  "Alderaan Antiques",
  "Babylon 5 Bargains",
  "Coruscant Curios",
  "Dune's Desert Depot",
  "Elysium Electronics",
  "Ferris' Day Off Deals",
  "Gallifrey Gizmos",
  "Helm's Deep Hardware",
  "Inception Innovations",
  "Jakku Junk Jewels",
  "Krypton Knick-Knacks",
  "Lotus Casino Luxuries",
  "Metropolis Marvels",
  "Naboo Novelties",
  "Oasis Online Outlet",
  "Panem's Peculiarities",
  "Quantum of Solace Supplies",
  "Rivendell Rarities",
  "Skynet Systems Store",
  "Titan A.E. Tech Treasures",
];

const generateSampleShops = (count: number): Shop[] => {
  return shopNames.slice(0, count).map((name, index) => ({
    name,
    isActive: Math.random() > 0.2, // 80% chance of being active
    type: ["shopify", "shopware5", "shopware6"][
      Math.floor(Math.random() * 3)
    ] as Shop["type"],
    subShops:
      Math.random() > 0.7
        ? [
            // 30% chance of having subshops
            {
              name: `${name} Annex`,
              isActive: Math.random() > 0.2,
              type: ["shopify", "shopware5", "shopware6"][
                Math.floor(Math.random() * 3)
              ] as Shop["type"],
            },
            {
              name: `${name} Express`,
              isActive: Math.random() > 0.2,
              type: ["shopify", "shopware5", "shopware6"][
                Math.floor(Math.random() * 3)
              ] as Shop["type"],
            },
          ]
        : undefined,
  }));
};

export const Default: Story = {
  args: {
    className: "min-w-[400px] max-w-[35%]",
    activeShop: { name: "Main Shop", isActive: true, type: "shopify" },
    onChange: (item, event) => {
      alert(JSON.stringify(item));
      console.log(event);
    },
    shopList: generateSampleShops(50),
  },
};

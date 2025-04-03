import Button from "../../atoms/Controls/Button";
import { Tooltip } from "./index";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Tooltip> = {
    title: "Atoms/Misc/Tooltip",
    component: Tooltip,
    tags: ["autodocs"],
    parameters: {
        componentSubtitle:
            "Tooltip is a extra information about the element on hover.",
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        content: (
            <div className=" body-1 w-fit rounded-lg text-white">
                <p>Tooltip</p>
                <p className="text-xs">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                </p>
                <p className="text-xs">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                </p>
            </div>
        ),

        children: (
            <div className="w-fit">
                <Button>Select Me</Button>
            </div>
        ),
    },
};

import React from "react";

export default function Link({
    label = "Test",
    onClick,
}: {
    label: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
    return (
        <button
            onClick={onClick}
            className="flex h-fit w-fit flex-row items-center space-x-1 border-2"
        >
            <img src="/assets/Grid.svg" className=" text-black"></img>
            <span className="body-4 text-primary-400">{label}</span>
        </button>
    );
}

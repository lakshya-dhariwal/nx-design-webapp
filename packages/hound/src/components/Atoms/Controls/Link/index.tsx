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
      className="border-2 space-x-1 flex flex-row h-fit w-fit items-center"
    >
      <img src="/assets/Grid.svg" className=" text-black"></img>
      <span className="text-primary-400 body-4">{label}</span>
    </button>
  );
}

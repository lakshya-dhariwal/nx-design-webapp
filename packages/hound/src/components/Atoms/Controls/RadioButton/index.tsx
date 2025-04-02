import React from "react";
import { VariantProps } from "class-variance-authority";
import { tv } from "tailwind-variants";
import { RadioOptions } from "@/types";

const radioVariants = tv({
  base: "flex items-center space-x-2 cursor-pointer",
});

const bulletClassName = tv({
  base: "w-6 h-6 bg-[#8390A4] rounded-full transition-all duration-200 ease-in-out relative cursor-pointer flex-shrink-0",
  variants: {
    active: {
      true: "bg-white border-primary-400 border-[3px]",
      false: " ",
    },
    size: {
      sm: "w-4 h-4",
      md: "w-6 h-6",
      lg: "w-8 h-8",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type RadioProps = {
  labelClassName?: string;
  options: RadioOptions[];
  defaultValue: string;
  className?: string;
  onClick: (value: { label: string; value: string }) => void;
} & VariantProps<typeof bulletClassName>;

const Radio: React.FC<RadioProps> = ({
  options,
  defaultValue,
  className,
  labelClassName,
  onClick,
  size,
}) => {
  const [selectedValue, setSelectedValue] = React.useState(defaultValue);

  const handleClick = (option: RadioOptions) => {
    if (!option.disabled) {
      setSelectedValue(option.value);
      onClick(option);
    }
  };

  return (
    <div className={className}>
      {options.map((option) => (
        <label
          key={option.value}
          className={radioVariants({
            className: option.disabled ? "opacity-50 cursor-not-allowed" : "",
          })}
        >
          <input
            type="radio"
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => handleClick(option)}
            disabled={option.disabled}
            className="sr-only"
          />
          <div
            className={bulletClassName({
              size,
              active: selectedValue === option.value,
            })}
          />

          <span className={labelClassName}>{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default Radio;

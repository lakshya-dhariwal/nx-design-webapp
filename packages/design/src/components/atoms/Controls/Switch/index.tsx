import React, { InputHTMLAttributes, forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import { tv } from "tailwind-variants";

interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ name, label, className, checked, onChange, ...rest }, ref) => {
    const formContext = useFormContext();

    const isControlled = checked !== undefined && onChange !== undefined;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isControlled && onChange) {
        onChange(e);
      }
    };

    const inputProps = isControlled
      ? { checked, onChange: handleChange }
      : formContext
        ? formContext.register(name)
        : {};

    const labelClass = tv({
      base: "flex items-center  w-fit",
      variants: {
        disabled: {
          true: "cursor-not-allowed",
          false: "cursor-pointer",
        },
      },
    });
    return (
      <label className={labelClass({ disabled: rest.disabled, className })}>
        {label && <span className="body-2 text-white mr-3">{label}</span>}
        <div className="relative w-fit">
          <input
            type="checkbox"
            className="sr-only peer"
            {...inputProps}
            {...rest}
            ref={ref}
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-400 transition-all duration-200 ease-in-out"></div>
        </div>
      </label>
    );
  },
);

Switch.displayName = "Switch";

export default Switch;

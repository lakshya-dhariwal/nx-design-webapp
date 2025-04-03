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
            <label
                className={labelClass({ disabled: rest.disabled, className })}
            >
                {label && (
                    <span className="body-2 mr-3 text-white">{label}</span>
                )}
                <div className="relative w-fit">
                    <input
                        type="checkbox"
                        className="peer sr-only"
                        {...inputProps}
                        {...rest}
                        ref={ref}
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 transition-all duration-200 ease-in-out after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-400 peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-gray-700"></div>
                </div>
            </label>
        );
    }
);

Switch.displayName = "Switch";

export default Switch;

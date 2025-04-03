import React, { useEffect, useState, useRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const bulletSlider = tv({
  base: "flex flex-row justify-between relative w-full",
  variants: {
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const bullet = tv({
  base: "rounded-full transition-all duration-200 ease-in-out relative cursor-pointer bg-[#8390A4]",
  variants: {
    active: {
      true: "bg-white border-primary-400 border-[3px]",
      false: " ",
    },
    passed: {
      true: " bg-primary-400",
      false: "",
    },
    size: {
      sm: "w-5 h-5",
      md: "w-6 h-6",
      lg: "w-7 h-7",
    },
  },
  defaultVariants: {
    active: false,
    size: "md",
  },
});

const line = tv({
  base: "h-[0px] border-[2px] border-[#8390A4] absolute z-[-1] top-1/2 -translate-y-1/2 left-[50%] w-full",
  variants: {
    passed: {
      true: "border-primary-400",
      false: "",
    },
    size: {
      sm: "border-[1.5px]",
      md: "border-[2px]",
      lg: "border-[2.5px]",
    },
    dashed: {
      true: "[border-style:dashed] [border-width:2px_0_0_0] [gap:1rem]",
      false: "",
    },
  },
  defaultVariants: {
    size: "md",
    dashed: false,
  },
});

const customInput = tv({
  base: "bg-white bg-opacity-10 text-white text-center focus:outline-none focus:border-primary-400 p-1 rounded-md",
  variants: {
    size: {
      sm: "text-[12px] w-28",
      md: "text-[13px] w-[7rem]",
      lg: "text-lg w-36",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const label = tv({
  base: "mt-2 text-white text-center",
  variants: {
    size: {
      sm: "text-[14px]",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

/**
 * BulletSlider is a customizable progress indicator component that displays a series of connected bullet points.
 * Each bullet represents a step or stage in a process, with connecting lines between them to show progression.
 *
 * Features:
 * - Responsive full-width layout with evenly spaced bullets
 * - Customizable bullet and line sizes (sm, md, lg)
 * - Optional custom input field as the last step
 * - Visual indication of completed steps
 * - Support for dashed lines for custom input section
 *
 * @param {JSX.Element[]} steps - Array of React elements to be displayed as labels below each bullet
 * @param {Function} onChange - Callback function triggered when a step is selected. Receives step index and optional custom value
 * @param {string} [className] - Additional CSS classes to apply to the container
 * @param {number} [defaultActiveStep=1] - Initial active step index (0-based)
 * @param {boolean} [linePassed=true] - Whether to show completed lines for passed steps
 * @param {boolean} [showCustomInput=false] - Whether to show a custom input field as the last step
 * @param {string} [customInputPlaceholder="Custom"] - Placeholder text for the custom input field
 * @param {string} [defaultCustomValue=""] - Initial value for the custom input field
 * @param {"sm" | "md" | "lg"} [size="md"] - Size variant for bullets and lines
 *
 * @example
 * ```tsx
 * <BulletSlider
 *   steps={["Step 1", "Step 2", "Step 3"]}
 *   onChange={(step, customValue) => console.log(step, customValue)}
 *   size="md"
 *   showCustomInput={true}
 * />
 * ```
 */
interface BulletSliderProps extends VariantProps<typeof bulletSlider> {
  steps: JSX.Element[];
  onChange: (step: number, customValue?: string) => void;
  className?: string;
  defaultActiveStep?: number;
  linePassed?: boolean;
  showCustomInput?: boolean;
  customInputPlaceholder?: string;
  defaultCustomValue?: string;
  size?: "sm" | "md" | "lg";
}

export const BulletSlider: React.FC<BulletSliderProps> = ({
  steps,
  onChange,
  defaultActiveStep = 1,
  className,
  linePassed = true,
  showCustomInput = false,
  customInputPlaceholder = "Custom",
  defaultCustomValue = "",
  size = "md",
}) => {
  const [lineWidth, setLineWidth] = useState(0);
  const [customValue, setCustomValue] = useState(defaultCustomValue);
  const [activeStep, setActiveStep] = useState(defaultActiveStep);

  const bulletRefs = useRef<(HTMLDivElement | null)[]>([]);

  const totalSteps = showCustomInput
    ? [...steps, <div key="custom">Custom</div>]
    : steps;
  const lastIndex = totalSteps.length - 1;

  const calculateLineWidth = () => {
    if (bulletRefs.current[0] && bulletRefs.current[1]) {
      const standardWidth =
        bulletRefs.current[1].getBoundingClientRect().left -
        bulletRefs.current[0].getBoundingClientRect().left;
      setLineWidth(standardWidth);
    }
  };

  const getLineWidth = (index: number) => {
    if (showCustomInput && index === totalSteps.length - 2) {
      return lineWidth * 1.2;
    }
    return lineWidth;
  };

  useEffect(() => {
    calculateLineWidth();
    window.addEventListener("resize", calculateLineWidth);
    return () => window.removeEventListener("resize", calculateLineWidth);
  }, []);

  useEffect(() => {
    calculateLineWidth();
  }, [steps]);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    if (index === lastIndex && showCustomInput) {
      onChange(index, customValue);
    } else {
      onChange(index);
    }
  };

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomValue(value);
    if (activeStep === lastIndex) {
      onChange(lastIndex, value);
    }
  };

  return (
    <div className={bulletSlider({ size, className })}>
      {totalSteps.map((step, index) => (
        <div
          key={index}
          className="flex flex-col items-center"
          ref={(el) => (bulletRefs.current[index] = el)}
        >
          <div className="flex items-center relative">
            <div
              className={bullet({
                active: activeStep === index,
                passed: linePassed ? activeStep > index : false,
                size,
              })}
              onClick={() => handleStepClick(index)}
            />
            {index !== totalSteps.length - 1 && (
              <div
                style={{ width: `${getLineWidth(index)}px` }}
                className={line({
                  passed: linePassed ? activeStep > index : false,
                  size,
                  dashed: showCustomInput && index === totalSteps.length - 2,
                })}
              />
            )}
          </div>
          <div className={label({ size })}>
            {showCustomInput && index === lastIndex ? (
              <input
                type="text"
                value={customValue}
                onChange={handleCustomInputChange}
                placeholder={customInputPlaceholder}
                className={customInput({ size })}
                onFocus={() => handleStepClick(index)}
              />
            ) : (
              step
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

export interface SliderProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
    "onChange" | "value" | "defaultValue"
  > {
  variant?: "single" | "multi";
  min?: number;
  max?: number;
  step?: number;
  value?: number | [number, number];
  defaultValue?: number | [number, number];
  color?: string;
  lowerColor?: string;
  trackColor?: string;
  higherColor?: string;
  onChange?: (value: number | [number, number]) => void;
  minStepsBetweenThumbs?: number;
  showTooltip?: boolean;
  customTooltip?: (value: number, index?: number) => React.ReactNode;
  tooltipClassName?: string;
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(
  (
    {
      className,
      variant = "single",
      min = 0,
      max = 100,
      step = 1,
      value,
      defaultValue,
      color = "#3b82f6",
      lowerColor = "#3b82f6",
      higherColor = "#ef4444",
      trackColor = "#ffff",
      onChange,
      minStepsBetweenThumbs = 1,
      showTooltip = false,
      customTooltip = (value) => value.toString(),
      tooltipClassName,
      ...props
    },
    ref,
  ) => {
    const isMulti = variant === "multi";

    const normalizedValue = React.useMemo(() => {
      if (!value) return undefined;
      return isMulti ? (value as [number, number]) : [value as number];
    }, [value, isMulti]);

    const normalizedDefault = React.useMemo(() => {
      if (!defaultValue) return isMulti ? [25, 75] : [50];
      return isMulti
        ? (defaultValue as [number, number])
        : [defaultValue as number];
    }, [defaultValue, isMulti]);

    const Tooltip = ({ value, index }: { value: number; index: number }) => {
      if (!showTooltip) return null;
      return (
        <div
          className={cn(
            "absolute -bottom-8 left-1/2 -translate-x-1/2",
            tooltipClassName,
          )}
        >
          {customTooltip(value, isMulti ? index : undefined)}
        </div>
      );
    };

    return (
      <SliderPrimitive.Root
        ref={ref}
        min={min}
        max={max}
        step={step}
        minStepsBetweenThumbs={minStepsBetweenThumbs}
        value={normalizedValue}
        defaultValue={normalizedDefault}
        onValueChange={(val) =>
          onChange?.(isMulti ? (val as [number, number]) : val[0])
        }
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className,
        )}
        {...props}
      >
        <span className="text-white absolute -left-1 top-2 text-sm">{min}</span>
        <SliderPrimitive.Track
          style={{
            backgroundColor: trackColor,
          }}
          className={cn(
            "relative h-1 w-full grow overflow-hidden rounded-full",
          )}
        >
          {isMulti ? (
            <>
              <div
                className="absolute h-full left-0"
                style={{
                  width: `${(((normalizedValue?.[0] ?? normalizedDefault[0]) - min) / (max - min)) * 100}%`,
                  backgroundColor: lowerColor,
                }}
              />
              <div
                className="absolute h-full right-0"
                style={{
                  width: `${100 - (((normalizedValue?.[1] ?? normalizedDefault[1]) - min) / (max - min)) * 100}%`,
                  backgroundColor: higherColor,
                }}
              />
            </>
          ) : (
            <div
              className="absolute h-full"
              style={{
                width: `${(((normalizedValue?.[0] ?? normalizedDefault[0]) - min) / (max - min)) * 100}%`,
                backgroundColor: color,
              }}
            />
          )}
        </SliderPrimitive.Track>
        {(normalizedValue ?? normalizedDefault).map((val, i) => (
          <SliderPrimitive.Thumb
            key={i}
            className={cn(
              "block h-4 w-4 rounded-full border-[3px] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50",
            )}
            style={{
              backgroundColor: "white",
              borderColor: isMulti
                ? i === 0
                  ? lowerColor
                  : higherColor
                : color,
            }}
          >
            <Tooltip value={val} index={i} />
          </SliderPrimitive.Thumb>
        ))}
        <span className="text-white absolute -right-1 top-2 text-sm">
          {max}
        </span>
      </SliderPrimitive.Root>
    );
  },
);

Slider.displayName = "Slider";

export default Slider;

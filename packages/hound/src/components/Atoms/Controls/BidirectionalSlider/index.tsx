import React from "react";

interface BidirectionalSliderProps {
  color?: string;
  ranges: [[number, number], [number], [number, number]]; // [min,gap] [origin] [max,gap]
  value: number; // Required value
  onChange: (value: number, bidirectionalValue: number) => void; // Required onChange
}

export const BidirectionalSlider: React.FC<BidirectionalSliderProps> = ({
  color = "#0ea5e9",
  ranges,
  value,
  onChange,
}) => {
  // Add unique ID using useId hook
  const uniqueId = crypto.randomUUID();

  const min = ranges[0][0];
  const minGap = ranges[0][1];
  const origin = ranges[1][0];
  const max = ranges[2][0];
  const maxGap = ranges[2][1];

  // Calculate bidirectional value relative to origin with proper scaling
  const getBidirectionalValue = (val: number) => {
    if (val <= origin) {
      // Scale for values below origin
      const percentage = (val - min) / (origin - min);
      return -100 * (1 - percentage);
    } else {
      // Scale for values above origin
      const percentage = (val - origin) / (max - origin);
      return 100 * percentage;
    }
  };

  // Calculate the background gradient based on value
  const getBackgroundSize = () => {
    // Always position origin at 50%
    const valuePercent =
      value <= origin
        ? (50 * (value - min)) / (origin - min) // Scale 0-50% for values below origin
        : 50 + (50 * (value - origin)) / (max - origin); // Scale 50-100% for values above origin

    if (value <= origin) {
      return {
        background: `linear-gradient(to right, 
          #e5e7eb 0%,
          #e5e7eb ${valuePercent}%, 
          ${color} ${valuePercent}%, 
          ${color} 50%,
          #e5e7eb 50%,
          #e5e7eb 100%)`,
      };
    } else {
      return {
        background: `linear-gradient(to right, 
          #e5e7eb 0%, 
          #e5e7eb 50%,
          ${color} 50%, 
          ${color} ${valuePercent}%, 
          #e5e7eb ${valuePercent}%,
          #e5e7eb 100%)`,
      };
    }
  };

  // Convert between visual position (0-100) and actual value
  const visualToValue = (visualPos: number) => {
    const val =
      visualPos <= 50
        ? min +
          Math.round((visualPos / 50) * ((origin - min) / minGap)) * minGap
        : origin +
          Math.round(((visualPos - 50) / 50) * ((max - origin) / maxGap)) *
            maxGap;

    // Round to handle floating point precision issues
    const decimals = Math.max(
      minGap.toString().split(".")[1]?.length || 0,
      maxGap.toString().split(".")[1]?.length || 0,
    );

    // Ensure value stays within bounds and snaps to valid steps
    if (val <= origin) {
      return Number(Math.max(min, Math.min(origin, val)).toFixed(decimals));
    } else {
      return Number(Math.min(max, Math.max(origin, val)).toFixed(decimals));
    }
  };

  const valueToVisual = (val: number) => {
    if (val <= origin) {
      return ((val - min) / (origin - min)) * 50;
    } else {
      return 49.8 + ((val - origin) / (max - origin)) * 50;
    }
  };

  return (
    <div className="">
      <div className="">
        <div className="relative">
          {/* Gap indicators for left side */}
          {Array.from({ length: Math.floor((origin - min) / minGap) + 1 }).map(
            (_, index) => {
              const value = min + index * minGap;
              const position = valueToVisual(value);
              return (
                <div
                  key={`left-${index}`}
                  className="absolute top-[18px] w-0.5 opacity-0 h-[5px] bg-gray-500 -translate-y-1/2"
                  style={{
                    left: `${position}%`,
                    transform: "translateX(-50%)",
                    zIndex: -20,
                  }}
                />
              );
            },
          )}

          {/* Gap indicators for right side */}
          {Array.from({ length: Math.floor((max - origin) / maxGap) + 1 }).map(
            (_, index) => {
              const value = origin + index * maxGap;
              const position = valueToVisual(value);
              return (
                <div
                  key={`right-${index}`}
                  className="absolute top-[18px] w-0.5 h-[5px] opacity-0 bg-gray-500 -translate-y-1/2"
                  style={{
                    left: `${position}%`,
                    transform: "translateX(-50%)",
                    zIndex: -20,
                  }}
                />
              );
            },
          )}

          {/* Origin line indicator - taller than other indicators */}
          <div
            className="absolute top-1/2 w-0.5 h-2 bg-gray-300 -translate-y-1/2"
            style={{ left: "50%", transform: "translateX(-50%)", zIndex: -20 }}
          />
          {value !== origin && (
            <div
              style={{
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: -20,
              }}
              className="absolute top-[20px] text-white"
            >
              {origin}
            </div>
          )}

          {/* Value tooltip */}
          {
            <div
              className="absolute -bottom-6 px-2 py-1 text-sm font-bold text-white rounded"
              style={{
                left: `${valueToVisual(value)}%`,
                transform: "translateX(-50%) translateY(20%)",
              }}
            >
              {value}
            </div>
          }

          <style>
            {`
              #inputRangeThumb-${uniqueId}-slider::-webkit-slider-thumb {
                border-color: ${color} !important;
              }
            `}
          </style>
          <input
            id={`inputRangeThumb-${uniqueId}-slider`}
            type="range"
            min={0}
            max={100}
            step={0.1}
            value={valueToVisual(value)}
            onChange={(e) => {
              const newValue = visualToValue(Number(e.target.value));
              onChange(newValue, Math.round(getBidirectionalValue(newValue)));
            }}
            className="w-full h-[3px] rounded-lg appearance-none cursor-pointer focus:outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-solid [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
            style={getBackgroundSize()}
          />
        </div>

        <div className="flex justify-between text-sm text-gray-600">
          {value !== min ? <span>{min}</span> : <span className="w-4"></span>}

          {value !== max ? <span>{max}</span> : <span className="w-4"></span>}
        </div>
      </div>
    </div>
  );
};

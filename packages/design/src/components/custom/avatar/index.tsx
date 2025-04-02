import React from "react";
import { tv } from "tailwind-variants";

export interface AvatarProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  rounded?: boolean;
  className?: string;
}

const avatar = tv({
  base: "inline-block overflow-hidden bg-gray-100",
  variants: {
    size: {
      sm: "w-8 h-8",
      md: "w-12 h-12",
      lg: "w-16 h-16",
    },
    rounded: {
      true: "rounded-full",
      false: "rounded",
    },
  },
  defaultVariants: {
    size: "md",
    rounded: true,
  },
});

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size,
  rounded,
  className,
}) => {
  return (
    <img src={src} alt={alt} className={avatar({ size, rounded, className })} />
  );
};

export default Avatar;

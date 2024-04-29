import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { cn } from "../lib/utils";

const buttonVariants = cva(
  "flex flex-row items-center justify-center rounded gap-1",
  {
    variants: {
      variant: {
        default: "bg-primary",
        secondary: "bg-secondary",
        destructive: "bg-destructive",
        ghost: "bg-slate-700",
        link: "text-primary underline-offset-4",
      },
      size: {
        default: "h-12 px-4",
        sm: "h-10 px-2",
        lg: "h-14 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const buttonTextVariants = cva("text-center font-medium", {
  variants: {
    variant: {
      default: "text-primary-foreground",
      secondary: "text-secondary-foreground",
      destructive: "text-destructive-foreground",
      ghost: "text-primary-foreground",
      link: "text-primary-foreground underline",
    },
    size: {
      default: "text-base",
      sm: "text-sm",
      lg: "text-xl",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof TouchableOpacity>,
    VariantProps<typeof buttonVariants> {
  labelClasses?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
function Button({
  children,
  labelClasses,
  className,
  variant,
  size,
  leftIcon,
  rightIcon,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      <Text
        className={cn(
          buttonTextVariants({ variant, size, className: labelClasses }),
        )}
      >
        {leftIcon}
      </Text>
      <Text
        className={cn(
          buttonTextVariants({ variant, size, className: labelClasses }),
        )}
      >
        {children}
      </Text>
      <Text
        className={cn(
          buttonTextVariants({ variant, size, className: labelClasses }),
        )}
      >
        {rightIcon}
      </Text>
    </TouchableOpacity>
  );
}

export { Button, buttonTextVariants, buttonVariants };

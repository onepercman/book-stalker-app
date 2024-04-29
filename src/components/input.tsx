import { VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";
import { Text, TextInput, View } from "react-native";
import { cn } from "../lib/utils";

const inputVariants = cva("border py-2.5 rounded", {
  variants: {
    variant: {
      default: "border-input",
    },
    size: {
      default: "h-12 px-4",
      sm: "h-10 px-2",
      lg: "h-14 px-4",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface InputProps
  extends React.ComponentPropsWithoutRef<typeof TextInput>,
    VariantProps<typeof inputVariants> {
  label?: string;
  labelClasses?: string;
  inputClasses?: string;
}
const Input = forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  (
    { className, label, labelClasses, inputClasses, variant, size, ...props },
    ref,
  ) => (
    <View className={cn("flex flex-col gap-1.5", className)}>
      {label && <Text className={cn("text-base", labelClasses)}>{label}</Text>}
      <TextInput
        className={inputVariants({ variant, size, className: inputClasses })}
        {...props}
      />
    </View>
  ),
);

export { Input };

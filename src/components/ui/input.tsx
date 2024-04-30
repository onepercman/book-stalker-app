import { cn } from "@/libs/utils";
import { VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";
import { Text, TextInput, View } from "react-native";
import colors from "tailwindcss/colors";

const inputVariants = cva("border py-2.5 rounded", {
	variants: {
		variant: {
			default: "bg-default border-transparent",
			outlined: "bg-transparent border-line",
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
	error?: string;
}
const Input = forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
	(
		{
			className,
			label,
			labelClasses,
			inputClasses,
			variant,
			size,
			error,
			...props
		},
		ref,
	) => (
		<View className={cn("flex flex-col gap-1", className)}>
			{label && <Text className={cn("text-base", labelClasses)}>{label}</Text>}
			<TextInput
				ref={ref}
				placeholderTextColor={colors.gray[500]}
				className={cn(
					inputVariants({
						variant,
						size,
						className: inputClasses,
					}),
					error && "!border-error",
				)}
				{...props}
			/>
			{error && <Text className="text-sm text-error">{error}</Text>}
		</View>
	),
);

export { Input };

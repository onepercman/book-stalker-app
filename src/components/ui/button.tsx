import { cn } from "@/libs/utils";
import { FontAwesome5 } from "@expo/vector-icons";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const buttonVariants = cva(
	"flex flex-row items-center justify-center rounded gap-1",
	{
		variants: {
			variant: {
				default: "bg-default",
				outline: "bg-transparent border border-primary",
				primary: "bg-primary",
				ghost: "bg-transparent",
				link: "text-primary underline-offset-4",
			},
			size: {
				default: "h-12 px-4",
				sm: "h-10 px-2",
				lg: "h-14 px-8",
			},
			square: {
				true: "aspect-square",
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
			default: "text-content",
			outline: "text-white",
			primary: "text-white",
			ghost: "text-primary-600",
			link: "text-primary-600 underline",
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
	loading?: boolean;
}
function Button({
	children,
	labelClasses,
	className,
	variant,
	size,
	square,
	leftIcon,
	rightIcon,
	disabled,
	loading,
	...props
}: ButtonProps) {
	const _disabled = loading || disabled;

	return (
		<TouchableOpacity
			className={cn(buttonVariants({ variant, size, square, className }))}
			disabled={_disabled}
			{...props}
		>
			{loading ? (
				<Text
					className={cn(
						buttonTextVariants({ variant, size, className: labelClasses }),
					)}
				>
					<FontAwesome5 name="spinner" />
				</Text>
			) : null}
			{leftIcon ? (
				<Text
					className={cn(
						buttonTextVariants({ variant, size, className: labelClasses }),
					)}
				>
					{leftIcon}
				</Text>
			) : null}
			{children ? (
				<Text
					className={cn(
						buttonTextVariants({ variant, size, className: labelClasses }),
					)}
				>
					{children}
				</Text>
			) : null}
			{rightIcon ? (
				<Text
					className={cn(
						buttonTextVariants({ variant, size, className: labelClasses }),
					)}
				>
					{rightIcon}
				</Text>
			) : null}
		</TouchableOpacity>
	);
}

export { Button, buttonTextVariants, buttonVariants };

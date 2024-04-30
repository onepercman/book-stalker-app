import { cn } from "@/libs/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Text, View } from "react-native";

const badgeVariants = cva(
	"flex flex-row items-center rounded-full px-2 py-1 text-xs font-semibold",
	{
		variants: {
			variant: {
				default: "bg-primary",
				success: "bg-green-500 dark:bg-green-700",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

const badgeTextVariants = cva("font-medium text-center text-xs", {
	variants: {
		variant: {
			default: "text-primary-600",
			success: "text-green-100",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

export interface BadgeProps
	extends React.ComponentPropsWithoutRef<typeof View>,
		VariantProps<typeof badgeVariants> {
	label: string;
	labelClasses?: string;
}
function Badge({
	label,
	labelClasses,
	className,
	variant,
	...props
}: BadgeProps) {
	return (
		<View className={cn(badgeVariants({ variant }), className)} {...props}>
			<Text className={cn(badgeTextVariants({ variant }), labelClasses)}>
				{label}
			</Text>
		</View>
	);
}

export { Badge, badgeVariants };

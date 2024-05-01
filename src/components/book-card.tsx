import { cn } from "@/libs/utils";
import { useRouter } from "expo-router";
import { FC } from "react";
import { Image, Pressable, Text, View } from "react-native";

export const BookCard: FC<{ data: Book; className?: string }> = ({
	data,
	className,
}) => {
	const router = useRouter();

	return (
		<Pressable
			className={cn("p-2 w-full h-52", className)}
			onPress={() => router.push(`/${data._id}`)}
		>
			<View className="border border-line bg-default h-full flex flex-col rounded-md overflow-hidden">
				<Image source={{ uri: data.thumbnail }} className="w-full h-40" />
				<View className="p-2">
					<Text className="text-center font-medium line-clamp-1">
						{data.name}
					</Text>
				</View>
			</View>
		</Pressable>
	);
};

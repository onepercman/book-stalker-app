import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Service } from "@/services/app.service";
import { Entypo } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import {
	FlatList,
	Image,
	Pressable,
	SafeAreaView,
	Text,
	View,
} from "react-native";

export default function () {
	const router = useRouter();

	const { data } = useQuery({
		queryKey: ["explore book list"],
		async queryFn() {
			const { data } = await Service.book.list();
			return data;
		},
	});

	if (!data?.length) return null;

	return (
		<SafeAreaView className="flex flex-col">
			<View className="flex flex-row gap-2 p-4">
				<Input className="grow" placeholder="Search for books..." />
				<Button leftIcon={<Entypo size={20} name="magnifying-glass" />} />
			</View>

			<FlatList
				className="h-full"
				numColumns={3}
				data={data}
				keyExtractor={(e) => e._id}
				renderItem={function ({ item }) {
					return (
						<Pressable
							className="p-2 w-1/3 h-52"
							onPress={() => router.push(`/${item._id}`)}
						>
							<View className="border border-line bg-default h-full flex flex-col rounded-md overflow-hidden">
								<Image
									source={{ uri: item.thumbnail }}
									className="w-full h-40"
								/>
								<View className="p-2">
									<Text className="text-center font-medium line-clamp-1">
										{item.name}
									</Text>
								</View>
							</View>
						</Pressable>
					);
				}}
			/>
		</SafeAreaView>
	);
}

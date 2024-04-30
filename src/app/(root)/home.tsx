import { Service } from "@/services/app.service";
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
		queryKey: ["home book list"],
		async queryFn() {
			const { data } = await Service.book.userBooks();
			return data;
		},
	});

	if (!data?.length) return null;

	return (
		<SafeAreaView>
			<View className="p-4">
				<Text className="text-2xl font-semibold">Recent Reading</Text>
				<FlatList
					className="h-full mt-4"
					numColumns={3}
					data={data}
					keyExtractor={(i) => i._id}
					renderItem={({ item }) => (
						<Pressable
							className="w-1/3 p-1"
							onPress={() => router.push(`/${item._id}`)}
						>
							<View className="rounded border border-line p-2 w-full">
								<Image
									source={{ uri: item.thumbnail }}
									className="h-16 w-full"
								/>
								<Text className="text-center font-medium mt-4">
									{item.name}
								</Text>
							</View>
						</Pressable>
					)}
				/>
			</View>
		</SafeAreaView>
	);
}

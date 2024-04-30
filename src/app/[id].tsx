import { Button } from "@/components/ui/button";
import { Service } from "@/services/app.service";
import { Octicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, SafeAreaView, Text, View } from "react-native";

export default function () {
	const router = useRouter();

	const { id } = useLocalSearchParams();

	const { data } = useQuery({
		queryKey: ["book details", id],
		async queryFn() {
			const { data } = await Service.book.get(id as string);
			return data;
		},
	});

	if (!data) return;

	return (
		<SafeAreaView>
			<View className="flex flex-row gap-4 p-4">
				<Image source={{ uri: data.thumbnail }} className="h-16 w-16" />
				<View className="flex flex-col">
					<Text className="text-2xl font-medium">{data?.name}</Text>
				</View>
			</View>
			<View className="p-4">
				<Button
					rightIcon={<Octicons name="book" />}
					onPress={() => router.push(`/reading/${data._id}`)}
				>
					Read
				</Button>
			</View>
		</SafeAreaView>
	);
}

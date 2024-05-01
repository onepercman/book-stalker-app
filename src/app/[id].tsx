import { Button } from "@/components/ui/button";
import { Service } from "@/services/app.service";
import { Octicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";

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
			<ScrollView className="h-full">
				<View className="flex flex-col gap-4 p-4 items-center">
					<Image source={{ uri: data.thumbnail }} className="h-52 w-36" />
					<View className="flex flex-col">
						<Text className="text-2xl font-medium">{data?.name}</Text>
					</View>
				</View>
				<View className="p-4">
					<Button
						rightIcon={<Octicons name="book" />}
						onPress={() => router.push(`/reading/${data._id}`)}
					>
						Read now
					</Button>
				</View>

				<View className="p-4 h-full flex flex-col gap-2">
					<View className="flex flex-row justify-between gap-2">
						<Text className="text-muted">Last Read</Text>
						<Text className="font-medium">2024/04/20</Text>
					</View>
					<View className="flex flex-row justify-between gap-2">
						<Text className="text-muted">Reading Progress</Text>
						<Text className="font-medium">11/120 (9%)</Text>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

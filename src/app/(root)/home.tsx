import { Service } from "@/services/app.service";
import { Entypo } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import {
	Dimensions,
	Image,
	Pressable,
	SafeAreaView,
	ScrollView,
	Text,
	View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";

export default function () {
	const router = useRouter();

	const { data } = useQuery({
		queryKey: ["home book list"],
		async queryFn() {
			const { data } = await Service.book.list();
			return data;
		},
	});

	if (!data?.length) return null;

	const width = Dimensions.get("window").width;

	return (
		<SafeAreaView>
			<ScrollView>
				<View>
					<Text className="text-3xl font-bold p-4">
						<Entypo size={24} name="book" /> New books
					</Text>
					<Carousel
						loop={false}
						style={{ width: width }}
						data={data}
						width={width / 3}
						height={190}
						renderItem={function ({ item }) {
							return (
								<Pressable
									className="p-2 w-full"
									onPress={() => router.push(`/${item._id}`)}
								>
									<View className="border border-line bg-default h-full flex flex-col rounded-md overflow-hidden">
										<Image
											source={{ uri: item.thumbnail }}
											className="w-full h-40"
										/>
										<View className="p-2">
											<Text className="text-center font-medium">
												{item.name}
											</Text>
										</View>
									</View>
								</Pressable>
							);
						}}
					/>
				</View>

				<View>
					<Text className="text-3xl font-bold p-4">
						<Entypo size={24} name="clock" /> Recents
					</Text>
					<Carousel
						loop={false}
						style={{ width: width }}
						data={data}
						width={width / 3}
						height={190}
						renderItem={function ({ item }) {
							return (
								<Pressable
									className="p-2 w-full"
									onPress={() => router.push(`/${item._id}`)}
								>
									<View className="border border-line bg-default h-full flex flex-col rounded-md overflow-hidden">
										<Image
											source={{ uri: item.thumbnail }}
											className="w-full h-40"
										/>
										<View className="p-2">
											<Text className="text-center font-medium">
												{item.name}
											</Text>
										</View>
									</View>
								</Pressable>
							);
						}}
					/>
				</View>

				<View>
					<Text className="text-3xl font-bold p-4">
						<Entypo size={24} name="star" /> Top rates
					</Text>
					<Carousel
						loop={false}
						style={{ width: width }}
						data={data}
						width={width / 3}
						height={190}
						renderItem={function ({ item }) {
							return (
								<Pressable
									className="p-2 w-full"
									onPress={() => router.push(`/${item._id}`)}
								>
									<View className="border border-line bg-default h-full flex flex-col rounded-md overflow-hidden">
										<Image
											source={{ uri: item.thumbnail }}
											className="w-full h-40"
										/>
										<View className="p-2">
											<Text className="text-center font-medium">
												{item.name}
											</Text>
										</View>
									</View>
								</Pressable>
							);
						}}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

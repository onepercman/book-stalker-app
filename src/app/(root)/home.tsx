import { Service } from "@/services/app.service";
import { useQuery } from "@tanstack/react-query";
import { SafeAreaView, Text, View } from "react-native";

export default function () {
	const { data } = useQuery({
		queryKey: ["home book list"],
		async queryFn() {
			const { data } = await Service.book.userBooks();
			return data;
		},
	});

	return (
		<SafeAreaView>
			<View>
				{data?.map((book) => (
					<View key={book.id}>
						<Text>{book.uri}</Text>
					</View>
				))}
			</View>
		</SafeAreaView>
	);
}

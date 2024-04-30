import { Service } from "@/services/app.service";
import { Reader, Themes } from "@epubjs-react-native/core";
import { useFileSystem } from "@epubjs-react-native/expo-file-system";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";

export default function () {
	const { id } = useLocalSearchParams();

	const { data } = useQuery({
		queryKey: ["book reading details", id],
		async queryFn() {
			const { data } = await Service.book.get(id as string);
			return data;
		},
	});

	if (!data) return;

	return (
		<Reader
			src={data.uri}
			fileSystem={useFileSystem}
			defaultTheme={Themes.DARK}
		/>
	);
}

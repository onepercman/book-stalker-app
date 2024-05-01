import { Images } from "@/assets";
import { Button } from "@/components/ui/button";
import { Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
	ImageBackground,
	Pressable,
	SafeAreaView,
	Text,
	View,
} from "react-native";

export default function () {
	const router = useRouter();

	return (
		<ImageBackground source={Images.background} resizeMode="cover">
			<SafeAreaView className="flex h-screen w-screen flex-col items-center justify-between bg-gradient-to-b from-primary to-transparent">
				<View className="grow flex flex-col justify-center items-center text-center">
					<Text className="text-6xl font-semibold text-white">BookStalker</Text>
					<Text className="text-white/80">
						Simple stalking your reading process
					</Text>
					<Button
						variant="outlinePrimary"
						className="mt-4 self-stretch"
						onPress={() => router.push("/(auth)/login")}
						rightIcon={<Octicons name="arrow-right" />}
					>
						Login now
					</Button>
				</View>

				<Pressable onPress={() => router.push("/(auth)/register")}>
					<Text className="text-white">
						Don't have an account yet?{" "}
						<Text className="underline">Register</Text>
					</Text>
				</Pressable>
			</SafeAreaView>
		</ImageBackground>
	);
}

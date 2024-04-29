import { Images } from "@/assets";
import { ToastProvider } from "@/components/toast";
import { useStore } from "@/libs/valtio";
import { userStore } from "@/stores/user.store";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { Image } from "react-native";
import "../styles/globals.css";

export default function () {
	const { user } = useStore(userStore);

	const router = useRouter();

	useEffect(() => {
		if (user) {
			router.replace("/(root)/profile");
		} else {
			router.replace("/");
		}
	}, [user]);

	return (
		<ToastProvider position="top">
			<Stack>
				<Stack.Screen name="index" options={{ headerShown: false }} />
				<Stack.Screen
					name="(auth)"
					options={{
						headerBackground: () => (
							<Image source={Images.background} resizeMode="cover" />
						),
						headerTitle: "",
						headerBackVisible: false,
					}}
				/>
				<Stack.Screen
					name="(root)"
					options={{
						headerBackground: () => (
							<Image source={Images.background} resizeMode="cover" />
						),
						headerTitle: "",
						headerBackVisible: false,
					}}
				/>
			</Stack>
		</ToastProvider>
	);
}

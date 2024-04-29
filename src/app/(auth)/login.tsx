import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { userStore } from "@/stores/user.store";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, SafeAreaView, Text, View } from "react-native";

interface LoginDto {
	email: string;
	password: string;
}

export default function () {
	const router = useRouter();

	const form = useForm<LoginDto>({
		mode: "all",
		defaultValues: {
			email: "onepercman@gmail.com",
			password: "123456",
		},
	});

	async function submit({ email, password }: LoginDto) {
		const { data, statusText } = await userStore.login(email, password);

		if (data) {
			router.push("/(root)/home");
		} else {
			if (
				statusText.toLowerCase().includes("email") ||
				statusText.includes("user")
			) {
				form.setError("email", { message: statusText });
			} else {
				form.setError("password", { message: statusText });
			}
		}
	}

	return (
		<KeyboardAvoidingView>
			<SafeAreaView>
				<View className="flex h-full flex-col items-center justify-center gap-4 p-4">
					<Text className="text-3xl font-semibold text-primary">
						Login to Bookstalker
					</Text>
					<Controller
						control={form.control}
						name="email"
						rules={{
							required: "Email is required",
							pattern: {
								value: RegExp(
									"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
								),
								message: "Invalid email address",
							},
						}}
						render={({ field, fieldState }) => (
							<Input
								value={field.value}
								onChangeText={field.onChange}
								error={fieldState.error?.message}
								textContentType="emailAddress"
								placeholder="Email"
								className="w-full"
							/>
						)}
					/>
					<Controller
						control={form.control}
						name="password"
						rules={{ required: "Password is required" }}
						render={({ field, fieldState }) => (
							<Input
								value={field.value}
								onChangeText={field.onChange}
								error={fieldState.error?.message}
								secureTextEntry
								textContentType="password"
								placeholder="Password"
								className="w-full"
							/>
						)}
					/>
					<Button
						variant="primary"
						className="min-w-[8rem]"
						onPress={form.handleSubmit(submit)}
					>
						<Text>Login</Text>
					</Button>
				</View>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
}

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { userStore } from "@/stores/user.store";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView, Text, View } from "react-native";
import Toast from "react-native-toast-message";

interface LoginDto {
  email: string;
  password: string;
}

export default function () {
  const router = useRouter();

  const form = useForm<LoginDto>({
    mode: "all",
  });

  async function submit({ email, password }: LoginDto) {
    const succeed = await userStore.login(email, password);
    if (succeed) {
      Toast.show({ type: "success", text1: "Login success" });
      router.push("/home");
    } else {
      Toast.show({ type: "error", text1: "Login failed" });
    }
  }

  return (
    <SafeAreaView>
      <View className="flex h-screen flex-col items-center justify-center gap-4 p-6">
        <Text className="text-3xl font-bol">Login</Text>
        <Controller
          control={form.control}
          name="email"
          render={({ field }) => (
            <Input placeholder="Email" {...field} className="w-full" />
          )}
        />
        <Controller
          control={form.control}
          name="password"
          render={({ field }) => (
            <Input
              className="w-full"
              textContentType="password"
              placeholder="Password"
              {...field}
            />
          )}
        />
        <Button className="self-end" onPress={form.handleSubmit(submit)}>
          <Text>Login</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}

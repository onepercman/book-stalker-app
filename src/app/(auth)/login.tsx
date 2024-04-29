import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { useToast } from "@/components/toast";
import { userStore } from "@/stores/user.store";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView, Text, View } from "react-native";

interface LoginDto {
  email: string;
  password: string;
}

export default function () {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<LoginDto>({
    mode: "all",
    defaultValues: {
      email: "user@gmail.com",
      password: "123456",
    },
  });

  async function submit({ email, password }: LoginDto) {
    const succeed = await userStore.login(email, password);
    if (succeed) {
      router.push("/(root)/home");
    } else {
      toast("Login failed", "destructive");
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
              secureTextEntry
              textContentType="password"
              placeholder="Password"
              className="w-full"
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

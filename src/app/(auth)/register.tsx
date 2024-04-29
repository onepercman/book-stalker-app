import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { useRouter } from "expo-router";
import { SafeAreaView, Text, View } from "react-native";

export default function () {
  const router = useRouter();

  return (
    <SafeAreaView>
      <View className="flex h-screen flex-col items-center justify-center gap-4 p-4">
        <Text className="text-3xl font-semibold">Register</Text>
        <Input placeholder="Email" className="w-full" />
        <Input
          secureTextEntry
          textContentType="password"
          placeholder="Password"
          className="w-full"
        />
        <Input
          secureTextEntry
          textContentType="password"
          placeholder="Re-Password"
          className="w-full"
        />
        <Button className="self-end" onPress={() => router.replace("/login")}>
          <Text>Register</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
